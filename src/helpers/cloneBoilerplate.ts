import chalk from 'chalk';
import ora from 'ora';
import { boilerplates } from '../boilerplates.js';
import { execa } from '../utils/execa.js';

interface Params {
	projectDir: string;
	boilerplate: string;
}

/**
 * Clone the git repo based on selected boilerplate.
 */
export const cloneBoilerplate = async ({ projectDir, boilerplate }: Params) => {
	const repository = boilerplates.find((b) => b.name === boilerplate);
	const spinner = ora(
		`Cloning repo ${chalk.bold.cyan(repository?.name)}`,
	).start();

	try {
		await execa(`git clone --depth 1 ${repository?.git} .`, {
			cwd: projectDir,
		});
	} catch (error) {
		spinner.fail();
		throw new Error('Could not clone the repository.');
	}

	spinner.succeed();
};
