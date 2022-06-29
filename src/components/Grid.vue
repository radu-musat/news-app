<template>
	<div class="grid">
		<a class="card" v-for="item in news"  v-bind:key="item.headline.main" :href="item.web_url" target="_blank">
			<figure>
				<!--constructImageUrl(item) -->
				<img  alt="article image"  ref="imageElements">
				<figcaption>
					<span> posted on</span>
					<span> {{ getDate(item.pub_date) }} </span>
				</figcaption>
			</figure>
			<p>
				{{ item.headline.main }}
			</p>
			<p>
				read more on <span>{{ getHostName(item.web_url) }}</span>
			</p>
		</a>
	</div>
</template>

<script>

export default {
	name: 'Grid',
	props: {
		news: {
			type: Array,
			required: true,
		},
	},
	methods: {
		getHostName(url) {
			const { hostname } = new URL(url);
			return hostname;
		},
		getDate(postDate) {
			return new Date(postDate).toDateString();
		},
	},
	updated() {
		const { imageElements } = this.$refs;
		imageElements.forEach((imageEl, i) => {
			if (this.news[i].multimedia.length > 0) {
				const hostUrl = this.getHostName(this.news[i].web_url);
				const picture = this.news[i].multimedia[0].url;
				imageEl.setAttribute('src', `https://${hostUrl}/${picture}`);
			} else {
				imageEl.setAttribute('src', '/assets/post.jpg');
			}
		});
	},
};
</script>
