import type { Modifier } from '../../types.js';
import { getPkgManagerFromAgent } from '../../utils/getPkgManagerFromAgent.js';
import { modifyGithubActions } from '../common/modifyGithubActions.js';

/**
 * Custom modifier of https://github.com/boilertowns/react-ui-boilerplate
 */
export const reactUiBoilerplateModifier: Modifier = ({ projectDir }) => {
	const { pkgManagerName } = getPkgManagerFromAgent();

	/**
	 * The original boilerplate is using `pnpm`. CLI need to modify this to support
	 * `npm` and `yarn` properly.
	 */
	if (pkgManagerName !== 'pnpm') {
		modifyGithubActions(projectDir);
	}
};
