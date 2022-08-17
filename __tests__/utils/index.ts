import ansiRegex from 'ansi-regex';
import { ChildProcessWithoutNullStreams } from 'node:child_process';
import fs from 'node:fs';

const keys = {
	up: '\x1B\x5B\x41',
	down: '\x1B\x5B\x42',
	enter: '\x0D',
	space: '\x20',
};

const cleanPrompt = <T extends { toString(): string }>(data: T): string => {
	return data
		.toString()
		.replace(ansiRegex(), '')
		.trim()
		.split('\n')
		.map((s) => s.replace(/\s+$/, ''))
		.join('\n');
};

export const runInteractiveCLI = (
	cli: ChildProcessWithoutNullStreams,
): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		const messages: string[] = [];

		cli.stdout.on('data', (data) => {
			const prompt = cleanPrompt(data);

			if (!prompt) {
				return;
			}

			messages.push(prompt);
			cli.stdin.write(keys.enter);
		});

		cli.on('exit', () => {
			resolve(messages);
		});

		cli.on('error', (e) => {
			reject(e);
		});
	});
};

export const cleanupTestDir = (testDir: string) => {
	if (fs.existsSync(testDir)) {
		fs.rmSync(testDir, { recursive: true });
	}
};
