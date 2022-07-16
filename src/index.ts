#! /usr/bin/env node
import process from 'node:process';
import { cliPrompt } from './helpers/cliPrompt.js';
import { cloneBoilerplate } from './helpers/cloneBoilerplate.js';
import { logNextSteps } from './helpers/logNextSteps.js';
import { postCloneActions } from './helpers/postCloneActions.js';
import { scaffoldProject } from './helpers/scaffoldProject.js';
import { logger } from './utils/logger.js';
import { renderTitle } from './utils/renderTitle.js';

const main = async () => {
	renderTitle();
	const { projectName, projectDir, boilerplate } = await cliPrompt();

	await scaffoldProject({ projectDir });
	await cloneBoilerplate({ projectDir, boilerplate });
	await postCloneActions({ projectDir, projectName });

	logger.succeed("\n🎉 You're all set!\n");
	logNextSteps({ projectName });
};

main().catch((err) => {
	logger.error(err);
	process.exit(1);
});
