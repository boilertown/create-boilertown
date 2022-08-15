import camelcase from 'camelcase';
import chalk from 'chalk';
import enquirer from 'enquirer';
import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const boilerplatesDir = path.resolve(process.cwd(), 'src/boilerplates');

const prettierConfig = {
	parser: 'babel',
	semi: true,
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	trailingComma: 'all',
};

async function createFileByTemplate(templateName, data) {
	const templateDir = path.resolve(__dirname, `templates/${templateName}.hbs`);
	const content = await fs.readFile(templateDir, 'utf-8');
	const template = handlebars.compile(content);
	return prettier.format(template(data), prettierConfig);
}

async function boilerplateIndexFileContent() {
	let index = `
	/**
	 * DO NOT UPDATE THIS FILE MANUALLY!!!
	 *
	 * This file has been automatically generated by \`scripts/add-boilerplate.js\`.
	 * If you want to add a new boilerplate, please run command bellow and follow the instructions 🙏
	 *
	 * \`\`\`
	 * pnpm run boilerplate:add
	 * \`\`\`
	 */
	`;

	let exportContent = `export default [`;

	const files = await fs.readdir(boilerplatesDir);

	files
		.filter((file) => file !== 'index.ts')
		.map((file) => [file, camelcase(file)])
		.forEach(([file, boilerplateName]) => {
			index += `import ${boilerplateName} from './${file}/index.js';\n`;
			exportContent += `${boilerplateName},`;
		});

	exportContent += '];';

	return prettier.format(`${index}\n${exportContent}\n`, prettierConfig);
}

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

		const dirIndex = await createFileByTemplate('index.ts', {
			name,
			repo,
			scripts,
		});
		const dirModifier = await createFileByTemplate('modifier.ts', { repo });
		const boilerplatesIndex = await boilerplateIndexFileContent();

		await fs.writeFile(`${dir}/index.ts`, dirIndex, 'utf-8');
		await fs.writeFile(`${dir}/modifier.ts`, dirModifier, 'utf-8');
		await fs.writeFile(`${boilerplatesDir}/index.ts`, boilerplatesIndex, {
			encoding: 'utf-8',
			flag: 'w+',
		});

		console.log(`\n👍 Awesome!, ${chalk.green(name)} was added.\n`);
	} catch (error) {
		console.log(`❌ ${error}`);
	}
})();