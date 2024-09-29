<!-- DumpAst.svelte -->
<script lang="ts">
	import { getAstNode } from 'svelte-exmarkdown';

	const astContext = getAstNode();
</script>

<!-- Dump current node -->
 <!-- <pre>{JSON.stringify($astContext, null, 2)}</pre> -->
