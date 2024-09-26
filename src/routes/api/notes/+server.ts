import { json } from '@sveltejs/kit';
import { read } from '$app/server';
import { extractFrontMatter, extractHrefs } from '$lib/markdown/renderer.js';
import { consola } from 'consola';
import { type ExternalLink } from '$lib/models/links.js';
import { loadFile } from '$lib/utils/directory.js';
import { mockMardown } from '$lib/mocks/index.js';

interface MarkdownInfo {
	data: {
		title: string;
		date: string;
		tags: string[];
	};
	path: string;
	externalLinks: ExternalLink[];
	body: string;
}

export async function GET({ url }) {
	// const markdowns = import.meta.glob('../../../../notes/*.md', { eager: true, import: 'default' });

	// const notes: MarkdownInfo[] = [];
	const notes: MarkdownInfo[] = mockMardown;

	// for (const [file, asset] of Object.entries(markdowns)) {
	// 	if (!file) continue;
	// 	// check if file has .md extension, if not return
	// 	if (!file.endsWith('.md')) continue;

	// 	const [, category_dir, filename] = file;

	// 	const decodedAsset = decodeURIComponent(asset as string);
	// 	const fileAsset = await read(decodedAsset).text();

	// 	const { data, body } = extractFrontMatter(fileAsset);

	// 	const externalLinks = extractHrefs(body);
	// 	let noLinks = 0;

	// 	const previews: ExternalLink[] = [];
	// 	for (const path of externalLinks) {
	// 		try {
	// 			const markdown = loadFile(path);

	// 			if (markdown === undefined) {
	// 				noLinks++;
	// 				continue;
	// 			}

	// 			if (!markdown) {
	// 				noLinks++;
	// 				continue;
	// 			}
	// 		} catch (err) {
	// 			if (err instanceof Error) consola.error('Failed to read the file:', err.message);
	// 		}
	// 	}

	// 	consola.error(
	// 		'hubieron',
	// 		externalLinks.length,
	// 		'archivos que se les hace referencia, pero',
	// 		noLinks,
	// 		'no existen'
	// 	);

	// 	notes.push({ data, body, externalLinks: previews, path: asset as string });
	// }

	return json(notes);
}
