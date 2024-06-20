<script lang="ts">
	import { links } from '$lib/stores/links';
	import SvelteMarkdown from 'svelte-markdown';
	import Heading from './Heading.svelte';
	import List from './List.svelte';
	import ListItem from './ListItem.svelte';
	import BlockQuote from './BlockQuote.svelte';
	import Paragraph from './Paragraph.svelte';
	import ThoughtParagraph from './ThoughtParagraph.svelte';

	export let href = '';
	export let title = '';
	export let text = '';

	let isShowing = false;
	let markdown = 'hola';
	function onHover() {
		isShowing = !isShowing;

		// POR ACA VA ALGO TAMBIEN
		const filtered = $links.find((link) => {
			const absoluteHref = '/notes' + new URL(href, window.location.href).pathname;
			console.log({ absoluteHref });
			return link.path === absoluteHref;
		});

		markdown = filtered?.preview || 'No preview available';
	}

	function handleClick(event: Event) {
		event.preventDefault();
		console.log({ event });
	}
</script>

<a
	{href}
	on:mouseenter={onHover}
	on:mouseleave={() => (isShowing = !isShowing)}
	on:click={handleClick}
	class="text-lg font-bold"
>
	<slot />
</a>

{#if isShowing}
	<div>
		<SvelteMarkdown
			source={markdown}
			renderers={{ heading: Heading, list: List, listitem: ListItem , blockquote: BlockQuote, paragraph: ThoughtParagraph}}
		/>
	</div>
{/if}
