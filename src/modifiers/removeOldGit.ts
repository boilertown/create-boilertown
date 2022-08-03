import fs from 'node:fs';
import path from 'node:path';

/**
 * Find `.git` folder after cloning the repo to remove it in order to
 * re-initialize a new one later.
 */
export const removeOldGit = (dir: string) => {
	fs.rmSync(path.join(dir, '.git'), {
		recursive: true,
		force: true,
	});
};
