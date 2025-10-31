<script lang="ts">
    import { cart } from "$lib/stores";
    import CartInfo from "$lib/components/CartInfo.svelte";
    import logo from "$lib/assets/logo.svg";
		import speedy from "$lib/assets/speedy.svg"
		import econt from "$lib/assets/econt.svg"
    import Product from "$lib/components/Product.svelte";
		import {Toaster, toast} from 'svelte-french-toast';


		async function order() {
        const formData = new FormData();
        let products: Product[] = [];
				const form = document.querySelector('form') as HTMLFormElement;
				const tempFormData = new FormData(form);

        JSON.parse($cart).products.map(p => {products.push({name: p.name, price: p.price, image: p.image, quantity: p.quantity})});

        formData.append('total', JSON.parse($cart).total.toFixed(2));
        formData.append('products', JSON.stringify(products));
				const shipping_type = tempFormData.get('shipping_type') as string;
				formData.append('shipping_type', shipping_type);
				const street = tempFormData.get('street') as string;
				const number = tempFormData.get('number') as string;
				if (street === "" || number === "") {
					toast.error("Моля въведете всички данни", {
						position: "top-right",
						iconTheme: {
							primary: "var(--pink)",
							secondary: "var(--white)",
						}
					})
					return;
				}
				formData.append('address', street + ' ' + number);

				console.log(shipping_type);
				if(data.user)
            formData.append('user', JSON.stringify(data.user));
        else {
					const name = tempFormData.get('name') as string;
					const surname = tempFormData.get('surname') as string;
					const email = tempFormData.get('email') as string;
					const phone = tempFormData.get('phone') as string;
					const city = tempFormData.get('city') as string;
					const zip = tempFormData.get('zip') as string;
					const state = tempFormData.get('state') as string;
					if (name === "" || surname === "" || email === "" || phone === "" || city === "" || zip === "") {
						toast.error("Моля попълнете всички полета", {
							position: "top-right",
							iconTheme: {
								primary: "var(--pink)",
								secondary: "var(--white)",
							}
						})
						return;
					}

					formData.append('guest', JSON.stringify({name, surname, email, phone, city, zip, shipping_type}));
        }

        if(!data.user)
            if(JSON.parse(formData.get("guest") as string).name === "" || JSON.parse(formData.get("guest") as string).surname === "" || JSON.parse(formData.get("guest") as string).email === "" || JSON.parse(formData.get("guest") as string).phone === "" || JSON.parse(formData.get("guest") as string).city === "" || JSON.parse(formData.get("guest") as string).zip === "") {
                return
            }
				const response = await fetch('/cart/order?/order', {method: 'POST', body: formData, headers: {'x-sveltekit-action': true}})

				if(JSON.parse(await response.text()).type !== 'failure'){
					await fetch('/cart?/clear', {headers: {"x-sveltkit-action": true}, method: "POST", body: new FormData()})
					$cart = JSON.stringify({products: [], total: 0});
					window.location.href = '/cart/order/success';
				} else{
					toast.error("Възникна грешка", {
						position: "top-right",
						iconTheme: {
							primary: "var(--pink)",
							secondary: "var(--white)",
						}
					})
				}
    }

    let {data} = $props();

		function getShipping(shipping_type: string) {
			const shipping: number = data.shippingOptions[shipping_type];
			let tempCart = JSON.parse($cart);
			tempCart.total = tempCart.subtotal + shipping;
			tempCart.shipping = shipping;
			$cart = JSON.stringify(tempCart);
		}
		getShipping('speedy');

		let selected = $state('speedy');
		let state = $state(data.user?.state ?? '');
</script>

<Toaster />

<img src="{logo}" alt="logo" class="absolute top-4 left-[50%] translate-x-[-50%] w-32 max-md:w-20">

