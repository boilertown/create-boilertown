import chalk from 'chalk';
import enquirer from 'enquirer';
import fs from 'node:fs';
import ora from 'ora';
import { CliResults } from '../types.js';
import { cleanupDir } from '../utils/cleanupDir.js';

interface Params {
	projectDir: string;
}

/**
 * Start scaffolding project.
 */
export const scaffoldProject = async ({ projectDir }: Params) => {
	const spinner = ora(
		`Scaffolding project in ${chalk.bold.cyan(projectDir)}`,
	).start();

	if (!fs.existsSync(projectDir)) {
		fs.mkdirSync(projectDir);
	} else {
		const files = fs.readdirSync(projectDir);
		if (files.length) {
			spinner.stopAndPersist();
			const { shouldOverwrite } = await enquirer.prompt<
				Pick<CliResults, 'shouldOverwrite'>
			>({
				name: 'shouldOverwrite',
				type: 'confirm',
				message:
					'Target directory is not empty. Remove existing files and continue?',
			});

			if (!shouldOverwrite) {
				spinner.fail();
				throw new Error('Aborted! 👋');
			}

			cleanupDir(projectDir);
		}
	}

	spinner.succeed();
};
