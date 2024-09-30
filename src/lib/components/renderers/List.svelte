<!-- source: https://github.com/pablo-abc/svelte-markdown/blob/main/src/renderers/List.svelte  -->
<script>
    export let ordered
    export let start
  </script>
  
  {#if ordered}
    <ol class="list-decimal space-y-2"><slot></slot></ol>
  {:else}
    <ul class="list-disc space-y-2"><slot></slot></ul>
  {/if}