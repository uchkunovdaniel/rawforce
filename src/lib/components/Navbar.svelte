<script lang="ts">
    import logo from "$lib/assets/logo.svg";
    import profile from "$lib/assets/profile.svg";
    import cartimg from "$lib/assets/cart.svg";
    import {cart} from '$lib/stores'
    import LoginPopup from "$lib/components/LoginPopup.svelte";
    import type {AuthRecord} from "pocketbase";

    let {bg, data }: { bg?: boolean, data: {user: AuthRecord}} = $props()

		let cartSize = $state(0)

		if($cart) cartSize = JSON.parse($cart).products?.length ?? 0

    let hidden = $state(true);

</script>

<nav class="{bg? 'bg-(--pink)': ''}">
    <ul class="flex justify-between items-center pt-4 px-4">
        <li>
            <button onclick={() => window.location.href = '/'}>
                <img src={logo} alt="logo" class="max-sm:w-12 sm:w-20 lg:w-30 mt-4">
            </button>
        </li>
        <li class="text-oswald max-sm:text-xl sm:text-2xl lg:text-3xl">
                <a href="/products" id="products" class="cursor-pointer">Продукти</a> &nbsp; &nbsp; &nbsp;
                <a href="/about" id="about" class="cursor-pointer">За нас</a>
        </li>
        <li class="flex gap-4 mr-[3vw]">
            {#if data.user}
                <button onclick={() => window.location.href = '/profile'}>
                    <img src={profile} alt="profile" class="max-sm:w-4 sm:w-6 lg:w-8">
                </button>
            {:else}
                <button onclick={() => hidden = !hidden}>
                    <img src={profile} alt="profile" class="max-sm:w-4 sm:w-6 lg:w-8">
                </button>
            {/if}
            {#if !hidden}
                <LoginPopup onclick={() => hidden = true} />
            {/if}
            <button onclick={() => window.location.href = '/cart'} class="flex">
                <img src={cartimg} alt="cart" class="max-sm:w-4 sm:w-6 lg:w-8">
                <span class="px-1.5 text-xs text-oswald">{cartSize}</span>
            </button>
        </li>
    </ul>
</nav>

<!--{#if pink}-->
<!--    <style>-->
<!--        a {-->
<!--            color: var(&#45;&#45;dark-pink);-->
<!--        }-->
<!--        li + li > a > img, li + li > button > img {-->
<!--            filter: invert(56%) sepia(15%) saturate(5890%) hue-rotate(306deg) brightness(87%) contrast(87%);-->
<!--        }-->
<!--        a:focus-visible {-->
<!--            border-radius: .5rem;-->
<!--            padding: 0 .2rem 0 .2rem;-->
<!--            line-height: 1rem;-->
<!--            outline: 2px solid var(&#45;&#45;dark-pink);-->
<!--	    }-->
<!--        span {-->
<!--            color: var(&#45;&#45;dark-pink);-->
<!--        }-->
<!--    </style>-->
<!--{/if}-->