<script lang="ts">
    import {urlUtils} from '@magidoc/plugin-svelte-marked'
  
    import type { Tokens } from 'marked'
    import type { MarkdownOptions } from '@magidoc/plugin-svelte-marked';
  
    export let token: Tokens.Heading
    export let options: MarkdownOptions;
    export let depth;
    export let raw;
  
    let id: string | undefined
    // $: id = urlUtils.generatePathSegment(token.text, options.slugger)
    console.log({depth})

  </script>
  
{#if depth === 1}
<h1 class="text-3xl">
  <slot></slot>
</h1>
{/if}

  <svelte:element this={`h${depth}`} {id}>
    <slot /> 
  </svelte:element>
  