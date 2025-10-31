<script lang="ts">
    import CartInfo from "$lib/components/CartInfo.svelte";
    import bin from "$lib/assets/bin.svg";
    import { Cart } from "../../cart";
    import {cart} from "$lib/stores";

    let tempCart: Cart = new Cart(JSON.parse($cart) ?? "");

    function increment(product: Product) {
        tempCart.add(product)
        $cart = JSON.stringify(tempCart)
    }
    function decrement(product: Product) {
         if (product.quantity === 1) return;
         tempCart.decrement(product);
         $cart = JSON.stringify(tempCart)
    }
    function remove(product: Product) {
        tempCart.remove(product);
        $cart = JSON.stringify(tempCart)
        if (JSON.parse($cart).products.length === 0) {
            tempCart.clear();
            $cart = JSON.stringify(tempCart)
        }
    }

</script>

<main class="w-screen radial-gradient h-screen flex justify-center max-lg:justify-end-safe items-center-safe gap-20 pt-20 p-10 max-lg:flex-col max-lg:mt-0 max-lg:mb-0">
    <section class="w-160 max-md:w-full flex flex-col gap-4">
        {#if $cart && JSON.parse($cart).products && JSON.parse($cart).products.length > 0}
            <div class="text-oswald-p flex justify-between w-full max-md:w-[calc(100vw-5rem)]">
                <span>Продукти</span>
                <span>Цена</span>
            </div>
            {#each JSON.parse($cart).products as product (product.name)}
                 <section class="flex flex-col gap-4 overflow-hidden">
                        <div class="w-screen h-1 bg-(--pink) rounded-xl max-md:w-[calc(100vw-5rem)]"></div>
                        <article class='flex justify-evenly -ml-6 items-center max-md:w-[calc(100vw-5rem)]'>
                            <img src={product.image} alt={product.name} class="w-48" />
        <!--                        <div class="w-48 h-32 rounded-xl bg-(&#45;&#45;pink)"></div>-->
                                <p class="text-oswald text-balance max-w-48 w-48" style="color: var(--black)">{product.name}</p>
                                <div class="bg-(--pink) rounded-md mr-1 h-min px-2 text-oswald gap-2 flex items-center" style="color: var(--black)">
                                    <button onclick={() => decrement(product)} class="text-xl mt-[-.3rem] z-30">-</button>
                                    <h3 class="text-sm font-semibold">{product.quantity}</h3>
                                    <button class="text-xl" onclick={() => increment(product)}>+</button>
                                </div>
                                <div class="flex gap-1">
                                    <button class="text-xl bg-(--pink) h-min px-2 rounded-md" onclick="{() => remove(product)}"><img class="w-5.5 h-7" src={bin} alt="delete"></button>
                                    <p class="text-xl max-md:text-xs max-md:items-center max-md:flex max-md:w-16 bg-(--pink) px-2 rounded-md text-oswald-b h-7 font-light">{product.price.toFixed(2)} лв.</p>
                                </div>
                        </article>
                </section>
            {/each}
        {:else}
            <p class="text-oswald-b w-full text-2xl text-center mt-10">Нямате продукти в количката</p>
        {/if}
    </section>

    <CartInfo cart={JSON.parse($cart)} />
<!--    <div class="w-screen h-10 flex lg:hidden">&nbsp;</div>-->

    <div class="flex justify-end items-center mt-16 relative -right-[18vw] lg:hidden">
        <div class="border-t-14 border-t-transparent border-r-14 border-r-transparent border-l-14 border-l-(--black) w-0 h-0 rotate-45 mt-2 mr-[-1.5rem]"></div>
        <div class="w-6 h-1 bg-(--black) rounded-2xl "></div>
        <button onclick={() => {window.location.href = "/products"}} class="text-oswald text-2xl ml-4" style="color: var(--black)">Обратно към пазаруването</button>
    </div>
</main>
<div class="flex justify-end items-center mr-18 -mt-16 max-lg:hidden">
    <div class="border-t-14 border-t-transparent border-r-14 border-r-transparent border-l-14 border-l-(--black) w-0 h-0 rotate-45 mt-2 mr-[-1.5rem]"></div>
    <div class="w-6 h-1 bg-(--black) rounded-2xl "></div>
    <button onclick={() => {window.location.href = "/products"}} class="text-oswald text-2xl ml-4" style="color: var(--black)">Обратно към пазаруването</button>
</div>


<!--<style>-->
<!--    @media (min-width: 48rem) {-->
<!--        :global(body) {-->
<!--            background: radial-gradient(50% 50% at 50% 50%, var(&#45;&#45;pink) 0%, var(&#45;&#45;white) 100%) no-repeat;-->
<!--            }-->
<!--    }-->
<!--    @media (max-width: 48rem) {-->
<!--        :global(body) {-->
<!--            background: var(&#45;&#45;white);-->
<!--        }-->
<!--    }-->
<!--</style>-->