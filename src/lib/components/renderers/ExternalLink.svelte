<script lang="ts">
	import { links, stackedNotes } from '$lib/stores/links';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import SvelteMarkdown from 'svelte-markdown';
	import Heading from './Heading.svelte';
	import List from './List.svelte';
	import ListItem from './ListItem.svelte';
	import BlockQuote from './BlockQuote.svelte';
	import Paragraph from './Paragraph.svelte';
	import ThoughtParagraph from './ThoughtParagraph.svelte';
	import { getContext, setContext } from 'svelte';

	export let href = '';
	export let title = '';
	export let text = '';

	let isShowing = false;
	let loading: boolean = false;
	let markdown = '';
	async function onHover() {
		isShowing = !isShowing;

		// TODO: Define the api route endpoint correctly. Is this the correct HTTP Method for a get of a note? Why should i need to pass a slug does this makes sense?
		try {
			const response = await fetch('/api/notes/detail/?slug=' + encodeURIComponent(href), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blob = await response.blob();
			const text = await blob.text();

			markdown = text;
			console.log({ text });
		} catch (error) {
			console.error('Error fetching the page:', error);
			markdown = 'No preview available';
		}
	}

	function handleClick(event: Event) {
		if(markdown === 'No preview available') {
			event.preventDefault();
			return;
		}
		event.preventDefault();
		console.log({ href });

		const isAlreadyStacked = $stackedNotes.some((note) => note.href === href);

		if (isAlreadyStacked) {
			return;
		}

		if (!markdown) {
			return;
		}

		stackedNotes.set([...$stackedNotes, { href, body: markdown }]);
	}
</script>

<!--  TODO: Improve the structure of this component because Tooltip Root idk if it should be here.-->
<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger class="inline-flex text-start" >
		<a
			{href}
			on:mouseenter={onHover}
			on:mouseleave={() => (isShowing = !isShowing)}
			on:click|preventDefault={handleClick}
			class="text-lg font-bold"
		>
			<slot />
		</a>
	</Tooltip.Trigger>

	<Tooltip.Content transitionConfig={{duration:10}} class="max-w-xl">
		{#if loading}
			Esta cargando
		{:else if isShowing}
			<div>
				<SvelteMarkdown
					source={markdown}
					renderers={{
						heading: Heading,
						list: List,
						listitem: ListItem,
						blockquote: BlockQuote,
						paragraph: ThoughtParagraph
					}}
				/>
			</div>
		{/if}
	</Tooltip.Content>
</Tooltip.Root>
