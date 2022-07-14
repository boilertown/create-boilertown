import path from 'node:path';
import inquirer from 'inquirer';
import { boilerplates } from '../boilerplates.js';
import type { CliResults } from '../types.js';

export const cliPrompt = async (): Promise<CliResults> => {
	const answers = await inquirer.prompt<CliResults>([
		{
			name: 'projectName',
			message: 'Project name:',
			default: 'my-boilertowns-project',
		},
		{
			name: 'boilerplate',
			type: 'list',
			message: 'Select a boilerplate:',
			choices: boilerplates,
		},
	]);

	return {
		projectName: answers.projectName,
		projectDir: path.resolve(process.cwd(), answers.projectName),
		boilerplate: answers.boilerplate,
	};
};
