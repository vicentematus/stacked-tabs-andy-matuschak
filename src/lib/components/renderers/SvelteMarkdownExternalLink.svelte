<script lang="ts">
	import { getAstNode } from 'svelte-exmarkdown';
	const astContext = getAstNode();
    let isShowing = false;
	let loading: boolean = false;
	let markdown = '';
	console.log({ astContext });
	$: console.log($astContext);
</script>

<!-- <pre>{JSON.stringify($astContext, null, 2)}</pre> -->
	{#if $astContext?.children}
		{#if $astContext?.children[0]?.value}
        	{JSON.stringify($astContext?.children[0]?.value)}
            {JSON.stringify($astContext?.children[0])}
		{/if}
	{/if}
	
