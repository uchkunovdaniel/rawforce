<script lang="ts">
import hidden from "$lib/assets/hidden.svg";
import visible from "$lib/assets/visible.svg";

let {id, height}:{id:string, height?:string} = $props();

let shown = $state(false);

function toggle() {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input.type === "password") {
        input.type = "text";
        shown = true;
        input.focus();
    } else {
        input.type = "password";
        shown = false;
        input.focus();
    }
}

</script>

<div class="flex justify-end items-center">
    <input id={id} type="password" name={id} class="w-64 h-{height??8} bg-(--pink) text-oswald-b block focus:outline-1 px-2 rounded">
    <button class="absolute w-5 mr-2" type="button" onclick="{toggle}">
        <img src="{shown? visible : hidden}" alt="hidden">
    </button>
</div>