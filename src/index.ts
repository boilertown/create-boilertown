#! /usr/bin/env node
import process from 'node:process';
import boilerplates from 'boilerplates/index.js';
import { cliPrompt } from 'cli-actions/cliPrompt.js';
import { clone } from 'cli-actions/clone.js';
import { logNextSteps } from 'cli-actions/logNextSteps.js';
import { postActions } from 'cli-actions/postActions.js';
import { scaffold } from 'cli-actions/scaffold.js';
import { logger } from 'utils/logger.js';

const main = async () => {
	const { projectName, projectDir, boilerplate, install } = await cliPrompt();
	const selectedBoilerplate = boilerplates.find((b) => b.name === boilerplate);

	if (!selectedBoilerplate) {
		throw new Error('The selected boilerplate does not exist.');
	}

	await scaffold({ projectDir });
	await clone({ projectDir, selectedBoilerplate });
	await postActions({
		projectDir,
		projectName,
		install,
		boilerplateModifier: selectedBoilerplate.modifier,
	});
	logNextSteps({ projectName, selectedBoilerplate, install });
};

main().catch((err) => {
	logger.error(err);
	process.exit(1);
});
