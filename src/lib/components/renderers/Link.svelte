<script lang="ts">
	import { urlUtils } from '@magidoc/plugin-svelte-marked';

	import type { Tokens } from 'marked';
	import type { MarkdownOptions } from '@magidoc/plugin-svelte-marked';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import {nanoid} from 'nanoid';
	import Thought from '../Thought.svelte';

	const { isRelative, joinUrlPaths } = urlUtils;
	export let token: Tokens.Link;
	export let options: MarkdownOptions;

	const dispatch = createEventDispatcher();

    const id = nanoid(10);

	function handleClick(event: MouseEvent) {
		event.preventDefault();
		dispatch('message', { href: token.href });

		let query = new URLSearchParams($page.url.searchParams.toString());
        //check if id exist on the queryparams
        console.log($page.url.searchParams.toString())

		query.append('stack', id);
		goto(`?${query.toString()}`);
	}

</script>

<Thought options={options}>

<a
	href={isRelative(token.href) ? joinUrlPaths(options.baseUrl, token.href) : token.href}
	title={token.title}
	on:click={handleClick}
>
	<slot />
</a>


</Thought>
