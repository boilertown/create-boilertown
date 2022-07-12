export type PackageManager = 'npm' | 'pnpm' | 'yarn';

/**
 * Get the package manager that is being used.
 */
export const getPkgManagerFromAgent = (): PackageManager => {
	const userAgent = process.env.npm_config_user_agent;

	if (!userAgent) {
		return 'npm';
	}

	const pkgSpec = userAgent.split(' ')[0];
	const pkgManager = pkgSpec.split('/');

	return pkgManager[0] as PackageManager;
};
