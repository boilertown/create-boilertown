#! /usr/bin/env node
import process from 'node:process';
import { cliPrompt } from './cli-actions/cliPrompt.js';
import { cloneBoilerplate } from './cli-actions/cloneBoilerplate.js';
import { logNextSteps } from './cli-actions/logNextSteps.js';
import { postCloneActions } from './cli-actions/postCloneActions.js';
import { scaffoldProject } from './cli-actions/scaffoldProject.js';
import { getAllBoilerplates } from './utils/getAllBoilerplates.js';
import { logger } from './utils/logger.js';
import { renderTitle } from './utils/renderTitle.js';

const main = async () => {
	renderTitle();

	const { projectName, projectDir, boilerplate } = await cliPrompt();

	const boilerplates = await getAllBoilerplates();
	const selectedBoilerplate = boilerplates.find((b) => b.name === boilerplate);

	if (!selectedBoilerplate) {
		throw new Error('The selected boilerplate does not exist.');
	}

	await scaffoldProject({ projectDir });
	await cloneBoilerplate({ projectDir, selectedBoilerplate });
	await postCloneActions({
		projectDir,
		projectName,
		boilerplateModifier: selectedBoilerplate.modifier,
	});
	logNextSteps({ projectName, selectedBoilerplate });
};

main().catch((err) => {
	logger.error(err);
	process.exit(1);
});
