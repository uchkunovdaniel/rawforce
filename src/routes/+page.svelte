<script lang="ts">
    import logo from '$lib/assets/logo.svg';
    import bars from '$lib/assets/bars.png';
    import blueberries from '$lib/assets/blueberries.png';
    import profile from '$lib/assets/profile.svg'

    import {browser} from "$app/environment";
    import MainButton from "$lib/components/MainButton.svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    let {data} = $props()

    if (browser) {
        const home: HTMLElement = document.getElementById('home') as HTMLElement;
        home.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth' });
        });
    }

</script>

<Navbar {data} />

<main class="main">
    <h1 class="heading text-oswald font-semibold">RAWFORCE</h1>
    <p class="text-oswald paragraph text-center font-normal z-10">Барче с комбинация от натурални съставки и енергия <br> за активния ти ден. Чисто, вкусно и винаги на една ръка разстояние.</p>
    <MainButton margin="4rem" onclick={() => {window.location.href = 'products'}}>Купи сега</MainButton>
    <img src={bars} height="1411" width="1920" alt="bars" class="absolute mt-100 z-0 max-sm:hidden"/>
    <img src={blueberries} height="3114" width="1885" alt="blueberries" class="absolute lg:mt-430 md:mt-280 sm:mt-230 max-sm:hidden z-0"/>
</main>
<section class="section">
    <h2 class="text-oswald font-semibold heading2 mb-10">Нашите барчета</h2>
    <p class="text-oswald paragraph text-center font-normal z-10">Нашите барчета са създадени с грижа и вкус – 5 уникални комбинации, приготвени <br> ръчно в малки серии. Лек и нискокалоричен избор, направен от 100% истински <br> плодове, за да ти даде чиста енергия във всяка хапка.</p>
</section>
<section class="section">
    <article class="w-[70vw] h-72 bg-(--white) rounded-xl mt-[-10rem] clip flex justify-between">
<!--        <img src={data.products[0].image} height="298" width="298" alt="bars" class="rounded-l-xl max-lg:hidden"/>-->
        <section class="flex flex-col items-center w-full py-4 justify-evenly">
            <h2 class="text-oswald font-semibold z-20 max-md:text-2xl text-3xl" style="color: var(--brown)">Какво ни отличава?</h2>
            <ul class="flex flex-col gap-2">
                <li class="adv-item text-oswald max-md:text-[3vw] lg:text-xl md:text-xl text-nowrap">Натурални съставки</li>
                <li class="adv-item text-oswald max-md:text-[3vw] lg:text-xl md:text-xl text-nowrap">Без глутен, захар и лактоза</li>
                <li class="adv-item text-oswald max-md:text-[3vw] lg:text-xl md:text-xl text-nowrap">Не дразнят стомаха и червата</li>
            </ul>
        </section>
    </article>
</section>
<section class="section gap-16">
    <h2 class="text-oswald font-semibold z-20 heading2 md:mt-[-13rem]">Какво казват за нас</h2>
    <section class="flex gap-4">
        {#if browser}
            {#each data.reviews.slice(0,window.innerWidth < 640 ? 1 : 3) as review (review.id)}
                <article class="bg-(--white) max-sm:w-[80vw] min-w-[23.5vw] min-h-[30vw] max-md:gap-2 md:gap-2 gap-4 rounded-xl shadow-2xl flex flex-col items-center p-4 z-50">
                    <h3 class='text-oswald font-semibold max-md:text-xl md:text-xl text-2xl' style="color: var(--black)">{review.name? review.name : 'Анонимен'}</h3>
                    <h4 class='text-oswald font-normal text-xl' style="color: var(--black)">{review.occupation}</h4>
                    <img src="{review.avatar? review.avatar: profile}" style="{review.avatar? '' : 'filter: invert()'}" alt="profile" class="w-[12vw]" />
                    <p class="text-oswald-b text-center max-sm:max-w-[70vw] max-w-[21vw] h-max overflow-hidden text-wrap">{review.review}</p>
                </article>
            {/each}
        {/if}
    </section>
</section>

<footer class="w-screen h-[30vh] bg-[#FFF9FA11] p-10 relative bottom-0 flex items-center justify-between">
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
    }
</style>