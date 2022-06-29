<template>
	<div class="container manage">
		<h1>Manage your custom feed</h1>
		<small class="manage__description">you can drag and drop tags from box to tox to configure your current feed</small>
		<div class="manage__panels">
			<div class="manage__panel">
				<h2>Available tags</h2>
				<div class="tags-grid">
					<span v-for="tag in tags" :key="tag" class="card card--tags" :data-tag="tag">
						{{ tag }}
						<i class="fa-solid fa-plus"></i>
					</span>
				</div>
			</div>

			<div class="manage__panel">
				<h2>My Tags</h2>
				<div class="tags-grid"
					@drag.prevent.stop=""
					@dragstart.prevent.stop=""
					@dragend.prevent.stop=""
					@dragover.prevent.stop=""
					@dragenter.prevent.stop=""
					@drop.prevent.stop=""
				>
					<span v-for="tag in selectedTags" :key="tag" class="card card--tags"> {{ tag }} <i class="fa-solid fa-minus danger"></i></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Manage',
	data() {
		return {
			tags: [
				'world',
				'sports',
				'theater',
				'style',
				'politics',
				'movies',
				'jobs',
				'media',
				'culture',
				'education',
				'books',
				'business',
				'arts',
				'fashion',
			],

			selectedTags: [
				'world',
				'sports',
				'theater',
			],
		};
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
		grid-template-rows: max-content;
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
