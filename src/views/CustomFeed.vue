<template>
	<app-loading :isLoading="contentIsLoading"/>
	<div class="container">
		<h2 v-if="noTagsSet">No tags have been set. <br> Please set up some tags and come back 🤡</h2>
		<div v-else>
			<h1>My Feed</h1>
			<small>Click a tag to load one of your feed sources</small>
			<div class="custom-feed__tag-grid">
				<a class="card card--tags card--tags-simple" href="#"
					v-for="tag in this.tagConfig.selectedTags"
					:key="tag" @click.prevent="setFeed(tag)" :class="{ active: activeTag === tag }">{{ tag }}</a>
			</div>
			<app-grid :news="news"/>
		</div>
	</div>

</template>

<script>
import { mapActions, mapState	} from 'vuex';
import AppGrid from '@/components/Grid.vue';
import AppLoading from '@/components/Loading.vue';

export default {
	name: 'CustomFeed',
	components: {
		AppGrid,
		AppLoading,
	},
	data() {
		return {
			contentIsLoading: true,
			noTagsSet: true,
			activeTag: '',
		};
	},
	computed: {
		...mapState(['news', 'tagConfig']),
	},
	methods: {
		...mapActions(['setNews', 'checkForUserConfig']),
		async setFeed(tagName) {
			this.contentIsLoading = true;
			await this.setNews(tagName);
			this.activeTag = tagName;
			this.contentIsLoading = false;
		},
	},
	async created() {
		await this.checkForUserConfig();
		if ((this.tagConfig.selectedTags) && (Object.keys(this.tagConfig.selectedTags).length !== 0)) {
			this.noTagsSet = false;
			await this.setNews(this.tagConfig.selectedTags[0]);

			// eslint-disable-next-line prefer-destructuring
			this.activeTag = this.tagConfig.selectedTags[0];
		}
		this.contentIsLoading = !this.contentIsLoading;
	},
};
</script>

<style scoped lang="scss">
	small {
		color: $theme-tertiary;
		display: block;
		margin-bottom: 1rem;
		text-decoration: underline;
	}

	.custom-feed__tag-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(0px, 42px ));
		grid-gap: 1rem;
		margin-bottom: 1rem;

		.card {
			display: flex;
			justify-content: center;
		}
	}

	@media only screen and (min-width: $tablet) {
		.custom-feed__tag-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 150px));
		}
	}

</style>
