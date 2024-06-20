<script lang="ts">
	$: innerWidth = 0;

	$: console.log(innerWidth);

	$: if (innerWidth > 768) {
		console.log('es mas grande');
		console.log('hola');
        toggleStackedStyles();
	}

    function toggleStackedStyles(){

    }
</script>

<svelte:window bind:innerWidth />

<div class="flex max-w-xl mx-auto">
	<slot></slot>
</div>
