<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Product from "$lib/components/Product.svelte";

    let {data} = $props();
</script>

<Navbar {data} bg />
<Product product={data.product?? data.box} box={data.type === "box"}/>