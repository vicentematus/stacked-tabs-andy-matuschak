<script lang="ts">
	import Heading from '$lib/components/renderers/Heading.svelte';
	import Markdown from '@magidoc/plugin-svelte-marked';
	import { testMarkdown } from './markdown';
	import Link from '$lib/components/renderers/Link.svelte';
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';
	import { Renderer, marked } from 'marked';
	import ExternalLink from '$lib/components/renderers/ExternalLink.svelte';
	import Thought from '$lib/components/Thought.svelte';
	import { links } from '$lib/stores/links';
	import StackedPagesProvider from '$lib/components/StackedPagesProvider.svelte';

	export let data;
	const { notes } = data;

	const note = notes[1];

	console.log({ note });

	const customRenders: Partial<Renderer> = {
		link({ href, title, text }) {
			console.log({ href });
			console.log({ title });
			return `
            <h1>
              <a name="href" class="anchor" href="#${text}">
                <span class="header-link">hola</span>
              </a>
              ${text}
            </h1>`;
		}
	};

	function handleMessage(event: any) {
		console.log('me ejecucte como fucnion');
		console.log(event);
		console.log(event.detail.text);
	}

	// TRATO DE USAR UN PROVIDER COMOO UN STORE PARA PODER ACCEDER A LOS LINKS!!
	links.set(note.externalLinks);
</script>

<StackedPagesProvider>
	<SvelteMarkdown
		source={note.body}
		renderers={{
			link: ExternalLink
		}}
	></SvelteMarkdown>
</StackedPagesProvider>
