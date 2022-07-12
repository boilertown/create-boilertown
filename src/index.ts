#! /usr/bin/env node
import inquirer from 'inquirer';
import { exit } from 'node:process';
import { TEMPLATES } from './constants.js';
import { getPkgManagerFromAgent } from './utils/getPkgManagerFromAgent.js';
import { renderTitle } from './utils/renderTitle.js';

interface CliResults {
	projectName: string;
}

const main = async () => {
	renderTitle();

	const results = await inquirer.prompt<CliResults>([
		{
			name: 'projectName',
			message: 'Project name:',
			default: 'my-boilertowns-project',
		},
		{
			name: 'template',
			type: 'list',
			message: 'Select a template:',
			choices: TEMPLATES,
		},
	]);

	const pkgManager = getPkgManagerFromAgent();

	console.log(pkgManager);
	console.log(results);

	exit(0);
};

main().catch((err) => {
	console.log(err);
	exit(1);
});
