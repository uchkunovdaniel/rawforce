<script>
	import LoginPopup from '$lib/components/LoginPopup.svelte';
	import logo from '$lib/assets/logo.svg';
</script>

<main class="w-screen h-screen flex items-center justify-center bg-(--pink)">
	<img src={logo} alt="logo" class="fixed w-32 top-4 left-4" />
	<LoginPopup superuser />
</main>

