import fs from 'node:fs';
import path from 'node:path';

const REDUNDANT_FILES = [
	'.git',
	'LICENSE',
	'package-lock.json',
	'yarn.lock',
	'npm-shrinkwrap.json',
	'pnpm-lock.yaml',
	'bun.lockb',
];

export const cleanupFiles = (dir: string) => {
	for (const file of REDUNDANT_FILES) {
		const targetFile = path.join(dir, file);
		if (fs.existsSync(targetFile)) {
			fs.rmSync(targetFile, {
				force: true,
			});
		}
	}
};
