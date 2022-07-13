import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';
import inquirer from 'inquirer';
import ora from 'ora';
import { emptyDir } from '../utils/emptyDir.js';
import { CliResults } from '../types.js';

interface ScaffoldProjectParams {
	projectName: string;
}

/**
 * Start scaffolding project.
 */
export const scaffoldProject = async ({
	projectName,
}: ScaffoldProjectParams) => {
	const projectDir = path.resolve(process.cwd(), projectName);

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
				spinner.fail('Aborting operation!');
				process.exit(0);
			}

			emptyDir(projectDir);
		}
	}

	spinner.succeed();
};
