import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: ['**/*.md'],
	server: {
		fs: {
			strict: false
		}
	},
	resolve: {
		alias: {
			// wait for glob import not working with aliases to resolve
			// https://github.com/vitejs/vite/issues/12180
			// '#': path.resolve(__dirname, 'notes'),
		}
	},
	build: {
		sourcemap: true
	}
});
