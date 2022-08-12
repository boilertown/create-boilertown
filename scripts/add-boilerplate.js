import chalk from 'chalk';
import enquirer from 'enquirer';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import prettier from 'prettier';

function indexFileContent({ name, repo, scripts }) {
	const content = `
import type { Boilerplate } from 'types/index.js';

const boilerplates: Boilerplate = {
	name: '${name}',
	repo: '${repo}',
	scripts: [${scripts.map((s) => `'${s}'`).join(',')}],
};

export default boilerplates;
`;

	return prettier.format(content, {
		parser: 'babel',
		semi: true,
		singleQuote: true,
		useTabs: true,
		tabWidth: 2,
		trailingComma: 'all',
	});
}

const boilerplatesDir = path.resolve(process.cwd(), 'src/boilerplates');

(async () => {
	try {
		console.log(
			chalk.bold('🎉 Welcome & Thank you for contributing to Boilertowns!\n'),
		);

		const answers = await enquirer.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'Boilerplate name (ex. my-boilerplate):',
			},
			{
				name: 'repo',
				type: 'input',
				message: 'GitHub repository:',
				validate: (value) => {
					if (value.includes('git@github.com')) {
						return `Please use https url or format ${chalk.bold(
							'github-user/repo-name',
						)}.`;
					}
					return true;
				},
				result: (value) => {
					let result = '';

					result = !value.startsWith('https://github.com')
						? `https://github.com/${value}`
						: value;

					if (result.endsWith('.git')) {
						result = result.slice(0, -4);
					}

					return result;
				},
			},
			{
				name: 'scripts',
				type: 'list',
				message: 'NPM "scripts" (comma-separated):',
			},
		]);

		const { name, repo, scripts } = answers;
		const dir = path.resolve(boilerplatesDir, name);

		await fs.mkdir(dir);

		await fs.writeFile(
			`${dir}/index.ts`,
			indexFileContent({ name, repo, scripts }),
			'utf-8',
		);

		console.log(
			`\n👍 Awesome!, ${chalk.green(name)} was added to ${chalk.inverse(
				`${boilerplatesDir}`,
			)}.\n`,
		);
	} catch (error) {
		console.log(`❌ ${error}`);
	}
})();
