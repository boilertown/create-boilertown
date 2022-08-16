import { execSync } from 'node:child_process';

/**
 * Create a new git repo for project.
 */
export const initGit = (dir: string) => {
	let gitCmd = 'git init --initial-branch=main';

	const gitVersionString = execSync('git --version').toString();
	const gitVersion = gitVersionString.split(' ')[2];
	const versionMajor = gitVersion.split('.')[0];
	const versionMinor = gitVersion.split('.')[1];

	if (parseInt(versionMajor) < 2 || parseInt(versionMinor) < 28) {
		gitCmd = 'git init && git branch -M main';
	}

	try {
		execSync(gitCmd, {
			cwd: dir,
		});
	} catch (error) {
		console.log(error);
	}
};