<main class="w-screen h-[90vh] flex justify-evenly items-center-safe max-lg:flex-col mt-20 max-md:mt-30">
    {#if !data.user}
        <form>
					<section class="text-oswald-b grid grid-cols-2 max-md:mb-0 gap-x-6 gap-y-4">
						<fieldset>
								<label for="name">Име</label>
								<input required type="text" id="name" name="name" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="surname">Фамилия</label>
								<input required type="text" id="surname" name="surname" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="email">Имейл</label>
								<input required type="email" id="email" name="email" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="phone">Телефонен номер</label>
								<input required type="text" id="phone" name="phone" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="city">Град</label>
								<input required type="text" id="city" name="city" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="state">Област</label>
								<input required type="text" id="state" value="Пловдив" disabled name="state" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
					</section>
					<h1 class="bg-(--pink) rounded text-balance text-oswald-b mt-10 text-center text-md">В момента поръчки се доставят само в област Пловдив.</h1>
<!--					<section>-->
<!--						<fieldset class="flex items-center bg-(&#45;&#45;pink) text-oswald-b rounded mt-6 p-2 gap-2 max-md:w-86">-->
<!--							<input onclick={() => getShipping('speedy')} type="radio" checked required id="speedy" class="w-5 h-5 radio" value="speedy" name="shipping_type">-->
<!--							<label for="speedy" class="flex justify-between w-full px-2 items-center"><span><img src={speedy} class="w-8 inline " alt="">Спиди - до автомат</span> <span>{data.shippingOptions.speedy} лв.</span></label>-->
<!--						</fieldset>-->
<!--						<fieldset class="flex items-center bg-(&#45;&#45;pink) text-oswald-b rounded mt-6 p-2 gap-2 max-md:w-86">-->
<!--							<input onclick={() => getShipping('econtBox')} type="radio" required id="econtBox" class="w-5 h-5 radio" value="econtBox" name="shipping_type">-->
<!--							<label for="econtBox" class="flex justify-between w-full px-2 items-center"><span><img src={econt} class="w-16 inline mr-2" alt="">Еконт - до автомат</span> <span>{data.shippingOptions.econtBox} лв.</span></label>-->
<!--						</fieldset>-->
<!--						<fieldset class="flex items-center bg-(&#45;&#45;pink) text-oswald-b rounded mt-6 p-2 gap-2 max-md:w-86">-->
<!--							<input onclick={() => getShipping('econtOffice')} type="radio" required id="econtOffice" class="w-5 h-5 radio" value="econtOffice" name="shipping_type">-->
<!--							<label for="econtOffice" class="flex justify-between w-full px-2 items-center"><span><img src={econt} class="w-16 inline mr-2" alt="">Еконт - до офис</span> <span>{data.shippingOptions.econtOffice} лв.</span></label>-->
<!--						</fieldset>-->
<!--					</section>-->
    </form>
    {:else}
         <form class="mb-10">
					 <section class="text-oswald-b grid grid-cols-2 max-md:mb-0 gap-x-6 gap-y-4">
						<input class="hidden" type="text" value="address" name="shipping_type">
						<fieldset>
								<label for="name">Име</label>
								<input required disabled type="text" value="{data.user.name?? ''}" id="name" name="name" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="surname">Фамилия</label>
								<input required disabled type="text" value="{data.user.surname?? ''}" id="surname" name="surname" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="email">Имейл</label>
								<input required disabled type="email" value="{data.user.email?? ''}" id="email" name="email" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="phone">Телефонен номер</label>
								<input required disabled type="text" value="{data.user.phone?? ''}" id="phone" name="phone" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="city">Град</label>
								<input required disabled type="text" value="{data.user.city?? ''}" id="city" name="city" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						<fieldset>
								<label for="state">Област</label>
								<input oninput="{state = this.value}" required type="text" value="Пловдив" id="state" name="state" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						</fieldset>
						 <fieldset>
							 <label for="city">Улица</label>
							 <input required type="text" id="street" name="street" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						 </fieldset>
						 <fieldset>
							 <label for="city">Номер</label>
							 <input required type="text" id="number" name="number" class="w-48 max-md:w-40 rounded h-8 bg-(--pink) block focus:outline-1 px-2">
						 </fieldset>
					 </section>
					 <!--{#if state.toLowerCase() !== 'plovdiv' && state.toLowerCase() !== 'пловдив'}-->
					 <!--		<section>-->
						<!--	 <fieldset class="flex items-center bg-(&#45;&#45;pink) text-oswald-b rounded mt-6 p-2 gap-2 max-md:w-86">-->
						<!--		 <input onclick={() => {getShipping('speedy'); selected = 'speedy'}} type="radio" checked required id="speedy" class="w-5 h-5 radio" value="speedy" name="shipping_type">-->
						<!--		 <label for="speedy" class="flex justify-between w-full px-2 items-center"><span><img src={speedy} class="w-8 inline " alt="">Спиди - до автомат</span> <span>{data.shippingOptions.speedy} лв.</span></label>-->
						<!--	 </fieldset>-->
						<!-- <div class="flex gap-6 {selected === 'speedy' ? '' : 'hidden'}">-->
						<!--	 <fieldset>-->
						<!--		 <label for="city">Улица</label>-->
						<!--		 <input required type="text" id="street" name="street" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
						<!--	 </fieldset>-->
						<!--	 <fieldset>-->
						<!--		 <label for="city">Номер</label>-->
						<!--		 <input required type="text" id="number" name="number" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
						<!--	 </fieldset>-->
						<!-- </div>-->
						<!-- <fieldset class="flex items-center bg-(&#45;&#45;pink) text-oswald-b rounded mt-6 p-2 gap-2 max-md:w-86">-->
						<!--   <input onclick={() => {getShipping('econtBox'); selected = 'econtBox'}} type="radio" required id="econtBox" class="w-5 h-5 radio" value="econtBox" name="shipping_type">-->
						<!--	 <label for="econtBox" class="flex justify-between w-full px-2 items-center"><span><img src={econt} class="w-16 inline mr-2" alt="">Еконт - до автомат</span> <span>{data.shippingOptions.econtBox} лв.</span></label>-->
						<!-- </fieldset>-->
						<!-- <div class="flex gap-6 {selected === 'econtBox' ? '' : 'hidden'}">-->
						<!--	 <fieldset>-->
						<!--		 <label for="city">Улица</label>-->
						<!--		 <input required type="text" id="street" name="street" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
						<!--	 </fieldset>-->
						<!--	 <fieldset>-->
						<!--		 <label for="city">Номер</label>-->
						<!--		 <input required type="text" id="number" name="number" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
						<!--	 </fieldset>-->
						<!-- </div>-->
						<!-- <fieldset class="flex items-center bg-(&#45;&#45;pink) text-oswald-b rounded mt-6 p-2 gap-2 max-md:w-86">-->
						<!--	 <input onclick={() => {getShipping('econtOffice'); selected = 'econtOffice'}} type="radio" required id="econtOffice" class="w-5 h-5 radio" value="econtOffice" name="shipping_type">-->
						<!--	 <label for="econtOffice" class="flex justify-between w-full px-2 items-center"><span><img src={econt} class="w-16 inline mr-2" alt="">Еконт - до офис</span> <span>{data.shippingOptions.econtOffice} лв.</span></label>-->
						<!-- </fieldset>-->
						<!-- <div class="flex gap-6 {selected === 'econtOffice' ? '' : 'hidden'}">-->
						<!--	 <fieldset>-->
						<!--		 <label for="city">Улица</label>-->
						<!--		 <input required type="text" id="street" name="street" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
						<!--	 </fieldset>-->
						<!--	 <fieldset>-->
						<!--		 <label for="city">Номер</label>-->
						<!--		 <input required type="text" id="number" name="number" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
						<!--	 </fieldset>-->
						<!-- </div>-->
					 <!--</section>-->
						<!-- {:else}-->
<!--						 <div class="flex gap-6 mt-4 {selected === 'speedy' ? '' : 'hidden'}">-->
<!--							 <input type="hidden" name="shipping_type" value="address">-->
<!--							 <fieldset>-->
<!--								 <label for="city">Улица</label>-->
<!--								 <input required type="text" id="street" name="street" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2">-->
<!--							 </fieldset>-->
<!--							 <fieldset>-->
<!--								 <label for="city">Номер</label>-->
<!--								 <input required type="text" inputmode="numeric" id="number" name="number" class="w-48 max-md:w-40 rounded h-8 bg-(&#45;&#45;pink) block focus:outline-1 px-2 ">-->
<!--							 </fieldset>-->
<!--						 </div>-->
					 <!--{/if}-->
    </form>
    {/if}
		{#key $cart}
    	<CartInfo cart={JSON.parse($cart)} text="Поръчка" onclick={order}/>
		{/key}
		</main>


<style>
    @media (min-width: 48rem) {
        :global(body) {
            background: radial-gradient(50% 50% at 50% 50%, var(--pink) 0%, var(--white) 100%) no-repeat;
            background-size: 100% 110%;
        }
    }
    @media (max-width: 48rem) {
        :global(body) {
            background: var(--white);
        }
    }
</style>