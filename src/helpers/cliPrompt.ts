import { Command } from 'commander';
import enquirer from 'enquirer';
import path from 'node:path';
import { boilerplates } from '../boilerplates.js';
import { ABORT_MESSAGE, APP_NAME } from '../constants.js';
import type { CliResults } from '../types.js';
import { logger } from '../utils/logger.js';
import { packageJSON } from '../utils/packageJSON.js';
import { convertToValidPackageName } from '../utils/packageName.js';

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
		.version(
			packageJSON.version,
			'-v, --version',
			'display the version number',
		);

	program.parse();

	const cliProjectName = program.args[0];

	const answers = await enquirer.prompt<CliResults>([
		{
			name: 'projectName',
			type: 'input',
			message: 'Project name:',
			initial: cliProjectName || 'my-boilertowns-project',
			skip: !!cliProjectName,
			result: (value) => convertToValidPackageName(value),
			onCancel: cancelFlow,
		},
		{
			name: 'boilerplate',
			type: 'select',
			message: 'Select a boilerplate:',
			choices: boilerplates,
			onCancel: cancelFlow,
		},
	]);

	return {
		projectName: answers.projectName,
		projectDir: path.resolve(process.cwd(), answers.projectName),
		boilerplate: answers.boilerplate,
	};
};
