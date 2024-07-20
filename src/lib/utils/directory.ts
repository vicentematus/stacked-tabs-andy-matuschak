import { extractFrontMatter } from '$lib/markdown/renderer';
import { getExternalLink } from '$lib/models/links';
import consola from 'consola';

export function generateSlug(str: string) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
	const to = 'aaaaeeeeiiiioooouuuunc------';
	for (let i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
}

export async function loadFile(path: string) {
	const NOTES_DIRECTORY = './notes/';
	const decodedPath = decodeURIComponent(path);
	const isDirectoryExist = await Bun.file(NOTES_DIRECTORY + decodedPath).exists();
	try {
		if (isDirectoryExist) {
			const file = Bun.file('./notes/' + decodedPath);
			const text = await file.text();
			const { data, body } = extractFrontMatter(text);
			const preview = getExternalLink({ data, body, path: path });
			return preview;
		} else {
			console.error('File does not exist.');
			return null;
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			consola.error(e.message);
		}
	}
}
