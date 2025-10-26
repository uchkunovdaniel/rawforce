<script lang="ts">
    import BuyButton from "$lib/components/BuyButton.svelte";
    let { product, onclick, text }: {product: Product, onclick?: () => void, text?: string} = $props();

    function getEuro(price: number) {
        return (price / 1.95583).toFixed(2);
    }
</script>

<article class="w-64 h-72 bg-pink-100 rounded-xl flex flex-col justify-center items-center gap-4">
    <img src={product.image} alt={product.name} class="w-48 mt-[-6rem]" />
    <p class="text-oswald paragraph text-center text-balance mt-[-1rem]" style="color: var(--black)">{product.name}</p>
    <p class="text-oswald font-light" style="color: var(--black)">Цена: {product.price.toFixed(2)} лв. / {getEuro(product.price)} €</p>
    <BuyButton onclick={onclick? onclick : () => window.location.href = `/products/${product.id}`}>{text?? 'Купи'}</BuyButton>
</article>