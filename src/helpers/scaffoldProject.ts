import fs from 'node:fs';

import inquirer from 'inquirer';
import ora from 'ora';
import { emptyDir } from '../utils/emptyDir.js';
import { CliResults } from '../types.js';

interface Params {
	projectDir: string;
}

/**
 * Start scaffolding project.
 */
export const scaffoldProject = async ({ projectDir }: Params) => {
	const spinner = ora(`Scaffolding project in ${projectDir}`).start();

	if (!fs.existsSync(projectDir)) {
		fs.mkdirSync(projectDir);
	} else {
		const files = fs.readdirSync(projectDir);
		if (files.length) {
			spinner.stopAndPersist();
			const { shouldOverwrite } = await inquirer.prompt<
				Pick<CliResults, 'shouldOverwrite'>
			>({
				name: 'shouldOverwrite',
				type: 'confirm',
				message:
					'Target directory is not empty. Remove existing files and continue?',
			});

			if (!shouldOverwrite) {
				spinner.fail();
				throw new Error('Aborting operation!');
			}

			emptyDir(projectDir);
		}
	}

	spinner.succeed();
};
