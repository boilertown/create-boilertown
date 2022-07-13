import inquirer from 'inquirer';
import type { CliResults } from '../types.js';

export const cliPrompt = async (): Promise<CliResults> => {
	const { projectName } = await inquirer.prompt<
		Pick<CliResults, 'projectName'>
	>({
		name: 'projectName',
		message: 'Project name:',
		default: 'my-boilertowns-project',
	});

	return {
		projectName,
	};
};
