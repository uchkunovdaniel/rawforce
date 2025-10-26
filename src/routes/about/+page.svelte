<script>
    import creators from '$lib/assets/creators.png'
    import Navbar from "$lib/components/Navbar.svelte";

    let {data} = $props()
</script>

<Navbar {data} bg />

<main class="w-screen max-md:h-max h-screen flex items-center justify-evenly mt-[-3rem] max-md:flex-col-reverse max-md:mt-20">
    <img src={creators} alt="creators" class="w-76 max-md:hidden max-lg:w-64 max-lg:mt-[-24rem] lg:mt-[-4rem]">

    <section class="flex flex-col gap-4 justify-center items-center">
        <p class="w-160 max-lg:w-100 max-md:w-72 p-4 bg-(--white) rounded-md text-oswald shadow-md text-md" style="color: var(--black)">
        &nbsp Някой път от случайно запознанство при тренировка правим избор да се хвърлим
    в непознатото и да опознаем човек, който на пръв поглед ни се струва с различни виждания от нашите.
    <br><br>
        &nbsp Как звучи, ако след година се връщаш ден по ден назад и благодариш, че си поел по правилния път.
    Ами сега? Вече имаш човек до себе си, но това не стига да си завършена личност.Все още не сисъздал продукт, който да бъде от полза за хората всеки ден. Продукт,
    който дори и след теб, някой ще продължи да го произвежда и той ще продължава да
    помага на хората. Особено, когато от детството си си бил различния от групата.
    Човекът, който радва всеки с присъствието си, но зад гърба му се сипят подигравки
    относно теглото. И ти би го осъдил за състоянието му нали? Би го осъдил за, това че
    обича да разтоварва психиката си със сладка храна. В един момент този човек вече е
    променен и е създал продукт, с който да подаде ръка и да избави хората изпаднали в
    тази ситуация.
    <br><br>
        &nbsp След доста опити и грешки пред потенциални клиенти достигаш до краен продукт,
    който е идеален според твоите разбирания. Точното за теб отношение между вкус,
    качество и цена. Виждайки надежда твоя продукт да стане успешен идва следващата
    стъпка. ,,Сам човек не успява’’ - нали така се казва, затова гледайки нас двамата като
    едно цяло и хората до нас, които наричаме подкрепа стоим в основата на един тепърва
    израстващ бранд.
        </p>
        <button onclick={() => window.location.href = '/products'} class="bg-(--black) rounded-xl font-semibold text-oswald max-sm:text-xl sm:text-xl md:text-2xl lg:text-3xl px-14 py-2 flex justify-center items-end cursor-pointer z-10 max-md:mb-10">Разгледай продуктите</button>
    </section>
</main>


<style>
    :global(body) {
        background: linear-gradient(var(--pink) 30%, var(--blue) 90%);
        background-size: 100% 100%;
    }
</style>