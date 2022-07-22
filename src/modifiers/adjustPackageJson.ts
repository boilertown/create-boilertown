import fs from 'node:fs';
import path from 'node:path';
import type { PackageJson } from 'type-fest';

interface Params {
	projectDir: string;
	projectName: string;
}

export const adjustPackageJson = async ({
	projectDir,
	projectName,
}: Params) => {
	const packageJsonPath = path.join(projectDir, 'package.json');
	const packageJsonContent = JSON.parse(
		fs.readFileSync(packageJsonPath, 'utf-8'),
	) as PackageJson;

	packageJsonContent.name = projectName;
	packageJsonContent.version = '0.0.0';
	packageJsonContent.repository = undefined;

	fs.writeFileSync(
		packageJsonPath,
		JSON.stringify(packageJsonContent, null, 2),
	);
};
