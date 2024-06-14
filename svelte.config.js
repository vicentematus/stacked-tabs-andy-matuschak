import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { use } from 'marked';
import { visit } from 'unist-util-visit';
import { remark } from 'remark';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],

	remarkPlugins: [
		remarkUnwrapImages,
		[remarkToc, { tight: true }],
		use(() => {
			let links = []; // Define the links array
			return (tree) => {
				visit(tree, ['link'], (node) => {
					if (!node.url.includes('http')) {
						links.push(node.url);
					}
				});
				return links; // Return the links array
			};
		})
	],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// ojo con agregar el .md
	// thought: puede ser que si agrego el .md en la lista de extensiones, vite lo prepropcsse como un asset y pueda hacer la lectura de una?
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
