import {
	adjustPackageJson,
	initGit,
	removeLockFile,
	removeOldGit,
	removeRedundantFiles,
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
	removeOldGit(projectDir);
	removeLockFile(projectDir);
	removeRedundantFiles(projectDir);
	adjustPackageJson({ projectDir, projectName });

	if (boilerplateModifier) {
		boilerplateModifier();
	}

	initGit(projectDir);
};
