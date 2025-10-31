<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    import done from '$lib/assets/done.svg'
    import logo from '$lib/assets/logo.svg'

    let {data} = $props()
</script>

<img src="{logo}" alt="logo" class="fixed top-4 left-4 w-32">

<main class="w-screen h-screen flex justify-center items-center gap-4 flex-col">
    <h1 class="text-oswald font-bold text-4xl">Поръчката ви се обработва!</h1>
    <h2 class="text-oswald text-2xl">Ще се свържем с вас скоро!</h2>
    <div class="w-max h-max p-3 rounded-full" style="border: var(--white) .3rem solid">
        <img src="{done}" alt="done" class="w-12 h-12">
    </div>
    <BuyButton onclick={() => window.location.href = '/'} tailwindClass="w-48 mt-10 ">Начало</BuyButton>
</main>

<style>
    :global(body) {
        background-color: var(--pink);
    }
</style>