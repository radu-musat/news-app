<template>
  <div class="container">
		<h1 class="h2">About</h1>
		<p>This is a demo application built with <a href="https://vuejs.org/">Vue.JS</a>.</p>
		<p>
			It's purpose is to provide users a simple way of browsing day to day news on based on a simple customizable feed.
			Fun fact: This is the first app I built with <a href="https://vuejs.org/">Vue.JS</a>, and am happy to say that it's become favourite technology since
			I started learning programming and web development.
		</p>
		<h2>How to use</h2>
		<p>
			You will need to create an account in order to customize and view a personal feed - this is only for the sake of demonstrating functionality.
			It goes without saying that <strong>you should not use any sort of sensitive data</strong> when doing so.
			You can use fake data it doesn't matter - it's only for demo
			purposes.
		</p>
		<h2>Author info/contact</h2>
		<p>I'm a web developer,I'm always looking to expand my skill-set, If you'd like to know more about me you can do so here <a href="https://radum.eu/">here</a></p>
		<p>If you'd like to contact me you can do so at the following email address
		<a href="mailto:radu.musat.abc@gmail.com" class="footer__email">radu.musat.abc@gmail.com</a></p>
  </div>

</template>
<style  scoped lang="scss">
h1, h2 {
	text-align: center;
	text-decoration: underline;
	&:not(:first-child) {
		margin-top: 3.5rem;
	}
}

p {
	max-width: 1024px;
}

@media only screen and (min-width: $tablet) {
	p {
		margin: 0 auto 1rem;
		text-align: center;
	}
}
</style>
