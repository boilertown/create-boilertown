#! /usr/bin/env node
import process from 'node:process';
import { renderTitle } from './utils/renderTitle.js';
import { scaffoldProject } from './helpers/scaffoldProject.js';
import { cliPrompt } from './helpers/cliPrompt.js';
import { cloneBoilerplate } from './helpers/cloneBoilerplate.js';
import { logger } from './utils/logger.js';
import { logNextSteps } from './helpers/logNextSteps.js';

const main = async () => {
	renderTitle();
	const { projectName, projectDir, boilerplate } = await cliPrompt();

	await scaffoldProject({ projectDir });
	await cloneBoilerplate({ projectDir, boilerplate });

	logger.succeed("\n🎉 You're all set!\n");
	logNextSteps({ projectName });
};

main().catch((err) => {
	logger.error(err);
	process.exit(1);
});
