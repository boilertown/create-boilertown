export type PackageManager = 'npm' | 'pnpm' | 'yarn';

/**
 * Get the package manager that is being used.
 */
export const getPkgManagerFromAgent = () => {
	const userAgent = process.env.npm_config_user_agent;

	if (!userAgent) {
		return {
			pkgManagerName: 'npm' as PackageManager,
			pkgManagerVersion: '',
		};
	}

	const pkgSpec = userAgent.split(' ')[0];
	const pkgManager = pkgSpec.split('/');

	return {
		pkgManagerName: pkgManager[0] as PackageManager,
		pkgManagerVersion: pkgManager[1],
	};
};
