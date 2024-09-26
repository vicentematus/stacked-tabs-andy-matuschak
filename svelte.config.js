// @todo: agregar el adapter de bun, por que si no no funcionara
// import adapter from '@sveltejs/adapter-node';
import adapter from "svelte-adapter-bun";

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

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
