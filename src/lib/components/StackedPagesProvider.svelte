<script lang="ts">
	import { stackedNotes } from '$lib/stores/links';
	import { setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { queryParam } from 'sveltekit-search-params';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ExternalLink from '$lib/components/renderers/ExternalLink.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import type { Plugin } from 'svelte-exmarkdown';

	const plugins: Plugin[] = [
		gfmPlugin(),
		{
			renderer: {
				link: ExternalLink,
			}
		}
	];

	$: innerWidth = 0;

	// TODO: Is the type right?
	let scrollingContainer: HTMLElement;

	function adjustScroll() {
		if (scrollingContainer) {
			scrollingContainer.scrollTo({
				left: scrollingContainer.scrollWidth,
				behavior: 'smooth'
			});
		}
	}

	$: if ($stackedNotes) {
		tick().then(() => {
			adjustScroll();
		});
	}


	const linkStore = writable([]);


	const stackedNoteParams = queryParam('stackedNotes');

	$: stackedNotes.subscribe((value) => {
		console.log('store updatee');
		console.log({ value });

		const links = value.map((note) => {
			return note.href;
		});

		// addStackedNotes(...links);
	});

	$: if ($stackedNotes) {
		const count = $stackedNotes.length;
		const COL_WIDTH = 520;
		const notesColumnsWidth = count * COL_WIDTH;
		if (notesColumnsWidth > innerWidth) {
			console.log('Hay un overflow');
		}
	}

</script>

<svelte:window bind:innerWidth />

<div
	id="scrolling-container"
	class="h-screen max-w-[100vw] overflow-x-auto"
	bind:this={scrollingContainer}
>
	<div
		id="note-columns-container"
		class="flex flex-nowrap justify-start border border-x "
	>
		<div class="h-screen w-[520px] flex-none">
			<slot></slot>
		</div>
		{#if $stackedNotes.length > 0}
			{#each $stackedNotes.reverse() as note, index}
				<div class="w-[520px] flex-none p-4 shadow-md">
					<!-- <SvelteMarkdown
						source={note.body}
						renderers={{
							link: ExternalLink
						}}
					></SvelteMarkdown> -->
					<Markdown md={note.body} {plugins} />
				</div>
			{/each}
		{/if}
	</div>
</div>
