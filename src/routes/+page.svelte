<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ExternalLink from '$lib/components/renderers/ExternalLink.svelte';
	import { links, stackedNotes } from '$lib/stores/links';
	import StackedPagesProvider from '$lib/components/StackedPagesProvider.svelte';

	export let data;
	const { notes } = data;

	const note = notes[1];

	console.log({ note });

	function handleMessage(event: any) {
		console.log('me ejecucte como fucnion');
		console.log(event);
		console.log(event.detail.text);
	}

	// TRATO DE USAR UN PROVIDER COMOO UN STORE PARA PODER ACCEDER A LOS LINKS!!
	links.set(note.externalLinks);

	$: console.log($stackedNotes);
</script>

<StackedPagesProvider>
	<SvelteMarkdown
		source={note.body}
		renderers={{
			link: ExternalLink
		}}
	></SvelteMarkdown>
</StackedPagesProvider>

