import figlet from 'figlet';
import gradient from 'gradient-string';
import { APP_NAME } from '../constants.js';

/**
 * Render `Boilertowns` at the beginning of the app.
 */
export const renderTitle = () => {
	const text = figlet.textSync(APP_NAME, {
		font: 'Slant',
	});

	console.log(`\n${gradient.morning.multiline(text)}\n`);
};
