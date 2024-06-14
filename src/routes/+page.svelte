<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Markdown from '@magidoc/plugin-svelte-marked';
	import { testMarkdown } from './markdown';
	import Link from '$lib/components/Link.svelte';
	import { page } from '$app/stores';

	export let data;
	const { notes } = data;

	function handleMessage(event: any) {
		console.log('me ejecucte como fucnion');
		console.log(event);
		console.log(event.detail.text);
	}
</script>

<Markdown
	source={testMarkdown}
	renderers={{
		heading: Heading,
		link: Link
	}}
	on:message={handleMessage}
/>
