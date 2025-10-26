<script lang="ts">
    import ProductCard from "$lib/components/ProductCard.svelte";
    import BuyButton from "$lib/components/BuyButton.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import logo from "$lib/assets/logo.svg";
    import toast, {Toaster} from "svelte-french-toast";
    import {page} from "$app/state";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";

    let {data} = $props()

    if(page.url.searchParams.get('success')){
        toast.success("Продуктът е добавен в количката", {
            position: "top-center",
            iconTheme: {
                primary: "var(--pink)",
                secondary: "var(--white)"
            }
        })
        if(browser) {
            page.url.searchParams.delete('success')
            goto(page.url.pathname)
        }
    }
</script>

<Navbar {data} />
<Toaster />

<main class="w-screen h-max flex justify-center p-10 items-baseline pt-32">
<!--    <img src="{blueberriesp}" alt='blueberries' class="absolute w-[80vw] top-[20rem] max-lg:hidden">-->
    <section class="grid lg:grid-cols-2 max-md:grid-cols-1 md:grid-cols-2 content-center gap-x-6 gap-y-16">
        {#each data.products as product (product.name)}
            <ProductCard product={product}/>
        {/each}
    <article class="bg-pink-50 min-lg:col-span-3 h-64 md:col-span-2 rounded-xl flex max-md:flex-col max-md:max-w-64 items-center justify-around p-10">
        <img src={data.box.image} alt="Кутия" class="w-70 h-60 max-md:w-30 max-md:h-40"/>
        <section class="flex flex-col items-center justify-center gap-4 z-50">
            <h3 class="text-oswald paragraph" style="color: var(--black)">Кутия с 5 вкуса барчета</h3>
            <BuyButton onclick={() => window.location.href = `/products/${data.box.id}`}>Купи</BuyButton>
        </section>
    </article>
    </section>
</main>

<footer class="w-screen h-[30vh] bg-[#FFF9FA11] p-10 relative bottom-0 flex items-center justify-between mt-20">
    <ul class="flex flex-col">
        <li class="text-oswald-b font-semibold paragraph mb-4">Открийте ни</li>
        <li class="text-oswald-b paragraph"><a href="https://tiktok.com">TikTok</a></li>
        <li class="text-oswald-b paragraph"><a href="https://instagram.com">Instagram</a></li>
        <li class="text-oswald-b paragraph"><a href="https://gmail.com">Email</a></li>
    </ul>
    <img src="{logo}" alt="logo" class="w-[10vw]"/>
       <ul class="flex flex-col text-right">
        <li class="text-oswald-b font-semibold paragraph mb-4">Навигация</li>
        <li class="text-oswald-b paragraph cursor-pointer" id="home">Начало</li>
        <li class="text-oswald-b paragraph"><a href="/products">Продукти</a></li>
        <li class="text-oswald-b paragraph"><a href="/about">За Нас</a></li>
    </ul>
</footer>


<style>
    :global(body) {
        background: linear-gradient(var(--pink) 30%, var(--blue) 90%);
        /*background: radial-gradient(80% 110% at 50% 100%, #FFB1C9 74.04%, #FFF6F8 100%) no-repeat;*/
        background-size: 100% 100%;
    }
</style>