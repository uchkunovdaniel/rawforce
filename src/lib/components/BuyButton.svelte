<script lang="ts">
    type Props = {
        children: () => string;
        onclick?: () => void;
        disabled?: boolean;
        tailwindClass?: string;
        type?: 'button' | 'submit' | 'reset' | null | undefined;
        form?: string;
        style?: string;
    }

    let {children, onclick, disabled, tailwindClass, type, form, style}: Props = $props();
</script>


<button {form} {type} {disabled} onclick={onclick} class="px-10 h-10 bg-(--black) text-oswald rounded-xl text-2xl pt-0.5 flex items-start justify-center z-50 disabled:opacity-40 disabled:cursor-not-allowed {tailwindClass}" {style}>{@render children()}</button>