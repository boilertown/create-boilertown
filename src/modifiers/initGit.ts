import { execa } from '../utils/execa.js';

/**
 * Create a new git repo for project.
 */
export const initGit = async (dir: string) => {
	const gitCmd = 'git init && git branch -m main';

	try {
		await execa(gitCmd, {
			cwd: dir,
		});
	} catch (error) {
		console.log(error);
	}
};
