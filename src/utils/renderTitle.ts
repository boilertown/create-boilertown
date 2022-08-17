import figlet from 'figlet';
import gradient from 'gradient-string';
import { TITLE } from '../constants.js';

export const renderTitle = () => {
	const text = figlet.textSync(TITLE, {
		font: 'Slant',
	});

	console.log(`\n${gradient.morning.multiline(text)}\n`);
};
