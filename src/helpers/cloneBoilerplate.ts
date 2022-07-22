import chalk from 'chalk';
import ora from 'ora';
import type { Boilerplate } from '../types.js';
import { execa } from '../utils/execa.js';

interface Params {
	projectDir: string;
	selectedBoilerplate: Boilerplate;
}

/**
 * Clone the git repo based on selected boilerplate.
 */
export const cloneBoilerplate = async ({
	projectDir,
	selectedBoilerplate,
}: Params) => {
	const spinner = ora(
		`Creating project by cloning ${chalk.yellow(
			selectedBoilerplate.name,
		)} from ${chalk.underline(selectedBoilerplate.repo)}\n`,
	).start();

	try {
		await execa(`git clone --depth 1 ${`${selectedBoilerplate.repo}.git`} .`, {
			cwd: projectDir,
		});
	} catch (error) {
		spinner.fail();
		throw new Error('Could not clone the repository.');
	}

	spinner.succeed();
};
