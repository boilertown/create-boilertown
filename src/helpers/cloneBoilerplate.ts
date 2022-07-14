import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import { boilerplates } from '../boilerplates.js';
import { execa } from '../utils/execa.js';

interface Params {
	projectDir: string;
	boilerplate: string;
}

/**
 * Clone the git repo based on selected template name.
 */
export const cloneBoilerplate = async ({ projectDir, boilerplate }: Params) => {
	const repository = boilerplates.find((b) => b.name === boilerplate);
	const spinner = ora(
		`Cloning repo ${chalk.bold.cyan(repository?.name)}`,
	).start();

	try {
		await execa(`git clone --depth 1 ${repository?.url} .`, {
			cwd: projectDir,
		});

		// find `.git` folder after cloning the repo to remove it
		// in order to re-initialize a new one later.
		fs.rmSync(path.join(projectDir, '.git'), {
			recursive: true,
			force: true,
		});
	} catch (error) {
		spinner.fail();
		throw new Error('Could not clone the repository.');
	}

	spinner.succeed();
};
