import ora from 'ora';
import {
	adjustPackageJson,
	cleanupFiles,
	initGit,
} from '../modifiers/common/index.js';
import type { Modifier } from '../types.js';

interface Params {
	projectDir: string;
	projectName: string;
	boilerplateModifier?: Modifier;
}

/**
 * All actions that need to be done after cloning.
 */
export const postCloneActions = ({
	projectDir,
	projectName,
	boilerplateModifier,
}: Params) => {
	const spinner = ora('Preparing a new codebase for you...').start();

	cleanupFiles(projectDir);
	adjustPackageJson({ projectDir, projectName });

	if (boilerplateModifier) {
		boilerplateModifier({ projectDir, projectName });
	}

	initGit(projectDir);

	spinner.succeed();
};
