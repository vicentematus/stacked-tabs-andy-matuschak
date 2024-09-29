<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ExternalLink from '$lib/components/renderers/ExternalLink.svelte';
	import { links, stackedNotes } from '$lib/stores/links';
	import StackedPagesProvider from '$lib/components/StackedPagesProvider.svelte';
	import List from '$lib/components/renderers/List.svelte';
	import Paragraph from '$lib/components/renderers/Paragraph.svelte';
	import ListItem from '$lib/components/renderers/ListItem.svelte';
	import BlockQuote from '$lib/components/renderers/BlockQuote.svelte';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import type { Plugin } from 'svelte-exmarkdown';
	import DumpAst from '$lib/components/renderers/DumpAst.svelte';
	import SvelteMarkdownParagraph from '$lib/components/renderers/SvelteMarkdownParagraph.svelte';
	import SvelteMarkdownExternalLink from '$lib/components/renderers/SvelteMarkdownExternalLink.svelte';

	const plugins: Plugin[] = [{ renderer: { h1: DumpAst, p: SvelteMarkdownParagraph, a: SvelteMarkdownExternalLink} }];

	export let data;
	const { notes } = data;

	const note = notes[0];
	console.log({note})
	let md = '# Hello world!';


	// TRATO DE USAR UN PROVIDER COMOO UN STORE PARA PODER ACCEDER A LOS LINKS!!
	links.set(note.externalLinks);

	$: console.log($stackedNotes);
	console.log('hola');
	console.log('asdads');
</script>

<h1>Titulo</h1>

<!-- <StackedPagesProvider> -->
<div class="px-8 py-2">
	<!-- <SvelteMarkdown
			source={note.body}
			renderers={{
				link: ExternalLink,
				list: List,
						listitem: ListItem,
						blockquote: BlockQuote,
			}}
		></SvelteMarkdown> -->

	<Markdown md={note} plugins={plugins} />
</div>
<!-- </StackedPagesProvider> -->
