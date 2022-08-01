export interface CliResults {
	projectName: string;
	projectDir: string;
	shouldOverwrite?: boolean;
	boilerplate: string;
}

export interface Boilerplate {
	/**
	 * Name of the repository.
	 */
	name: string;
	/**
	 * HTTP URL of repository.
	 */
	repo: string;
	/**
	 * The npm scripts to get started with the boilerplate.
	 */
	scripts: string[];
}
