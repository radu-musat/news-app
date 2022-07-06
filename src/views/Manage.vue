<template>
	<app-loading :isLoading="contentIsLoading"/>
	<div class="container manage">
		<h1>Manage your custom feed</h1>
		<small class="manage__description">you can drag and drop tags from box to box to configure your current feed</small>
		<p class="manage__error" v-if="showTagError">{{ errorMessage }}</p>
		<div class="manage__panels">
			<div class="manage__panel" :data-disabled="showTagError">
				<h2>Available tags</h2>
				<div class="tags-grid"
					@dragenter.prevent.stop
					@dragover.prevent.stop
					@drop.prevent.stop="drop($event, this.selectedTags, this.tags)">
					<span v-for="tag in tags" :key="tag" class="card card--tags" :data-tag="tag" draggable="true"
								@dragstart.stop="dragStart">
						{{ tag }}
						<i class="fa-solid fa-plus" @click="addTag(tag, this.selectedTags); removeTag(tag, this.tags)"></i>
					</span>
				</div>
			</div>

			<div class="manage__panel" :data-disabled="showTagError">
				<h2>My Tags</h2>
				<div class="tags-grid"
					@dragenter.prevent.stop
					@dragover.prevent.stop
					@drop.prevent.stop="drop($event, this.tags, this.selectedTags)">
					<span v-for="tag in selectedTags" :key="tag" class="card card--tags" :data-tag="tag" draggable="true"
								@dragstart.stop="dragStart">
						{{ tag }}
						<i class="fa-solid fa-minus danger"  @click="removeTag(tag, this.selectedTags); addTag(tag, this.tags)"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { auth, configsCollection } from '@/includes/firebase';
import { mapActions, mapState	} from 'vuex';
import AppLoading from '@/components/Loading.vue';

export default {
	name: 'Manage',
	components: {
		AppLoading,
	},
	data() {
		return {
			contentIsLoading: true,
			tags: [],
			selectedTags: [],
			errorMessage: `
			Something went wrong while getting your feed configuration. Please refresh the page or try again later.
			If the problem persists please notify the developer. Thank you!
			`,
		};
	},
	computed: {
		...mapState(['showTagError', 'tagConfig']),
		userTagConfig() {
			return	{
				tags: [...this.tags],
				selectedTags: [...this.selectedTags],
			};
		},
	},
	watch: {
		tags: {
			handler() {
				this.uploadData();
			},
			deep: true,
		},
	},
	methods: {
		...mapActions(['checkForUserConfig']),
		dragStart(e) {
			const { tag } = e.target.dataset;
			e.dataTransfer.setData('tagName', tag);
		},
		drop(e, arrayToRemoveFrom, arrayToAddTo) {
			const tagName = e.dataTransfer.getData('tagName');
			this.removeTag(tagName, arrayToRemoveFrom);
			this.addTag(tagName, arrayToAddTo);
		},
		addTag(tag, tagArray) {
			if (tagArray.indexOf(tag) === -1) {
				tagArray.push(tag);
			}
		},
		removeTag(tag, tagArray) {
			const tagIndex = tagArray.findIndex((tagName) => tagName === tag);
			if (tagIndex !== -1) {
				tagArray.splice(tagIndex, 1);
			}
		},
		setTags() {
			this.tags = [...this.tagConfig.tags];
			this.selectedTags = [...this.tagConfig.selectedTags];
		},
		async uploadData() {
			const data = {
				uid: auth.currentUser.uid,
				tagConfig: this.userTagConfig,
			};

			try {
				await configsCollection.doc(auth.currentUser.uid).set(data);
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		await this.checkForUserConfig();
		this.setTags();
		this.contentIsLoading = false;
	},
};
</script>

<style lang="scss" scoped>
	.manage__description {
		color: $theme-tertiary;
		display: block;
		margin-bottom: 3rem;
		text-decoration: underline;
	}

	.tags-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(0px, 42px ));
		grid-gap: 1rem;
	}

	.manage__panels {
		width: 100%;

		.manage__panel {
			flex-grow: 1;

			&:first-child {
				margin-bottom: 2rem;
			}

			h2 {
				text-decoration: underline;
			}

			.tags-grid {
				align-items: start;
				border-radius: 5px;
				box-shadow: 0px 2px 5px rgb(0 0 0 / 10%);
				height: calc(100% - 56px);
				padding: 1.5rem 1rem;
				background-color: $theme-secondary;
			}
		}

		.manage__panel[data-disabled="true"] {
			pointer-events: none;
			opacity: .5;
		}
	}

	.manage__error {
		background-color: $theme-secondary;
		color: $theme-invalid-alert;
		display: inline-block;
		font-size: .7rem;
		line-height: 1.25;
		margin-bottom: 1rem;
		max-width: 490px;
		padding: .5rem;
	}

	@media only screen and (min-width: $tablet) {
		.manage__panels {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.manage__panel {
				flex-grow: initial;
				flex-basis: 40%;

				&:first-child {
					margin: 0 1.5rem 0 0;
				}
			}
		}
	}
</style>
