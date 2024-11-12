<script lang="ts">
  import { onMount } from "svelte";

  const n = 100;
  let checkboxes = $state<boolean[]>(Array(n));
  let checkedCount = $derived(checkboxes.filter((e) => !!e).length);
  let win = $derived(checkboxes.length == n && checkedCount == n);

  onMount(() => {
    // Fill half
    for (let i = 0; i < n; i++) {
      if (((i % 10) + ~~(i / 10)) % 2 == 0) {
        checkboxes[i] = true;
      }
    }

    // Sabotage
    const interval = setInterval(() => {
      if (win) {
        clearInterval(interval);
      } else {
        checkboxes[~~(Math.random() * 100)] = false;
      }
    }, 100);

    return () => clearInterval(interval);
  });

  $effect(() => {
    if (win) {
      alert("Your code is ...");
    }
  });
</script>

{#if win}
  <h1>You win!</h1>
{:else}
  <h1>{checkedCount}/{n}</h1>
{/if}

<div class="container">
  {#each checkboxes as box, idx}
    <input type="checkbox" bind:checked={checkboxes[idx]} id={idx} />
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(10, 0fr);
  }
</style>
