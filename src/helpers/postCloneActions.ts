import fs from 'node:fs';
import path from 'node:path';

interface Params {
	projectDir: string;
}

const lockFilesList = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

/**
 * All actions that need to be done after cloning a template.
 */
export const postCloneActions = async ({ projectDir }: Params) => {
	// Find `.git` folder after cloning the repo to remove it
	// in order to re-initialize a new one later.
	fs.rmSync(path.join(projectDir, '.git'), {
		recursive: true,
		force: true,
	});

	// Remove lock file.
	for (const file of lockFilesList) {
		const targetFile = path.join(projectDir, file);
		if (fs.existsSync(targetFile)) {
			fs.rmSync(targetFile, {
				force: true,
			});
		}
	}

	// Modify boilerplate `package.json` file.
};
