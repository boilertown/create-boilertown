import { adjustPackageJson } from '../modifiers/adjustPackageJson.js';
import { initGit } from '../modifiers/initGit.js';
import { removeLockFile } from '../modifiers/removeLockFile.js';
import { removeOldGit } from '../modifiers/removeOldGit.js';

interface Params {
	projectDir: string;
	projectName: string;
}

/**
 * All actions that need to be done after cloning.
 */
export const postCloneActions = ({ projectDir, projectName }: Params) => {
	removeOldGit(projectDir);
	initGit(projectDir);
	removeLockFile(projectDir);
	adjustPackageJson({ projectDir, projectName });
};
