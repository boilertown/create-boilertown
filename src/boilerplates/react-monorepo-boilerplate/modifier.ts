import { globbySync } from 'globby';
import fs from 'node:fs';
import path from 'node:path';
import { sortPackageJson } from 'sort-package-json';
import type { PackageJson } from 'type-fest';
import { modifyGithubActions } from 'modifiers/index.js';
import { getPkgManagerFromAgent } from 'utils/getPkgManagerFromAgent.js';
import type { Modifier } from 'types/index.js';

/**
 * Custom modifier of https://github.com/boilertowns/react-monorepo-boilerplate
 */
export const modifier: Modifier = ({ projectDir }) => {
	const { pkgManagerName, pkgManagerVersion } = getPkgManagerFromAgent();
	const rootPackageJsonPath = path.join(projectDir, 'package.json');
	const rootPackageJsonContent = JSON.parse(
		fs.readFileSync(rootPackageJsonPath, 'utf-8'),
	) as PackageJson;

	(rootPackageJsonContent as any).packageManager = pkgManagerVersion
		? `${pkgManagerName}@${pkgManagerVersion}`
		: `${pkgManagerName}`;

	const workspaces = rootPackageJsonContent.workspaces as string[];
	const patterns = workspaces.map(
		(workspace) => `${projectDir}/${workspace}/package.json`,
	);
	// rootDir/apps/*/package.json
	// rootDir/packages/*/package.json
	const packageJsonFiles = globbySync(patterns);

	/**
	 * The original boilerplate is using `pnpm`. CLI need to modify this to support
	 * `npm` and `yarn` properly.
	 */
	if (pkgManagerName !== 'pnpm') {
		/**
		 * Remove `pnpm-workspace.yaml`
		 */
		const pnpmWorkspaceFilePath = path.join(projectDir, 'pnpm-workspace.yaml');
		if (fs.existsSync(pnpmWorkspaceFilePath)) {
			fs.rmSync(pnpmWorkspaceFilePath, {
				force: true,
			});
		}

		/**
		 * Replace packages in workspace version from "workspace:*" to  "*"
		 */
		for (const packageJsonPath of packageJsonFiles) {
			const packageJsonContent = fs.readFileSync(packageJsonPath, {
				encoding: 'utf-8',
			});

			const newPackageJsonContent = sortPackageJson(
				packageJsonContent.replace(/workspace:\*/g, '*'),
			);

			fs.writeFileSync(packageJsonPath, newPackageJsonContent);
		}

		modifyGithubActions(projectDir);
	} else {
		rootPackageJsonContent.workspaces = undefined;
	}

	fs.writeFileSync(
		rootPackageJsonPath,
		sortPackageJson(JSON.stringify(rootPackageJsonContent, null, 2)),
	);
};
