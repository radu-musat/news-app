<template>
    <app-header/>
		<router-view/>
    <auth-modal/>
		<div class="container container--help">
			<p class="nyt-cudos">Built with the <a href="https://www.nytimes.com/" target="_blank">The New York Times</a> -
			<a href="https://developer.nytimes.com/apis" target="_blank">API</a> </p>
		</div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import AuthModal from '@/components/Auth.vue';

export default {
	components: {
		AppHeader,
		AuthModal,
	},
	created() {
		this.$store.dispatch('init_login');
	},
};
</script>

<style lang="scss">
	.nyt-cudos {
		text-align: center;
	}
</style>
