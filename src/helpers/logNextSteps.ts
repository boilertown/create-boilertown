import type { Boilerplate } from '../types.js';
import { getPkgManagerFromAgent } from '../utils/getPkgManagerFromAgent.js';
import { logger } from '../utils/logger.js';

interface Params {
	projectName: string;
	selectedBoilerplate: Boilerplate;
}

export const logNextSteps = ({ projectName, selectedBoilerplate }: Params) => {
	const { pkgManagerName } = getPkgManagerFromAgent();

	logger.succeed('\n🚀 Your codebase is ready!\n');
	logger.info('Next steps:');
	logger.info(`  cd ${projectName}`);
	logger.info(`  ${pkgManagerName} install`);
	selectedBoilerplate.scripts?.forEach((script) => {
		logger.info(`  ${pkgManagerName} run ${script}`);
	});
	logger.info('\n');
};
