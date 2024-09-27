<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ExternalLink from '$lib/components/renderers/ExternalLink.svelte';
	import { links, stackedNotes } from '$lib/stores/links';
	import StackedPagesProvider from '$lib/components/StackedPagesProvider.svelte';
	import List from '$lib/components/renderers/List.svelte';
	import Paragraph from '$lib/components/renderers/Paragraph.svelte';
	import ListItem from '$lib/components/renderers/ListItem.svelte';
	import BlockQuote from '$lib/components/renderers/BlockQuote.svelte';

	export let data;
	const { notes } = data;

	const note = notes[0];

	console.log({notes})
	console.log({ note });

	// TRATO DE USAR UN PROVIDER COMOO UN STORE PARA PODER ACCEDER A LOS LINKS!!
	links.set(note.externalLinks);

	$: console.log($stackedNotes);
</script>

<StackedPagesProvider>
	<div class="px-8 py-2">
		<SvelteMarkdown
			source={note.body}
			renderers={{
				link: ExternalLink,
				list: List,
						listitem: ListItem,
						blockquote: BlockQuote,
			}}
		></SvelteMarkdown>
	</div>
</StackedPagesProvider>
