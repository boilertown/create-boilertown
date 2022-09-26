import { getPkgManagerFromAgent } from 'utils/getPkgManagerFromAgent.js';
import { logger } from 'utils/logger.js';
import type { Boilerplate } from 'types/index.js';

interface Params {
	projectName: string;
	selectedBoilerplate: Boilerplate;
	install: boolean;
}

export const logNextSteps = ({
	projectName,
	selectedBoilerplate,
	install,
}: Params) => {
	const { pkgManagerName } = getPkgManagerFromAgent();

	logger.info('Next steps:');
	logger.info(`  cd ${projectName}`);
	if (!install) {
		logger.info(`  ${pkgManagerName} install`);
	}
	selectedBoilerplate.scripts?.forEach((script) => {
		logger.info(`  ${pkgManagerName} run ${script}`);
	});
	logger.info('\n');
};
