import chalk from 'chalk';
import { execSync } from 'node:child_process';
import ora from 'ora';
import type { Boilerplate } from '../types.js';

interface Params {
	projectDir: string;
	selectedBoilerplate: Boilerplate;
}

/**
 * Clone the git repo based on selected boilerplate.
 */
export const cloneBoilerplate = ({
	projectDir,
	selectedBoilerplate,
}: Params) => {
	const spinner = ora(
		`Creating project by cloning ${chalk.yellow(
			selectedBoilerplate.name,
		)} from ${chalk.underline(selectedBoilerplate.repo)}\n`,
	).start();

	try {
		execSync(`git clone --depth 1 ${`${selectedBoilerplate.repo}.git`} .`, {
			cwd: projectDir,
		});
	} catch (error) {
		spinner.fail();
		throw new Error('Could not clone the repository.');
	}

	spinner.succeed();
};
