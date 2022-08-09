import { globbySync } from 'globby';
import fs from 'node:fs';
import path from 'node:path';
import { sortPackageJson } from 'sort-package-json';
import type { PackageJson } from 'type-fest';
import type { Modifier } from '../../types.js';
import { getPkgManagerFromAgent } from '../../utils/getPkgManagerFromAgent.js';

/**
 * Custom modifier of https://github.com/boilertowns/react-monorepo-boilerplate
 */
export const reactMonorepoBoilerplateModifier: Modifier = ({ projectDir }) => {
	const pkgManager = getPkgManagerFromAgent();
	const rootPackageJsonPath = path.join(projectDir, 'package.json');
	const rootPackageJsonContent = JSON.parse(
		fs.readFileSync(rootPackageJsonPath, 'utf-8'),
	) as PackageJson;
	const workspaces = rootPackageJsonContent.workspaces as string[];

	/**
	 * The original boilerplate is using `pnpm`. CLI need to modify this to support
	 * `npm` and `yarn` properly.
	 */
	if (pkgManager !== 'pnpm') {
		const pnpmWorkspaceFilePath = path.join(projectDir, 'pnpm-workspace.yaml');
		fs.rmSync(pnpmWorkspaceFilePath, {
			force: true,
		});

		const patterns = workspaces.map(
			(workspace) => `${projectDir}/${workspace}/package.json`,
		);
		const packageJsonFiles = globbySync(patterns);

		for (const packageJsonPath of packageJsonFiles) {
			const packageJsonContent = fs.readFileSync(packageJsonPath, {
				encoding: 'utf-8',
			});
			const newPackageJsonContent = sortPackageJson(
				packageJsonContent.replace(/workspace:\*/g, '*'),
			);
			fs.writeFileSync(packageJsonPath, newPackageJsonContent);
		}
	}
};
