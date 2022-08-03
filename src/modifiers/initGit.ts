import { execSync } from 'node:child_process';

/**
 * Create a new git repo for project.
 */
export const initGit = (dir: string) => {
	const gitCmd = 'git init && git branch -m main';

	try {
		execSync(gitCmd, {
			cwd: dir,
		});
	} catch (error) {
		console.log(error);
	}
};
