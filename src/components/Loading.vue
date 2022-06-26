<template>
	<div class="loading" :class="{ 'loading--inactive': !isLoading }">
		<p>Content is loading..</p>
		<img src="../../public/assets/refresh.png" alt="loading icon"/>
	</div>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		isLoading: {
			type: Boolean,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
	p {
			margin-bottom: 1rem;
	}

	.loading {
		align-items: center;
		background-color: $theme-secondary;
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
		opacity: 1;
		transition: opacity .3s ease-out;
	}

	.loading--inactive {
		opacity: 0;
		pointer-events: none;
	}

	img	{
		animation-name: spin;
		animation-duration: 5000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		height: 120px;
		width: 120px;
	}

	@keyframes spin {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(360deg);
			}
	}
</style>
