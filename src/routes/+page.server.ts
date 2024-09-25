import type { MarkdownInfo } from '$lib/markdown/renderer';
import { mockMardown } from '$lib/mocks/';
import { error } from '@sveltejs/kit';
import consola from 'consola';

export async function load({ fetch }) {
	try {
		// const response = await fetch('/api/notes');
		// const notes: MarkdownInfo[] = await response.json();

		const notes: MarkdownInfo[] = mockMardown;

		consola.info(notes);

		return {
			notes
		};
	} catch (err) {
		if (err instanceof Error) {
			error(404, { message: 'Error trying to read from notes endpoint' });
		}
		error(404, { message: 'Error trying to read from notes endpoint' });
	}
}
