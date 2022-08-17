import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['**/__tests__/**'],
		exclude: [...configDefaults.exclude, '**/__tests__/utils/**'],
	},
});
