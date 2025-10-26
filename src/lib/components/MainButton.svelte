<script lang="ts">
    type Props = {
        children: () => string;
        onclick?: () => void;
        margin?: string;
    }
    
    let {children, onclick, margin}: Props = $props();
</script>


<button onclick={onclick} style="margin-top: {margin}" class="bg-(--black) rounded-xl font-semibold text-oswald max-sm:text-xl sm:text-xl md:text-2xl lg:text-4xl px-14 py-2 flex justify-center items-end cursor-pointer z-10">{@render children()}</button>