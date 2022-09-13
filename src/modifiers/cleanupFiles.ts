import fs from 'node:fs';
import path from 'node:path';

const TO_BE_REMOVED = [
	'.git',
	'LICENSE',
	'LICENSE.md',
	'CONTRIBUTING',
	'CONTRIBUTING.md',
	'README',
	'README.md',
	'CHANGELOG.md',
	'package-lock.json',
	'yarn.lock',
	'npm-shrinkwrap.json',
	'pnpm-lock.yaml',
	'bun.lockb',
];

export const cleanupFiles = (dir: string) => {
	for (const file of TO_BE_REMOVED) {
		const target = path.join(dir, file);

		if (fs.existsSync(target)) {
			fs.rmSync(target, {
				force: true,
				recursive: true,
			});
		}
	}
};
