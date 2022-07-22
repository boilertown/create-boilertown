#! /usr/bin/env node
import process from 'node:process';
import { boilerplates } from './boilerplates.js';
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
	const selectedBoilerplate = boilerplates.find((b) => b.name === boilerplate);

	if (!selectedBoilerplate) {
		throw new Error('Repository does not exist.');
	}

	await scaffoldProject({ projectDir });
	await cloneBoilerplate({ projectDir, selectedBoilerplate });
	await postCloneActions({ projectDir, projectName });
	logNextSteps({ projectName });
};

main().catch((err) => {
	logger.error(err);
	process.exit(1);
});
