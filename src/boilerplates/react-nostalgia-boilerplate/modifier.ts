import { modifyGithubActions } from 'modifiers/index.js';
import { getPkgManagerFromAgent } from 'utils/getPkgManagerFromAgent.js';
import type { Modifier } from 'types/index.js';

/**
 * Custom modifier of https://github.com/boilertowns/react-nostalgia-boilerplate
 */
export const modifier: Modifier = ({ projectDir }) => {
	const { pkgManagerName } = getPkgManagerFromAgent();

	/**
	 * The original boilerplate is using `pnpm`. CLI need to modify this to support
	 * `npm` and `yarn` properly.
	 */
	if (pkgManagerName !== 'pnpm') {
		modifyGithubActions(projectDir);
	}
};
