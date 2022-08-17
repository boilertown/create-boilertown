import { globbySync } from 'globby';
import fs from 'node:fs';
import path from 'node:path';
import { getPkgManagerFromAgent } from 'utils/getPkgManagerFromAgent.js';

/**
 * Modify `.husky` hooks.
 */
export const modifyHusky = (projectDir: string) => {
	const { pkgManagerName } = getPkgManagerFromAgent();
	const huskyDir = path.resolve(projectDir, '.husky');

	if (!fs.existsSync(huskyDir)) {
		return;
	}

	const files = globbySync(['*', '!.gitignore', '!_'], {
		cwd: huskyDir,
	});

	for (const file of files) {
		const target = path.resolve(huskyDir, file);
		let fileContent = fs.readFileSync(target, 'utf-8');
		fileContent = fileContent.replace(
			/npx --no-install/g,
			`${pkgManagerName} exec`,
		);
		fs.writeFileSync(target, fileContent, 'utf-8');
	}
};
