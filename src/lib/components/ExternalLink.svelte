<script lang="ts">
	import { links } from '$lib/stores/links';
	import SvelteMarkdown from 'svelte-markdown';

	export let href = '';
	export let title = '';
	export let text = '';
	console.log(href);
	$: console.log($links);
	// console.log(href, title, text);

	let isShowing = false;
	let markdown = 'hola';
	function onHover() {
		isShowing = !isShowing;

		// POR ACA VA ALGO TAMBIEN
		console.log($links);
		const filtered = $links.find((link) => {
			console.log({ link });
			console.log({ path: link.path });
			console.log({ href });

			const absoluteHref = '/notes' + new URL(href, window.location.href).pathname;
			console.log({ absoluteHref });
			return link.path === absoluteHref;
		});

		markdown = filtered.preview;
		console.log({ filtered });
	}

	function handleClick(event: Event) {
		event.preventDefault();
		console.log({event})
	}
</script>

<a
	{href}
	on:mouseenter={onHover}
	on:mouseleave={() => (isShowing = !isShowing)}
	on:click={handleClick}
>
	<slot />
</a>

{#if isShowing}
	<div>
		<SvelteMarkdown source={markdown} />
	</div>
{/if}
