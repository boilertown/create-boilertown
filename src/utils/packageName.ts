const validationRegExp =
	/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export const isValidPackageName = (pkgName: string) => {
	return validationRegExp.test(pkgName);
};

export const convertToValidPackageName = (pkgName: string) => {
	return pkgName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/^[._]/, '')
		.replace(/[^a-z0-9-~]+/g, '-');
};
