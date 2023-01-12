import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { cleanupTestDir, runInteractiveCLI } from './utils/index.js';

const createBoilertownApp = path.resolve(__dirname, '../dist/index.js');
const testDir = path.join(__dirname, '../my-awesome-project');

describe('create-boilertown cli', () => {
	beforeAll(() => {
		if (!fs.existsSync(createBoilertownApp)) {
			throw new Error(
				'Cannot run Boilertown CLI tests without building. Run `pnpm build` first.',
			);
		}
	});

	afterAll(() => {
		cleanupTestDir(testDir);
	});

	test('should guide user through the process', async () => {
		const cli = spawn('node', [createBoilertownApp]);
		const messages = await runInteractiveCLI(cli);

		expect(
			messages.find((msg) =>
				msg.match(new RegExp(/🚀 Your codebase is ready!/)),
			),
		).toBeTruthy();

		expect(fs.existsSync(path.resolve(testDir, 'node_modules'))).toBe(false);
	}, 10000);
});
