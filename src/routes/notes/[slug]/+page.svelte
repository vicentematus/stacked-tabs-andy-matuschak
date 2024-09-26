
<script lang="ts">
    export let data;
    import SvelteMarkdown from 'svelte-markdown';
    const {content} = data
</script>

<SvelteMarkdown source={content} />