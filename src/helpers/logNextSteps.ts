import { getPkgManagerFromAgent } from '../utils/getPkgManagerFromAgent.js';
import { logger } from '../utils/logger.js';

interface Params {
	projectName: string;
}

export const logNextSteps = ({ projectName }: Params) => {
	const pkgManager = getPkgManagerFromAgent();
	logger.info('Next steps:');
	logger.info(`  cd ${projectName}`);
	logger.info(`  ${pkgManager} install`);
	logger.info(`  ${pkgManager} run dev`);
};
