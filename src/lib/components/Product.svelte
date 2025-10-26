<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    import arrow from "$lib/assets/arrow.svg";
    import { Cart } from '../../cart'
    import {cart} from "$lib/stores";

    let {product, box}: {product: Product, box?: boolean} = $props();

    const tempCart = new Cart(JSON.parse($cart) ?? {});

    async function buy(product: Product) {
        tempCart.add(product);
        $cart = JSON.stringify(tempCart)
    }

    function getEuro(price: number) {
        return (price / 1.95583).toFixed(2);
    }

    let showIngredients = $state(false);
</script>
<main class="bg-(--pink) h-screen w-screen flex justify-center items-center gap-10 {showIngredients? 'sm:mt-[-3rem]':'sm:mt-[-5rem]'} max-lg:flex-col">
    <img src="{product.image}" alt="product" class="w-130 {showIngredients? 'sm:mt-[-4rem]':''}">
    <section class="flex flex-col items-center gap-2">
        <article class="bg-(--white) w-90 h-80 rounded-2xl flex flex-col items-center justify-center gap-6">
            <h1 class="text-oswald paragraph text-balance max-w-64 text-center font-normal" style="color: var(--black)">{product.name}</h1>
            <p class="text-oswald font-normal text-sm max-w-80 {box? '' : 'text-center'} text-balance" style="color: var(--black)">{@html product.description}</p>
            <p class="text-oswald font-light mb-[-1rem]" style="color: var(--black)">Цена: {product.price} лв. / {getEuro(product.price)} €</p>
            <BuyButton onclick={() => {buy(product); window.location.href = '/products?success=true'}}>Купи</BuyButton>
        </article>
        {#if !box}
            {#if !showIngredients}
                <ul class="flex justify-evenly w-90 gap-4 text-oswald font-light max-md:mb-10" style="color: var(--black);">
                    <li class="bg-(--white) w-32 py-1 rounded-xl flex items-center justify-center">{product.kcal} ккал.</li>
                    <li class="bg-(--white) w-32 py-1 rounded-xl flex items-center justify-center">{product.mass} г.</li>
                    <li class="bg-(--white) w-32  rounded-xl flex items-center justify-center"><button onclick={() => showIngredients = true} class="flex items-center justify-between">Състав <img src={arrow} alt="more" class="w-3 mt-1.5 ml-1"></button></li>
                </ul>
                {:else}
                <section class="w-90 bg-(--white) text-oswald rounded-2xl p-2 font-light text-xs text-center max-md:mb-10" style="color: var(--black)">
                    {product.ingridients}
                    <button class="block w-90 text-lg" onclick={() => showIngredients = false}>x</button>
                </section>
            {/if}
        {/if}
    </section>
</main>