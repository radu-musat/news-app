<template>
	<app-loading :isLoading="contentIsLoading"/>
	<div class="container">
		<h1>
			World News
		</h1>
		<app-grid :news="news"/>
  </div>
</template>

<script>
import { mapActions, mapState	} from 'vuex';
import AppGrid from '@/components/Grid.vue';
import AppLoading from '@/components/Loading.vue';

export default {
	name: 'Home',
	components: {
		AppGrid,
		AppLoading,
	},
	data() {
		return {
			contentIsLoading: true,
		};
	},
	methods: {
		...mapActions(['setNews']),
	},
	async created() {
		await this.setNews('world');
		this.contentIsLoading = !this.contentIsLoading;
	},
	computed: {
		...mapState(['news']),
	},
};
</script>
