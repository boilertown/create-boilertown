import type { Boilerplate } from '../types.js';
import { getPkgManagerFromAgent } from '../utils/getPkgManagerFromAgent.js';
import { logger } from '../utils/logger.js';

interface Params {
	projectName: string;
	selectedBoilerplate: Boilerplate;
}

export const logNextSteps = ({ projectName, selectedBoilerplate }: Params) => {
	const pkgManager = getPkgManagerFromAgent();
	logger.succeed("\n🎉 You're all set!\n");
	logger.info('Next steps:');
	logger.info(`  cd ${projectName}`);
	logger.info(`  ${pkgManager} install`);
	logger.info(`  ${pkgManager} run ${selectedBoilerplate.script || 'dev'}`);
	logger.info(`\n`);
};
