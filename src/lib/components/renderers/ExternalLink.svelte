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
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let href = '';
	export let title = '';
	export let text = '';

	let loading: boolean = false;
	let markdown = '';
	let open = false;

	async function fetchMarkdown() {
		loading = true;
		try {
			const response = await fetch('/api/notes/detail/?slug=' + encodeURIComponent(href), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'force-cache'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blob = await response.blob();
			const text = await blob.text();

			markdown = text;
		} catch (error) {
			console.error('Error fetching the page:', error);
			markdown = 'No preview available';
		} finally {
			loading = false;
		}
	}
	

	$: if (open && !markdown && !loading) {
		console.log("its open")
		fetchMarkdown();
	}

	function handleClick(event: Event) {
		if (markdown === 'No preview available') {
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
<Tooltip.Root openDelay={0} bind:open>
	<Tooltip.Trigger class="inline-flex text-start">
		<a
			{href}
			on:click|preventDefault={handleClick}
			class="text-lg font-bold"
		>
			<slot />
		</a>
	</Tooltip.Trigger>

	<Tooltip.Content transitionConfig={{ duration: 300 }} class="max-w-xl">
		{#if open}
			<div>
				{#if loading}
					<div class="space-y-2">
						<Skeleton class="h-4 w-[250px]" />
						<Skeleton class="h-4 w-[500px]" />
						<Skeleton class="h-4 w-[500px]" />
						<Skeleton class="h-4 w-[500px]" />
						<Skeleton class="h-4 w-[500px]" />
						<Skeleton class="h-4 w-[500px]" />
						<Skeleton class="h-4 w-[500px]" />
					</div>
				{:else}
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
				{/if}
			</div>
		{/if}
	</Tooltip.Content>
</Tooltip.Root>
