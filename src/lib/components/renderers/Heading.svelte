<script lang="ts">
  
    export let depth;
    export let raw;
  
    let id: string | undefined
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
  