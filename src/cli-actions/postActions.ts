import ora from 'ora';
import { cleanupFiles, initGit, modifyPackageJson } from 'modifiers/index.js';
import { Modifier } from 'types/index.js';

interface Params {
	projectDir: string;
	projectName: string;
	boilerplateModifier?: Modifier;
}

/**
 * All actions that need to be done after cloning.
 */
export const postActions = async ({
	projectDir,
	projectName,
	boilerplateModifier,
}: Params) => {
	const spinner = ora('Preparing a new codebase for you...').start();

	cleanupFiles(projectDir);
	modifyPackageJson({ projectDir, projectName });

	if (boilerplateModifier) {
		boilerplateModifier({ projectDir, projectName });
	}

	initGit(projectDir);

	spinner.succeed();
};
