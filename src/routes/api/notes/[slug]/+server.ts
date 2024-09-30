import { error } from '@sveltejs/kit';
import consola from 'consola';

export async function GET({ setHeaders, url }) {
	const urlParams = url.searchParams;
	const slug = urlParams.get('slug');

	if (!slug) {
		return error(404, 'Return a slug');
	}

	try {
		const decodedPath = decodeURIComponent(slug);
		console.log({ decodedPath });
		const isDirectoryExist = await Bun.file('./notes/' + decodedPath).exists();

		if (!isDirectoryExist) {
			throw new Error('File does not exist.');
		}

		const file = Bun.file('./notes/' + decodedPath);
		const text = await file.text();
		setHeaders({
			'Content-Type': 'text/markdown; charset=utf-8',
			'cache-control': 'max-age=600'
		});

		return new Response(text, {
			status: 200
		});
	} catch (err) {
		if (err instanceof Error) {
			consola.error('Failed to read the file:', err.message);
			error(404, "File doesn't exist");
		}
	}
}
