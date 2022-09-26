import ora from 'ora';
import {
	cleanupFiles,
	initGit,
	modifyHusky,
	modifyPackageJson,
} from 'modifiers/index.js';
import { execAsync } from 'utils/execAsync.js';
import { getPkgManagerFromAgent } from 'utils/getPkgManagerFromAgent.js';
import { logger } from 'utils/logger.js';
import { Modifier } from 'types/index.js';

interface Params {
	projectDir: string;
	projectName: string;
	boilerplateModifier?: Modifier;
	install: boolean;
}

/**
 * All actions that need to be done after cloning.
 */
export const postActions = async ({
	projectDir,
	projectName,
	boilerplateModifier,
	install,
}: Params) => {
	const spinner = ora({
		text: 'Preparing a new codebase for you...',
		spinner: 'star',
	}).start();

	cleanupFiles(projectDir);
	modifyPackageJson({ projectDir, projectName });
	modifyHusky(projectDir);

	if (boilerplateModifier) {
		boilerplateModifier({ projectDir, projectName });
	}

	initGit(projectDir);

	if (install) {
		const { pkgManagerName } = getPkgManagerFromAgent();
		await execAsync(`${pkgManagerName} install`, {
			cwd: projectDir,
		});
	}

	spinner.succeed();
	logger.succeed('\n🚀 Your codebase is ready!\n');
};
