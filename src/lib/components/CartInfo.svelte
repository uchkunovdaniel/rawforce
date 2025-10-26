<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    import { Cart } from '../../cart';

    let { cart, onclick, text }: {cart: Cart, onclick?: () => void, text?: string} = $props();

    function getEuro(price: number) {
        if (price)
            return (price / 1.95583).toFixed(2);
        return '0';
    }
    if(!cart){
        cart = new Cart({});
    }
</script>

<article class="bg-(--pink) w-99 max-md:w-86 max-md:h-96 max-md:mt-6 h-108 rounded-2xl font-medium p-4 flex flex-col items-center gap-4 shadow-xl">
    <h1 class="text-oswald text-3xl">Поръчка</h1>
    <form class="flex justify-between items-center gap-4 mt-4">
        <input placeholder="Код за отстъпка" type="text" class="w-52 h-9 rounded-2xl bg-(--white) px-2 placeholder-(--pink) text-oswald-lp font-light focus:outline-2 outline-(--black)">
        <button class="w-28 h-9 rounded-2xl bg-(--white) text-oswald-lp flex justify-center items-center font-light focus:border-(--black) focus:border-2" style="outline: none">Приложи</button>
    </form>
    <ul>
        <li class="text-oswald paragraph font-normal flex justify-between w-80">
            <div>Продукти</div>
            <div>{cart.subtotal? cart.subtotal.toFixed(2): 0} лв. / {getEuro(cart.subtotal)} €</div>
        </li>
        {#if cart.shipping}
            <li class="text-oswald paragraph font-normal flex justify-between w-80">
                <div>Доставка</div>
                <div>{cart.shipping? cart.shipping.toFixed(2) : '0'} лв. / {getEuro(cart.shipping)} €</div>
            </li>
        {/if}
        <li class="text-oswald paragraph font-normal flex justify-between w-80">
            <div>Отстъпка</div>
            <div>{cart.discount? cart.discount.toFixed(2) : '0'} лв. / {cart.discount? getEuro(cart.discount) : '0'} € </div>
        </li>
    </ul>
    <div class="w-80 h-1 bg-(--white) opacity-60 rounded-2xl mt-4"></div>
    <div class="text-oswald paragraph flex w-80 justify-between mb-4">
        <span>Общо:</span>
        <span>{cart.total? cart.total.toFixed(2) : 0} лв. / {getEuro(cart.total)} €</span>
    </div>
    {#if onclick}
        <BuyButton type="submit" tailwindClass="pb-2" disabled={!cart.total} onclick={() => {if(cart.total > 0) {onclick()}}}>{text ?? "Към разплащане"}</BuyButton>
    {:else}
        <BuyButton type="submit" tailwindClass="pb-2" disabled={!cart.total} onclick={() => {if(cart.total > 0) {window.location.href = '/cart/order'}}}>{text ?? "Към разплащане"}</BuyButton>
    {/if}
		<div class="h-10 w-screen lg:hidden">&nbsp;</div>
    </article>