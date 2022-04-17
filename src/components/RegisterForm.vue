<template>
	<form action="" class="form">
		<div class="form__group">
			<label>user name</label>
			<input type="text" placeholder="enter user name">
		</div>

		<div class="form__group">
			<label>email</label>
			<input type="email" placeholder="enter email">
		</div>

		<div class="form__group">
			<label>age</label>
			<input type="number" placeholder="enter age" min="0" max="130">
		</div>

		<div class="form__group">
			<label>password</label>
			<input type="password" placeholder="password">
		</div>

		<div class="form__group">
			<label>confirm password</label>
			<input type="password" placeholder="password">
		</div>

		<div class="form__group">
				<label>country</label>
				<select id="country" name="country">
					<option value="invalid"></option>
					<option v-for="country in countries" :key="country"> {{ country }} </option>
				</select>
		</div>

		<div class="form__group form__group--tos">
			<input type="checkbox">
			<label>I accept the <a href="#">terms of service</a> </label>
		</div>

		<button type="submit">Submit</button>
	</form>
</template>

<script>
import countries from '@/includes/countries';

export default {
	name: 'RegisterForm',
	data() {
		return {
			countries,
		};
	},
};
</script>

<style scoped>

</style>
