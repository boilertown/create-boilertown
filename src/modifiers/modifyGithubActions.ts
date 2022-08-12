import { globbySync } from 'globby';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { getPkgManagerFromAgent } from 'utils/getPkgManagerFromAgent.js';

/**
 * Modify GitHub Actions files.
 */
export const modifyGithubActions = (projectDir: string) => {
	const { pkgManagerName } = getPkgManagerFromAgent();

	const files = globbySync(
		path.resolve(projectDir, '.github/workflows/*.(yaml|yml)'),
	);

	for (const file of files) {
		if (!fs.existsSync(file)) {
			return;
		}

		let fileContent = fs.readFileSync(file).toString();
		const yamlContent = YAML.parse(fileContent);

		Object.keys(yamlContent.jobs).forEach((jobName) => {
			const newSteps = yamlContent.jobs[jobName].steps.filter((step: any) => {
				if (!step.uses) {
					return true;
				}
				return !step.uses.includes('pnpm/action-setup');
			});
			yamlContent.jobs[jobName].steps = newSteps;
		});

		fileContent = YAML.stringify(yamlContent);
		if (pkgManagerName === 'npm') {
			fileContent = fileContent.replace(
				/pnpm install --frozen-lockfile/g,
				'npm ci',
			);
		}
		fileContent = fileContent.replace(/pnpm/g, pkgManagerName);

		fs.writeFileSync(file, fileContent, 'utf-8');
	}
};
