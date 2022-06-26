<template>
    <app-header/>
		<router-view/>
    <auth-modal/>
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
</style>
