<template>
	<div class="container manage">
		<h1>Manage your custom feed</h1>
		<small class="manage__description">you can drag and drop tags from box to box to configure your current feed</small>
		<div class="manage__panels">
			<div class="manage__panel">
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

			<div class="manage__panel">
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
import tags from '@/includes/tags';
import { auth, configsCollection } from '@/includes/firebase';

export default {
	name: 'Manage',
	data() {
		return {
			tags,
			selectedTags: [],
		};
	},
	computed: {
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
		async uploadData() {
			const data = {
				uid: auth.currentUser.uid,
				tagConfig: this.userTagConfig,
			};

			await configsCollection.doc(auth.currentUser.uid).set(data);
		},
	},
	mounted() {
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
