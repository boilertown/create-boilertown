import fs from 'node:fs';
import path from 'node:path';

/**
 * Remove files and directories inside of `dir`.
 */
export const emptyDir = (dir: string) => {
	if (!fs.existsSync(dir)) {
		return;
	}

	for (const file of fs.readdirSync(dir)) {
		fs.rmSync(path.resolve(dir, file), {
			recursive: true,
			force: true,
		});
	}
};
