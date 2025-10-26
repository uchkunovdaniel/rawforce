<script lang="ts">
	let {onclickCancel, onclickConfirm} = $props()
</script>


<article class="flex items-center justify-center gap-4 fixed top-30 confirmPos m-auto z-50 bg-(--black) w-50 h-20 rounded-xl">
	<button onclick={onclickCancel} class="bg-(--white) text-oswald-b p-2 rounded-xl">Отказ</button>
	<button onclick={onclickConfirm} class="bg-(--white) text-oswald-b p-2 rounded-xl">Премахни</button>
</article>
