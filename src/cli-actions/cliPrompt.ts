import chalk from 'chalk';
import { Command } from 'commander';
import enquirer from 'enquirer';
import path from 'node:path';
import boilerplates from 'boilerplates/index.js';
import { logger } from 'utils/logger.js';
import { packageJSON } from 'utils/packageJSON.js';
import { convertToValidPackageName } from 'utils/packageName.js';
import type { CliResults } from 'types/index.js';
import { ABORT_MESSAGE, APP_NAME, DEFAULT_NAME } from '../constants.js';

const cancelFlow = () => {
	logger.error(ABORT_MESSAGE);
	process.exit();
};

export const cliPrompt = async (): Promise<CliResults> => {
	const program = new Command();

	program
		.name(APP_NAME.toLowerCase())
		.description('⚡️ The ultimate CLI to generate project boilerplate.');

	program
		.argument('[name]', 'name of your project')
		.option(
			'-b, --boilerplate <name>',
			'The boilerplate name that you want to use',
		)
		.version(
			packageJSON.version,
			'-v, --version',
			'display the version number',
		);

	program.parse(process.argv);

	const cliProjectName = program.args[0];
	const randomDefaultName = DEFAULT_NAME;

	const options = program.opts();
	const boilerplateNameFromCLI = options.boilerplate;
	const maybeBoilerplate = boilerplates.find(
		(b) => b.name === boilerplateNameFromCLI,
	);

	if (options.boilerplate && !maybeBoilerplate) {
		console.log(
			`❌ Could not find the boilerplate with name: ${chalk.red(
				boilerplateNameFromCLI,
			)}\n`,
		);
	}

	const answers = await enquirer.prompt<CliResults>([
		{
			name: 'projectName',
			type: 'input',
			message: 'Project name:',
			initial: cliProjectName || randomDefaultName,
			skip: !!cliProjectName,
			result: (value) => convertToValidPackageName(value),
			onCancel: cancelFlow,
		},
		{
			name: 'boilerplate',
			type: 'select',
			message: 'Select a boilerplate:',
			choices: boilerplates,
			skip: !!maybeBoilerplate,
			result: (value) => {
				if (options.boilerplate && maybeBoilerplate) {
					return maybeBoilerplate.name;
				}
				return value;
			},
			onCancel: cancelFlow,
		},
	]);

	return {
		projectName: answers.projectName,
		projectDir: path.resolve(process.cwd(), answers.projectName),
		boilerplate: answers.boilerplate,
	};
};
