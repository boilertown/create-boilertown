import { adjustPackageJson } from '../modifiers/adjustPackageJson.js';
import { removeLockFile } from '../modifiers/removeLockFile.js';
import { removeOldGit } from '../modifiers/removeOldGit.js';

interface Params {
	projectDir: string;
	projectName: string;
}

/**
 * All actions that need to be done after cloning.
 */
export const postCloneActions = async ({ projectDir, projectName }: Params) => {
	await removeOldGit(projectDir);
	await removeLockFile(projectDir);
	await adjustPackageJson({ projectDir, projectName });
};
