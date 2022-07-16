import fs from 'node:fs';
import path from 'node:path';

const LOCKS = [
	'package-lock.json',
	'yarn.lock',
	'npm-shrinkwrap.json',
	'pnpm-lock.yaml',
	'bun.lockb',
];

/**
 * Remove lock file in the boilerplate. Let users use their own lock file
 * after installation.
 */
export const removeLockFile = async (dir: string) => {
	for (const file of LOCKS) {
		const targetFile = path.join(dir, file);
		if (fs.existsSync(targetFile)) {
			fs.rmSync(targetFile, {
				force: true,
			});
		}
	}
};
