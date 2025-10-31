<script>
    import MainButton from "$lib/components/MainButton.svelte";
    import cookie from "$lib/assets/cookie.png"
</script>


<main class="w-screen bg-(--pink) h-screen flex flex-col items-center justify-center relative mt-3rem">
    <span class="flex text-oswald text-[20vw] font-bold gap-10 items-center">
        4
        <img src={cookie} alt="cookie" class="w-[25vw]">
        4
    </span>
    <p class="text-oswald text-2xl">тук няма барчета...</p>
    <MainButton onclick={() => window.location.href = '/'} margin="3rem">Начало</MainButton>
</main>
