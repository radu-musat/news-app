<template>
	<div class="container">
		<h1>Climate</h1>
		<small>Enter a value and hit the enter key...</small>

		<form class="form" @submit.prevent>
			<input  type="text"
							class="search-box__bar"
							placeholder="Search..."
							v-model="query"
							@keypress="fetchWeather">
			<div class="form__invalid" v-if="invalidMessage">
				{{ invalidMessage }}
			</div>
		</form>

		<div class="weather-box" v-if="typeof weather.main != 'undefined'">
			<div class="weather-box__block">
				<div class="weather-box__data-item">
					<i class="fa-solid fa-city"></i> - {{ weather.name }}, {{ weather.sys.country }}
				</div>
				<div class="weather-box__data-item">
					<i class="fa-solid fa-calendar"></i> - {{ dateBuilder() }}
				</div>
			</div>

			<div class="weather-box__block">
				<div class="weather-box__data-item">
					<i class="fa-solid fa-temperature-three-quarters"></i> -	{{ Math.round(weather.main.temp ) }} °C
				</div>
				<div class="weather-box__data-item">
					<i class="fa-solid fa-cloud-sun"></i> - {{ weather.weather[0].main }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Climate',
	data() {
		return {
			title: '',
			url_base: 'https://api.openweathermap.org/data/2.5/',
			weather: {},
			query: '',
			invalidMessage: '',
		};
	},
	computed: {
		...mapState(['weatherApiKey']),
	},
	methods: {
		fetchWeather(e) {
			if (e.key === 'Enter') {
				fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.weatherApiKey}`)
					.then((res) => res.json()).then(this.setResults)
					.catch((err) => alert(err));
			}
		},
		setResults(results) {
			console.log(results);
			if (results.cod === '404') {
				this.invalidMessage = `${results.message} - ${results.cod} - please try again`;
				this.weather = {};
				return;
			}
			this.invalidMessage = '';
			this.weather = results;
		},
		dateBuilder() {
			const d = new Date();
			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			const day = days[d.getDay()];
			const date = d.getDate();
			const month = months[d.getMonth()];
			const year = d.getFullYear();
			return `${day} ${date} ${month} ${year}`;
		},
	},
};
</script>

<style scoped lang="scss">

	small {
		color: $theme-tertiary;
		display: block;
		margin-bottom: 3rem;
		text-decoration: underline;
	}

	form,
	.weather-box {
		border-radius: 7px;
		background-color: #edf5fc;
		box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%), 0 10px 10px -5px rgb(0 0 0 / 4%);
		display: block;
		max-width: 600px;
		padding: 1rem;
		position: relative;
		width: 100%;
	}

	form {
		margin-bottom: 1rem;
	}

	.weather-box__block,
	.weather-box__data-item {
		margin-bottom: 1rem;
		&:last-child {
			margin: 0;
		}
	}

	i {
		color: $theme-valid-alert;
		display: inline-flex;
		justify-content: center;
		width: 1.5rem;
	}

</style>
