import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { use } from 'marked';
import { visit } from 'unist-util-visit';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],

	remarkPlugins: [
		remarkUnwrapImages,
		[remarkToc, { tight: true }],
		use(() => (tree) => {
			visit(tree, 'link', (node, index, parent) => {
				console.log({ node });
				if (node.type === 'link') {
					// if the url string is not a relative path then return
					//  todo: try to save the files who has external links
					if (node.url.includes('http')) return console.error('External link found');

					links.push(node.url);
					console.log({ links });
				}
			});
		})
	],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
