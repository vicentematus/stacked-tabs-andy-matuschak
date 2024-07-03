<script lang="ts">
	import { COL_WIDTH, stackedNotes } from '$lib/stores/links';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { queryParam } from 'sveltekit-search-params';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';


		$: console.log({$page});
			$: innerWidth = 0;

	$: console.log(innerWidth);

	const linkStore = writable([]);

	$: if (innerWidth > 768) {
		console.log('es mas grande');
		console.log('hola');
	}

	$: console.log(linkStore);
	$: console.log($stackedNotes);

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
		const notesColumnsWidth = count * COL_WIDTH;
		console.log({ count });
		console.log({ notesColumnsWidth });
	}

	// create a randomColor function
	function randomColor() {
		console.log('#' + Math.floor(Math.random() * 16777215).toString(16));
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

	// alguna forma de saber el index
</script>

<svelte:window bind:innerWidth />

{#if $stackedNotes.length > 0}
	<div class="absolute right-0 top-0 text-clip">
		<h1>Stacked Notes</h1>
		<ul>
			{#each $stackedNotes as note}
				<li>
					<a href={note.href}>{note.href}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<div id="scrolling-container">
	<div
		id="note-columns-container"
		style="width: {$stackedNotes.length * COL_WIDTH + COL_WIDTH}px"
		class="bg-indigo-200 flex"
	>
		{#if $stackedNotes.length > 0}
			{#each $stackedNotes as note,index}
				<div style="width: {COL_WIDTH}; background-color: {randomColor()}">"pagina"</div>
			{/each}
		{/if}
		<div class="mx-auto max-w-3xl">
			<slot></slot>
		</div>
	</div>
</div>
