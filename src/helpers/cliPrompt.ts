import enquirer from 'enquirer';
import path from 'node:path';
import { boilerplates } from '../boilerplates.js';
import type { CliResults } from '../types.js';
import { logger } from '../utils/logger.js';

const cancelFlow = () => {
	logger.error('Aborted! 👋');
	process.exit();
};

export const cliPrompt = async (): Promise<CliResults> => {
	const answers = await enquirer.prompt<CliResults>([
		{
			name: 'projectName',
			type: 'input',
			message: 'Project name:',
			initial: 'my-boilertowns-project',
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
