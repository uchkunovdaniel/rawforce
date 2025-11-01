<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    import PasswordInput from "$lib/components/PasswordInput.svelte";

    let { onclick, superuser }: { onclick?: () => void, superuser?: boolean } = $props();

    let fail = $state(false)

    function shake() {
        return {
            duration: 80,
            css: (t: number) => `transform: translateX(${t * 10}px)`
        }
    }

    async function login() {
        const form = document.querySelector('form') as HTMLFormElement;
        const data = new FormData(form);
        const response = await fetch('/login?/login', {
            method: 'POST',
            body: data,
            headers: {
                'x-sveltekit-action': true
            }
        })
        fail = JSON.parse(await response.text()).type === 'failure';
				if(!fail) window.location.href = '/profile'
    }

		async function superuserLogin(){
			const form = document.querySelector('form') as HTMLFormElement;
			const data = new FormData(form);
			const response = await fetch('/login?/superuserLogin', {
				method: 'POST',
				body: data,
				headers: {
					'x-sveltekit-action': true
				}
			})
			fail = JSON.parse(await response.text()).type === 'failure';
			if(!fail) window.location.href = '/admin'
		}
</script>

<article class="w-80 {superuser? 'h-90' : 'h-80'} bg-(--white) {superuser? '' : 'absolute max-md:right-8 min-md:right-30 top-24'} z-50 rounded-xl shadow-xl">
	{#if !superuser}
		<button class="text-oswald-b absolute top-1 right-3 font-light" { onclick }>x</button>
	{/if}
    <h1 class="text-oswald-lp text-4xl text-center mt-4">Вход</h1>
		<h2 class="text-oswald-b text-center mt-4 text-2xl {superuser? '' : 'hidden'}">Администраторски портал</h2>
    <form onsubmit="{superuser? superuserLogin : login}" class="flex flex-col items-center gap-4 mt-6 justify-center">
        <fieldset>
            <label for="email" class="text-oswald-b font-normal">Имейл адрес</label>
            <input name="email" type="email" id="email" class="w-64 h-6 bg-(--pink) block text-oswald-b focus:outline-1 px-2 rounded" required>
        </fieldset>
        <fieldset>
            <label for="password" class="text-oswald-b font-normal">Парола</label>
            <PasswordInput id="password" height="6" />
        </fieldset>
        <BuyButton tailwindClass="mt-2 w-64">Вход</BuyButton>
    </form>
    <section class="flex justify-end w-64 mx-auto text-oswald-b font-light text-sm mt-2 {superuser? 'hidden' : ''}">
			<button onclick={() => window.location.href = '/register'}>Създай профил</button>
		</section>
    {#if fail}
        <p class="w-full text-center text-oswald-r text-red-500 font-light text-sm mt-1" transition:shake>Грешен имейл или парола</p>
    {/if}
</article>


{#if superuser}
	<style>
		:global(body){
			background: linear-gradient(var(--pink) 30%, var(--blue) 90%);
		}
	</style>
{/if}
