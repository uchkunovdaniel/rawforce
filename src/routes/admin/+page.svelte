<script lang="ts">
  	import logo from "$lib/assets/logo.svg"
		import BuyButton from '$lib/components/BuyButton.svelte';
		import { invalidateAll } from '$app/navigation';
		import toast, { Toaster } from 'svelte-french-toast';
		import ProductCard from '$lib/components/ProductCard.svelte';
		import {enhance} from '$app/forms';
		import ConfirmDelete from '$lib/components/ConfirmDelete.svelte';

		let confirmDelete = $state(false);

			function logout() {
        fetch('/login?/logout', {
            method: 'POST',
            headers: {
            'x-sveltekit-action': true},
            body: new FormData()
        }).then(() => {window.location.href = '/'})
    }

		let page: string = $state("orders")

		let {data} = $props()

		let tempProduct: Product = $state()

		function upload(){
			const avatar = document.querySelector('#avatar') as HTMLInputElement
			avatar.click()
		}

		function display(){
			const button = document.querySelector('#upload') as HTMLButtonElement
			const input = document.querySelector('#avatar') as HTMLInputElement

			const image = document.createElement('img')
			image.src = URL.createObjectURL((input.files ?? [])[0])
			button.innerHTML = ""
			button.appendChild(image)
		}

		function approve(id: string){
			const formData = new FormData()
			formData.append('orderId', id)
			fetch('?/approve', {
				method: 'POST',
				headers: {
					'x-sveltekit-action': true,
				},
				body: formData
			}).then(() => {
				page = "orders"
				invalidateAll();
				toast.success("Поръчката е потвърдена", {
					position: "top-center",
					iconTheme: {
						primary: "var(--pink)",
						secondary: "var(--white)"
					}
				})
			})
		}

		function cancel(id: string){
			const formData = new FormData()
			formData.append('orderId', id)
			fetch('?/cancel', {
				method: 'POST',
				headers: {
					'x-sveltekit-action': true,
				},
				body: formData
			}).then(() => {
				page = "orders"
				invalidateAll();
				toast.error("Поръчката беше премахната", {
					position: "top-center",
					iconTheme: {
						primary: "var(--pink)",
						secondary: "var(--white)"
					}
				})
			})
		}
</script>

<Toaster />

<nav class="p-6 flex justify-between gap-10 max-md:flex-col max-md:gap-8 max-lg:gap-2">
	<img src={logo} alt="logo" class="w-20 max-md:m-auto">
	<ul class="flex items-center justify-evenly flex-wrap gap-20 max-lg:gap-4">
		<li><button onclick={() => page = "orders"}        class="bg-(--white) max-md:text-sm max-md:min-w-36 px-3 min-h-12 rounded-xl max-lg:min-w-20 min-w-40 text-oswald-b max-lg:text-md text-xl {page === 'orders'? 'selected' : ''}">Всички Поръчки</button></li>
		<li><button onclick={() => page = "addProduct"}    class="bg-(--white) max-md:text-sm max-md:min-w-36 px-3 min-h-12 rounded-xl max-lg:min-w-20 min-w-40 text-oswald-b max-lg:text-md text-xl {page === 'addProduct'? 'selected' : ''}">Добави продукт</button></li>
		<li><button onclick={() => page = "editProducts"}   class="bg-(--white) max-md:text-sm max-md:min-w-36 px-3 min-h-12 rounded-xl max-lg:min-w-20 min-w-40 text-oswald-b max-lg:text-md text-xl {page === 'editProducts'? 'selected' : ''}">Редактирай продукт</button></li>
		<li><button onclick={() => page = "removeProducts"} class="bg-(--white) max-md:text-sm max-md:min-w-36 px-3 min-h-12 rounded-xl max-lg:min-w-20 min-w-40 text-oswald-b max-lg:text-md text-xl {page === 'removeProduct'? 'selected' : ''}">Изтрий продукт</button></li>
	</ul>
	<button onclick={logout} class="bg-(--white) rounded-xl p-4 text-oswald-b font-light">Изход</button>
