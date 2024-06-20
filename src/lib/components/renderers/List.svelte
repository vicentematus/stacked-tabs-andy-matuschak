<!-- source: https://github.com/pablo-abc/svelte-markdown/blob/main/src/renderers/List.svelte  -->
<script>
    export let ordered
    export let start
  </script>
  
  {#if ordered}
    <ol class="list-decimal"><slot></slot></ol>
  {:else}
    <ul class="list-disc"><slot></slot></ul>
  {/if}