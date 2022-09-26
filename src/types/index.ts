export interface CliResults {
	projectName: string;
	projectDir: string;
	shouldOverwrite?: boolean;
	boilerplate: string;
	install: boolean;
}

interface ModifierParams {
	projectDir: string;
	projectName: string;
}

export type Modifier = (params: ModifierParams) => void;

interface EnquirerChoice {
	name: string;
	message?: string;
	value?: string;
	hint?: string;
	disabled?: boolean | string;
}

export interface Boilerplate extends EnquirerChoice {
	name: string;
	repo: string;
	/**
	 * The npm scripts to get started with the boilerplate.
	 */
	scripts: string[];
	/**
	 * Specific modifier for each boilerplate.
	 */
	modifier?: Modifier;
}
