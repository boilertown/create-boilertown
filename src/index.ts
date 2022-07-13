#! /usr/bin/env node
import process from 'node:process';
import chalk from 'chalk';
import { renderTitle } from './utils/renderTitle.js';
import { scaffoldProject } from './helpers/scaffoldProject.js';
import { cliPrompt } from './helpers/cliPrompt.js';

const main = async () => {
	renderTitle();
	const { projectName } = await cliPrompt();
	await scaffoldProject({ projectName });

	console.log(chalk.greenBright("\n\nYou're all set!\n"));
	process.exit(0);
};

main().catch((err) => {
	console.log(chalk.red(err));
	process.exit(0);
});
