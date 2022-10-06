import fs from 'node:fs';
import path from 'node:path';
import sortPackageJson from 'sort-package-json';
import type { PackageJson } from 'type-fest';

interface Params {
	projectDir: string;
	projectName: string;
}

export const modifyPackageJson = ({ projectDir, projectName }: Params) => {
	const packageJsonPath = path.join(projectDir, 'package.json');
	const packageJsonObject = JSON.parse(
		fs.readFileSync(packageJsonPath, 'utf-8'),
	) as PackageJson;

	packageJsonObject.name = projectName;
	packageJsonObject.version = '0.0.0';
	packageJsonObject.private = true;
	packageJsonObject.description = '';
	packageJsonObject.license = undefined;
	packageJsonObject.keywords = undefined;
	packageJsonObject.repository = {
		type: 'git',
		url: '',
	};

	const packageJsonContent = sortPackageJson(
		JSON.stringify(packageJsonObject, null, 2),
	);

	fs.writeFileSync(packageJsonPath, packageJsonContent);
};
