<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    import { enhance } from "$app/forms"
    import type {RecordModel} from "pocketbase";
    import {invalidateAll} from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
		import { browser } from '$app/environment';

    let { data } = $props()

    function logout() {
        fetch('/login?/logout', {
            method: 'POST',
            headers: {
            'x-sveltekit-action': true},
            body: new FormData()
        }).then(() => {window.location.href = '/'})
    }

    function getEuro(price: number) {
        if (price)
            return (price / 1.95583).toFixed(2);
        return '0';
    }

    let page = $state('profile')

    let user = $state(data.user)

    function reset(){
        user = {} as RecordModel
    }
    async function changeUser(){
        const form = document.querySelector('form') as HTMLFormElement;
        const formData = new FormData(form);
        await fetch('/login?/changeUser', {
            method: 'POST',
            body: formData,
            headers: {
                'x-sveltekit-action': true
            }
        }).then(() => {
            invalidateAll()
            user = data.user
       })
        invalidateAll().then(() =>
            user = data.user
        )
    }

    function upload(){
        const avatar = document.querySelector('#avatar') as HTMLInputElement
        avatar.click()
    }


    if(browser){
        document.body.style.background = 'var(--pink)'
    }
</script>
<Navbar data={data} />
<main class="flex w-screen h-[80vh] lg:mt-20 max-lg:mt-10 max-lg:flex-col max-md:gap-6 justify-start items-center lg:justify-center lg:items-start gap-10 bg-(--pink)">
    <article class="w-64 sticky max-md:w-80 max-lg:w-160 h-86 max-lg:h-14 rounded-xl lg:gap-6 md:gap-8 bg-(--white) flex flex-col max-lg:flex-row justify-center max-lg:items-center items-start p-4 text-oswald-b max-md:text-sm max-md:gap-2 text-2xl">
        <button onclick={() => page = 'profile'}>Профил</button>
        <div class="w-54 max-lg:w-0 h-0.5 bg-gray-400 rounded-full"></div>
        <button onclick={() => page = 'orders'} >Поръчки</button>
        <div class="w-54 max-lg:w-0 h-0.5 bg-gray-400 rounded-full"></div>
        <button onclick={() => page = 'review'}>Ревю</button>
        <div class="w-54 max-lg:w-0 h-0.5 bg-gray-400 rounded-full"></div>
        <button onclick={logout}>Изход</button>
    </article>
    {#if page === 'profile'}
        <article class="flex flex-col gap-4">
            <section class="w-160 max-md:w-80 h-86 max-md:h-140 bg-(--white) rounded-xl flex flex-col items-center justify-evenly">
                <h1 class="text-oswald-b text-xl text-left w-full pl-8">Лични данни</h1>
                {#if !user?.name}
                    <form onsubmit={changeUser} id="changeUser" class="grid grid-cols-2 gap-y-4 max-md:grid-cols-1 w-full justify-items-center items-center">
                        <fieldset>
                            <label for="name" class="block text-oswald-b font-normal">Име</label>
                            <input name="name" id="name" required class="w-64 h-8 font-light border-b-gray-500 border-1 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="surname" class="block text-oswald-b font-normal">Фамилия</label>
                            <input name="surname" id="surname" required class="w-64 h-8 font-light border-b-gray-500 border-1 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="phone" class="block text-oswald-b font-normal">Телефон</label>
                            <input name="phone" required id="phone" class="w-64 h-8 font-light border-b-gray-500 border-1 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="email" class="block text-oswald-b font-normal">Имейл</label>
                            <input name="email" disabled value="{data.user?.email}" id="email" type="email" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="city" class="block text-oswald-b font-normal">Град</label>
                            <input name="city" required id="city" type="text" class="w-64 h-8 font-light border-b-gray-500 border-1 rounded text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="state" class="block text-oswald-b font-normal">Област</label>
                            <input name="state" required id="state" type="text" class="w-64 h-8 font-light border-b-gray-500 border-1 rounded text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                    </form>
                    <BuyButton form="changeUser" type="submit" tailwindClass="w-48 mt-4">Запази</BuyButton>
                {:else}
                    <form action="login?/changeUser" use:enhance id="changeUser" method="POST" class="grid grid-cols-2 gap-y-4 max-md:grid-cols-1 w-full justify-items-center items-center">
                        <fieldset>
                            <label for="name" class="block text-oswald-b font-normal">Име</label>
                            <input disabled value="{user.name}" name="name" id="name" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded px-0 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="surname" class="block text-oswald-b font-normal">Фамилия</label>
                            <input disabled value={user.surname} name="surname" id="surname" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded px-0 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="phone" class="block text-oswald-b font-normal">Телефон</label>
                            <input disabled value={user.phone} name="phone" id="phone" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded px-0 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="email" class="block text-oswald-b font-normal">Имейл</label>
                            <input disabled value={user.email} name="email" id="email" type="email" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded px-0 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="city" class="block text-oswald-b font-normal">Град</label>
                            <input name="city" disabled value="{data.user?.city}" id="city" type="text" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                        <fieldset>
                            <label for="state" class="block text-oswald-b font-normal">Област</label>
                            <input name="state" disabled value="{data.user?.state}" id="state" type="text" class="w-64 h-8 font-light border-b-gray-500 border-0 rounded text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                        </fieldset>
                    </form>
                    <BuyButton tailwindClass="w-48 mt-4" onclick={reset}>Редактирай</BuyButton>
                {/if}
            </section>
        </article>
    {:else if page === 'orders'}
        <section class="grid grid-cols-1 content-center gap-y-6 pb-6 bg-(--pink)">
        {#if !data.orders}
            <section class="w-160 h-86 max-md:w-80 bg-(--white) rounded-xl flex flex-col items-center justify-evenly">
                <h1 class="text-oswald-b text-2xl">Нямате поръчки</h1>
            </section>
        {/if}
        {#each data.orders as order (order.id)}
            <section class="w-160 max-md:w-80 h-100 bg-(--white) rounded-xl flex flex-col items-center justify-between p-4">
                <h1 class="text-oswald-b text-2xl text-left w-full">Номер на поръчка: №{order.count}</h1>
                <section class="flex flex-col items-baseline justify-evenly p-4 w-full gap-2 overflow-auto ">
                    <div class="w-full h-0.5 rounded-full bg-(--pink)">&nbsp</div>
                    {#each order.products as product}
                        <article class='flex justify-evenly w-full gap-2 items-center'>
                            <section class="w-28 h-26 border-2 rounded-xl max-md:hidden border-(--pink) bg-(--pink) flex items-center justify-center ">
                                <img src={product.image} alt={product.name} class="w-30 rounded-xl">
                            </section>
                            <p class="text-oswald text-balance max-w-48 w-40 max-md:text-xs" style="color: var(--black)">{product.name}</p>
                            <h3 class="text-sm font-bold bg-(--pink) rounded-md p-2 h-7 flex items-center md:before:content-['Количество:_']">{product.quantity}x</h3>
                            <div class="min-w-14">
                                <p class="text-sm max-md:text-xs max-md:px-4 flex justify-center items-center bg-(--pink) px-2 text-nowrap rounded-md text-oswald h-7 font-semibold" style="color: var(--black)">
                                    {product.price * product.quantity} лв / {getEuro(product.price * product.quantity)} €
                                </p>
                            </div>
                        </article>
                        <div class="w-full h-0.5 rounded-full bg-(--pink)">&nbsp</div>
                    {/each}
                </section>
                <ul class="text-oswald-b min-w-48 w-48">
                    <li class="flex items-center justify-between">Обща цена: <span>{order.total}лв. / {getEuro(order.total)} €</span></li>
                    <li class="flex items-center justify-between">Доставка: <span>{order.shipping} / {getEuro(order.shipping)} €</span></li>
                    <li class="text-center bg-(--pink) rounded mt-2">{order.shipped ? "Поръчката е изпратена" : "Поръчката се обработва"}</li>
                </ul>
            </section>
        {/each}
        </section>
    {:else if page === 'review'}
        <section class="w-180 h-86 bg-(--white) rounded-xl flex flex-col items-center justify-evenly">
            <form action="?/addReview" method="POST" enctype="multipart/form-data" class="flex flex-col items-center justify-evenly">
                <input value="{data.user.name}" name="name" class="hidden">
                <section class="grid grid-cols-2 gap-x-4 mb-4 max-md:grid-cols-1 w-full justify-items-center items-center">
                    <fieldset>
                        <label for="occupation" class="block text-oswald-b font-normal">Професия</label>
                        <input name="occupation" id="occupation" required class="w-64 h-8 font-light border-b-gray-500 border-1 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
                    </fieldset>
                    <fieldset>
                        <label for="avatar" class="block text-oswald-b font-normal">Снимка</label>
                        <button type="button" id="upload" onclick={upload} class="w-64 h-8 font-light border-b-gray-500 border-1 rounded px-2 text-oswald-b opacity-55 focus:outline-1 focus:border-0 outline-(--pink)">Избери файл</button>
                        <input name="avatar" accept="image/png, image/jpeg, image/webp" type="file" id="avatar" class="hidden" onchange={() => document.getElementById('upload').innerText = document.getElementById('avatar').value} />
                    </fieldset>
                </section>
                <fieldset>
                    <label for="review" class="block text-oswald-b font-normal">Ревю</label>
                    <textarea id="review" name="review" maxlength="400" required class="w-132 h-32 mb-4 font-light border-b-gray-500 border-1 rounded p-2 text-oswald-b resize-none focus:outline-1 focus:border-0 outline-(--pink)"></textarea>
                </fieldset>
                <BuyButton>Публикувай</BuyButton>
            </form>
        </section>
    {/if}
</main>


<style>
    :global(body) {
        background-color: var(--pink);
        background-size: 100% 100%;
    }
</style>