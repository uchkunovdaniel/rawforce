<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    import logo from "$lib/assets/logo.svg";
    import PasswordInput from "$lib/components/PasswordInput.svelte";
    import register_decorations from "$lib/assets/register-decorations.webp"

    let fail = $state(false);

    async function register(){
        const form = document.querySelector('form') as HTMLFormElement;
        const data = new FormData(form);

        if(data.get('password') !== data.get('passwordConfirm')){
            fail = true;
            return;
        }
        await fetch('/login?/register', {
            method: 'POST',
            body: data,
            headers: {
                'x-sveltekit-action': true
            }
        })
    }
    function shake(element: HTMLElement) {
            return {
                duration: 80,
                css: (t: number) => `transform: translateX(${t * 10}px)`
            }
    }

</script>

<button onclick={() => window.location.href = '/'} class="fixed">
    <img src="{logo}" alt="logo" class="fixed top-2 left-2 w-26">
</button>

<main class="w-screen h-screen grid grid-cols-2 max-md:grid-cols-1 grid-rows-1">
    <section class="flex flex-col justify-center items-center gap-6">
        <h1 class="text-oswald-lp text-3xl">Регистрация</h1>
        <form class="flex flex-col gap-6" onsubmit={() => {register().then(() => window.location.href = '/profile')}}>
            <fieldset>
                <label for="email" class="text-oswald-b font-light">Имейл адрес</label>
                <input id="email" type="email" name="email" class="w-64 h-8 bg-(--pink) text-oswald-b block focus:outline-1 px-2 rounded">
            </fieldset>
            <fieldset>
                <label for="password" class="text-oswald-b font-light">Парола</label>
                <PasswordInput id="password" />
            </fieldset>
            <fieldset>
                <label for="passwordConfirm" class="text-oswald-b font-light">Потвърди парола</label>
                <PasswordInput id="passwordConfirm" />
            </fieldset>
            <BuyButton type="submit">Регистрация</BuyButton>
            <button type="button" class="text-oswald-b w-full text-right px-2 md:hidden" onclick={() => window.location.href = 'login'}>Имаш профил? Вход</button>
						{#if fail}
                <p class="w-full text-center text-red-400" transition:shake>Паролите не съвпадат!</p>
            {/if}
        </form>
    </section>
    <section class="bg-(--pink) max-md:hidden flex flex-col justify-end items-center p-8">
        <img src="{register_decorations}" alt="" class="absolute top-10 w-160 right-4 h-[90vh] z-0">
        <h1 class="text-oswald-b font-semibold text-3xl">Имаш профил?</h1>
        <button onclick={window.location.href = "/login"} class="text-oswald-b text-2xl z-10">Вход</button>
        <p class="text-oswald-b font-xl text-center mt-60">Побързай,<br> сладките изкушения те очакват...</p>
    </section>
</main>


<style>
    :global(body) {
        background: var(--white);
    }
</style>