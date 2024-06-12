<script lang="ts">
    import {urlUtils} from '@magidoc/plugin-svelte-marked'
  
    import type { Tokens } from 'marked'
    import type { MarkdownOptions } from '@magidoc/plugin-svelte-marked';
  
    export let token: Tokens.Heading
    export let options: MarkdownOptions
  
    let id: string | undefined
    $: id = urlUtils.generatePathSegment(token.text, options.slugger)

  </script>
  
  <svelte:element this={`h${token.depth}`} {id}>
    <slot /> 
  </svelte:element>