</nav>

<main class="flex items-start justify-center w-screen h-screen {data.allOrders ? 'max-md:mt-16 md:mt-64 lg:mt-32' : ''}">
	{#if page === "orders"}
			<article class="grid grid-cols-1 content-center gap-y-6 pb-6 bg-(--pink)">
        {#if !data.allOrders}
            <section class="w-160 h-86 max-md:w-80 bg-(--white) rounded-xl flex flex-col items-center justify-evenly">
                <h1 class="text-oswald-b text-2xl">Нямате поръчки</h1>
            </section>
        {/if}
        {#each data.allOrders as order}
					<section class="w-[70vw] max-md:w-80 h-max bg-(--white) rounded-xl flex items-center justify-evenly p-4">
                <h1 class="text-oswald-b text-xl text-left md:min-w-20 max-md:text-sm">№ {order.count}</h1>
                <section class="flex flex-col items-baseline justify-evenly p-4 w-full gap-2 overflow-auto ">
                    {#each order.products as product}
                        <article class='flex justify-evenly w-full gap-2 items-center'>
                            <p class="text-oswald text-left max-md:min-w-38 text-balance min-w-70 max-md:text-xs" style="color: var(--black)">{product.name}</p>
                            <h3 class="text-sm font-bold bg-(--pink) rounded-md p-2 h-7 flex items-center lg:before:content-['Количество:_']">{product.quantity}x</h3>
												</article>
                    {/each}
                </section>
							<button class="text-oswald-b text-xl lg:min-w-32 max-md:text-sm" onclick={() => {page = order.id; window.scrollTo(0, 0)}}>Още опции</button>
						</section>
				{/each}
			</article>
		{:else if data.allIds?.includes(page)}
			{#each data.allOrders?.filter(order => order.id === page) as order}
				<article class="flex flex-col gap-10 items-center justify-evenly">
					<section class="w-[80vw] max-md:w-80 h-max bg-(--white) rounded-xl flex items-center justify-evenly p-4">
                <h1 class="text-oswald-b text-2xl max-md:text-xs max-lg:text-xl text-left lg:min-w-32">№ {order.count}</h1>
                <section class="flex flex-col items-baseline justify-evenly p-4 w-full gap-2 overflow-auto ">
                    {#each order.products as product}
                        <article class='flex justify-evenly w-full gap-2 items-center'>
                            <p class="text-oswald text-left max-md:min-w-32 text-2xl max-lg:text-xl text-balance md:min-w-90 lg:min-w-100 max-md:text-xs" style="color: var(--black)">{product.name}</p>
                            <h3 class="text-xl max-md:text-sm font-bold bg-(--pink) rounded-md p-2 h-7 flex items-center lg:before:content-['Количество:_']">{product.quantity}x</h3>
												</article>
                    {/each}
                </section>
								<button class="text-oswald-b text-2xl max-md:text-sm text-left pr-10" onclick={() => page = 'orders'}>Назад</button>
					</section>
					<section class="w-[80vw] bg-(--white) rounded-xl h-40 flex items-center justify-evenly flex-wrap">
						<p class="text-2xl max-lg:text-xl max-md:text-sm text-oswald-b">{order.expand.user? order.expand.user.name : order.guest.name} {order.expand.user? order.expand.user.surname : order.guest.surname}</p>
						<p class="text-2xl max-lg:text-xl max-md:text-sm text-oswald-b">гр. {order.expand.user? order.expand.user.city : order.guest.city}</p>
						<p class="text-2xl max-lg:text-xl max-md:text-sm text-oswald-b">обл. {order.expand.user? order.expand.user.state : order.guest.state}</p>
						<p class="text-2xl max-lg:text-xl max-md:text-sm text-oswald-b">тел. {order.expand.user? order.expand.user.phone : order.guest.phone}</p>
					</section>
					{#if !order.shipped}
						<section class="flex w-full items-center justify-evenly">
							<BuyButton onclick={() => cancel(order.id)} tailwindClass="bg-(--white) text-oswald-b max-md:text-sm max-md:w-42">Отказване на поръчката</BuyButton>
							<BuyButton onclick={() => approve(order.id)} tailwindClass="max-md:text-sm max-md:w-32">Потвърждаване изпращането</BuyButton>
						</section>
						{:else}
						<p class="text-oswald-b bg-(--white) p-4 rounded-xl">Поръчката е потвърдена</p>
					{/if}
				</article>
			{/each}
	{:else if page === 'addProduct'}
		<form enctype="multipart/form-data" onsubmit={() => {toast.success("Продуктът е добавен", {iconTheme: {primary: "var(--pink)", secondary: "var(--white)"}})}} action="?/addProduct" method="post" class="flex items-center justify-start gap-10">
			<fieldset>
				<button type="button" id="upload" onclick={upload} class="max-lg:w-64 max-lg:h-64 w-120 h-120 text-2xl font-light border-0 rounded-xl px-2 text-oswald-b bg-(--white) focus:outline-1 focus:border-0 outline-(--pink) flex flex-col justify-center items-center"><span class="text-[10rem]">+</span><span>Избери файл</span></button>
				<input name="image" accept="image/png, image/jpeg, image/webp" type="file" id="avatar" class="hidden" onchange={display}/>
			</fieldset>
			<section class="flex flex-col gap-2 items-center justify-evenly">
				<fieldset>
					<label for="name" class="text-oswald-b block font-normal">Име на продукта</label>
					<input name="name" id="name" required class="w-64 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
				</fieldset>
				<fieldset>
					<label for="description" class="text-oswald-b block font-normal">Описание на продукта</label>
					<textarea name="description" id="description" required class="w-64 h-26 font-light bg-(--white) resize-none border-b-gray-500 border-0 rounded p-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)"></textarea>
				</fieldset>
				<fieldset>
					<label for="price" class="text-oswald-b block font-normal">Цена на продукта</label>
					<input name="price" id="price" type="number" min="0" required class="w-64 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
				</fieldset>
				<fieldset>
					<label for="ingridients" class="text-oswald-b block font-normal">Състав на продукта</label>
					<textarea name="ingridients" id="ingridients" required class="w-64 h-16 resize-none font-light bg-(--white) border-b-gray-500 border-0 rounded p-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)"></textarea>
				</fieldset>
				<section class="flex gap-2 items-center justify-evenly">
					<fieldset>
						<label for="kcal" class="text-oswald-b block font-normal">Калории</label>
						<input name="kcal" id="kcal" min="0" type="number" required class="w-31 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
					</fieldset>
					<fieldset>
						<label for="mass" class="text-oswald-b block font-normal">Грамаж</label>
						<input name="mass" id="mass" min="0" type="number" required class="w-31 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
					</fieldset>
				</section>
				<input class="hidden" name="quantity" value="1">
				<BuyButton>Запази</BuyButton>
			</section>
		</form>
		{:else if page === "editProducts"}
		<main class="w-screen h-max flex justify-center p-10 items-baseline pt-32">
			<section class="grid lg:grid-cols-2 max-md:grid-cols-1 md:grid-cols-2 content-center gap-x-6 gap-y-16">
				{#each data.products as product (product.id)}
					<ProductCard product={product} onclick={() => {page = "editProduct"; tempProduct=product}} text="Редактирай" />
				{/each}
				<article class="bg-pink-50 min-lg:col-span-3 h-64 md:col-span-2 rounded-xl flex max-md:flex-col max-md:max-w-64 items-center justify-around p-10">
					<!--        <img src={cookies} alt="cookies" class="w-96 md:w-72"/>-->
					<section class="flex flex-col items-center justify-center gap-4 z-50">
						<h3 class="text-oswald paragraph" style="color: var(--black)">Кутия с 6 вкуса барчета</h3>
						<BuyButton onclick={() => {console.log('ok')}}>Купи</BuyButton>
					</section>
				</article>
			</section>
		</main>
		{:else if page === "editProduct"}
		<form enctype="multipart/form-data" use:enhance onsubmit={() => {toast.success("Продуктът е редактиран", {iconTheme: {primary: "var(--pink)", secondary: "var(--white)"}}); page="orders"}} action="?/editProduct" method="post" class="flex items-center justify-start gap-10">
			<input class="hidden" name="id" value={tempProduct.id}/>
			<fieldset>
				<button type="button" id="upload" onclick={upload} class="max-lg:w-64 max-lg:h-64 w-120 h-120 text-2xl font-light border-0 rounded-xl px-2 text-oswald-b bg-(--white) focus:outline-1 focus:border-0 outline-(--pink) flex flex-col justify-center items-center"><img src={tempProduct.image} alt=""></button>
				<input name="image" accept="image/png, image/jpeg, image/webp" type="file" id="avatar" class="hidden" onchange={display}/>
			</fieldset>
			<section class="flex flex-col gap-2 items-center justify-evenly">
				<fieldset>
					<label for="name" class="text-oswald-b block font-normal">Име на продукта</label>
					<input name="name" id="name" value={tempProduct.name} required class="w-64 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
				</fieldset>
				<fieldset>
					<label for="description" class="text-oswald-b block font-normal">Описание на продукта</label>
					<textarea name="description" value={tempProduct.description} id="description" required class="w-64 h-26 font-light bg-(--white) resize-none border-b-gray-500 border-0 rounded p-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)"></textarea>
				</fieldset>
				<fieldset>
					<label for="price" class="text-oswald-b block font-normal">Цена на продукта</label>
					<input name="price" id="price" value={tempProduct.price} type="number" min="0" required class="w-64 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
				</fieldset>
				<fieldset>
					<label for="ingridients" class="text-oswald-b block font-normal">Състав на продукта</label>
					<textarea name="ingridients" id="ingridients" value={tempProduct.ingridients} required class="w-64 h-16 resize-none font-light bg-(--white) border-b-gray-500 border-0 rounded p-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)"></textarea>
				</fieldset>
				<section class="flex gap-2 items-center justify-evenly">
					<fieldset>
						<label for="kcal" class="text-oswald-b block font-normal">Калории</label>
						<input name="kcal" id="kcal" min="0" type="number" value={tempProduct.kcal} required class="w-31 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
					</fieldset>
					<fieldset>
						<label for="mass" class="text-oswald-b block font-normal">Грамаж</label>
						<input name="mass" id="mass" min="0" type="number" value={tempProduct.mass} required class="w-31 h-8 font-light bg-(--white) border-b-gray-500 border-0 rounded px-2 text-oswald-b focus:outline-1 focus:border-0 outline-(--pink)">
					</fieldset>
				</section>
				<input class="hidden" name="quantity" value="1">
				<BuyButton>Запази</BuyButton>
			</section>
		</form>
		{:else if page === "removeProducts"}
		<main class="w-screen h-max flex justify-center p-10 items-baseline pt-32">
			<section class="grid lg:grid-cols-2 max-md:grid-cols-1 md:grid-cols-2 content-center gap-x-6 gap-y-16">
				{#each data.products as product (product.id)}
					<ProductCard product={product} onclick={() => confirmDelete = true} text="Премахни" />
				{/each}
				{#if confirmDelete}
					<ConfirmDelete onclickCancel={() => confirmDelete = false} onclickConfirm={() =>{confirmDelete = false}} />
				{/if}
				<article class="bg-pink-50 min-lg:col-span-3 h-64 md:col-span-2 rounded-xl flex max-md:flex-col max-md:max-w-64 items-center justify-around p-10">
					<!--        <img src={cookies} alt="cookies" class="w-96 md:w-72"/>-->
					<section class="flex flex-col items-center justify-center gap-4 z-50">
						<h3 class="text-oswald paragraph" style="color: var(--black)">Кутия с 6 вкуса барчета</h3>
						<BuyButton onclick={() => {console.log('ok')}}>Купи</BuyButton>
					</section>
				</article>
			</section>
		</main>
	{/if}
</main>
