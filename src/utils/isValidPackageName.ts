const validationRegExp =
	/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export const isValidPackageName = (pkgName: string) => {
	return validationRegExp.test(pkgName);
};
