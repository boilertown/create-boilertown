import { execa } from '../utils/execa.js';

interface Params {
	projectDir: string;
}

/**
 * Create a new git repo for project.
 */
export const createGitRepo = async ({ projectDir }: Params) => {
	const gitCmd = 'git init && git branch -m main';

	try {
		await execa(gitCmd, {
			cwd: projectDir,
		});
	} catch (error) {
		console.log(error);
	}
};
