import fs from 'node:fs';
import path from 'node:path';

const FILES_OR_DIR_TO_REMOVE = [
	'.git',
	'LICENSE',
	'package-lock.json',
	'yarn.lock',
	'npm-shrinkwrap.json',
	'pnpm-lock.yaml',
	'bun.lockb',
];

export const cleanupFiles = (dir: string) => {
	for (const file of FILES_OR_DIR_TO_REMOVE) {
		const target = path.join(dir, file);

		if (!fs.existsSync(target)) {
			return;
		}

		fs.rmSync(target, {
			force: true,
			recursive: true,
		});
	}
};
