import path from 'node:path';
import enquirer from 'enquirer';
import { boilerplates } from '../boilerplates.js';
import type { CliResults } from '../types.js';

export const cliPrompt = async (): Promise<CliResults> => {
	const answers = await enquirer.prompt<CliResults>([
		{
			name: 'projectName',
			type: 'input',
			message: 'Project name:',
			initial: 'my-boilertowns-project',
		},
		{
			name: 'boilerplate',
			type: 'select',
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
