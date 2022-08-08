import fs from 'node:fs';
import path from 'node:path';

const REDUNDANT_FILES = ['LICENSE'];

export const removeRedundantFiles = (dir: string) => {
	for (const file of REDUNDANT_FILES) {
		const targetFile = path.join(dir, file);
		if (fs.existsSync(targetFile)) {
			fs.rmSync(targetFile, {
				force: true,
			});
		}
	}
};
