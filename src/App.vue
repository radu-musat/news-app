<template>
   <app-header/>
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
};
</script>

<style lang="scss">
</style>
