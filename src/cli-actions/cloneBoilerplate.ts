import chalk from 'chalk';
import ora from 'ora';
import { execAsync } from 'utils/execAsync.js';
import type { Boilerplate } from 'types/index.js';

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
		)} from ${chalk.underline(selectedBoilerplate.repo)}`,
	).start();

	try {
		await execAsync(
			`git clone --depth 1 ${`${selectedBoilerplate.repo}.git`} .`,
			{
				cwd: projectDir,
			},
		);
	} catch (error) {
		spinner.fail();
		throw new Error('Could not clone the repository.');
	}

	spinner.succeed();
};
