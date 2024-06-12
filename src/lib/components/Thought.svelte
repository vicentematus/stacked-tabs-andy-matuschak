<script lang="ts">
	import { urlUtils } from '@magidoc/plugin-svelte-marked';

	import type { Tokens } from 'marked';
	import type { MarkdownOptions } from '@magidoc/plugin-svelte-marked';

	const { isRelative, joinUrlPaths } = urlUtils;
	export let options: MarkdownOptions;

	let showPreview = false;

	function handleMouseOver() {
		showPreview = true;
	}

	function handleMouseOut() {
		showPreview = false;
	}
</script>

<div on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}  on:focus={handleMouseOut} role="dialog" on:blur={handleMouseOut} style="background-color: aqua; display:inline">
	<slot />
	{#if showPreview}
		<div class="preview">
			soy una preveiw man
			<!-- Your preview content here -->
		</div>
	{/if}
</div>
