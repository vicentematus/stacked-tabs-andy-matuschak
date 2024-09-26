import { error } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import consola from 'consola';

export async function GET({ setHeaders, url }) {
	const urlParams = url.searchParams;
	const slug = urlParams.get('slug');

	if (!slug) {
		return error(404, 'Return a slug');
	}
	console.log({ slug });

	// read all the files in the current directory
	const files = await readdir('./notes');
	console.log({ files });
	try {
		const decodedPath = decodeURIComponent(slug);
		console.log({ decodedPath });
		const isDirectoryExist = await Bun.file('./notes/' + decodedPath).exists();

		if (!isDirectoryExist) {
			throw new Error('File does not exist.');
		}

		console.log('hola');
		const file = Bun.file('./notes/' + decodedPath);
		const text = await file.text();
		console.log(text);
		setHeaders({
			'cache-control': 'max-age=600',
			'Content-Type': 'text/markdown'
		});

		return new Response(text, {
			status: 200,
			headers: {
				'Content-Type': 'text/markdown',
				'cache-control': 'max-age=600'
			}
		});
	} catch (err) {
		if (err instanceof Error) {
			consola.error('Failed to read the file:', err.message);
			error(404, "File doesn't exist");
		}
	}
}
