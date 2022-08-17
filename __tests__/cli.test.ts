import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { cleanupTestDir, runInteractiveCLI } from './utils/index.js';

const createBoilertownsApp = path.resolve(__dirname, '../dist/index.js');
const testDir = path.join(__dirname, '../my-awesome-project');

describe('create-boilertowns cli', () => {
	beforeAll(() => {
		if (!fs.existsSync(createBoilertownsApp)) {
			throw new Error(
				'Cannot run Boilertowns CLI tests without building. Run `pnpm build` first.',
			);
		}
	});

	afterAll(() => {
		cleanupTestDir(testDir);
	});

	test('should guide user through the process', async () => {
		const cli = spawn('node', [createBoilertownsApp]);
		const messages = await runInteractiveCLI(cli);

		expect(
			messages.find((msg) =>
				msg.match(new RegExp(/🚀 Your codebase is ready!/)),
			),
		).toBeTruthy();

		expect(fs.existsSync(path.resolve(testDir, 'node_modules'))).toBe(false);
	});
});
