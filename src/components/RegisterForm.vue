<template>
	<span v-if="reg_show_alert" class="form-message" :class="reg_alert_variant" v-html="reg_alert_msg"></span>
	<vee-form :initial-values="userData" :validation-schema="schema" class="form" @submit="register">

		<div class="form__group">
			<label>user name</label>
			<vee-field name="name" type="text"/>
			<error-message name="name"/>
		</div>

		<div class="form__group">
			<label>email</label>
			<vee-field name="email" type="email"/>
			<error-message name="email"/>
		</div>

		<div class="form__group">
			<label>age</label>
			<vee-field max="130" min="14" name="age" type="number"/>
			<error-message name="age"/>
		</div>

		<div class="form__group">
			<label>password</label>
			<vee-field v-slot="{ field, errors }" :bails="false" name="password">
				<input type="password" v-bind="field"/>
				<div v-for="error in errors" :key="error" class="form__group--multi-error">
					{{ error }}
				</div>
			</vee-field>
			<!--			<error-message name="password"/>-->
		</div>

		<div class="form__group">
			<label>confirm password</label>
			<vee-field name="confirm_password" type="password"/>
			<error-message name="confirm_password"/>
		</div>

		<div class="form__group">
			<label>country</label>
			<vee-field as="select" name="country">
				<option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
			</vee-field>
			<error-message name="country"/>
		</div>

		<div class="form__group form__group--tos">
			<vee-field name="tos" type="checkbox" value="1"/>
			<label>I accept the <a href="#">terms of service</a> </label>
			<error-message name="tos"/>
		</div>

		<button type="submit" :disabled="reg_in_submission">Submit</button>
	</vee-form>
</template>

<script>
import countries from '@/includes/countries';

export default {
	name: 'RegisterForm',
	data() {
		return {
			schema: {
				name: 'required|min:3|max:100|alpha_spaces',
				email: 'required|min:3|max:100|email',
				age: 'required|min_value:14|max_value:125',
				password: 'required|min:6|max:100',
				confirm_password: 'passwords_mismatch:@password',
				country: 'required|min:3|country_excluded:Russian Federation (the)',
				tos: 'required',
			},
			userData: {
				country: 'Romania',
			},
			countries,
			reg_in_submission: false,
			reg_show_alert: false,
			reg_alert_variant: 'form-message--in-progress',
			reg_alert_msg: 'You\'re account is now being created. Please wait!',
		};
	},
	methods: {
		async register(values) {
			this.reg_show_alert = true;
			this.reg_in_submission = true;
			this.reg_alert_variant = 'form-message--in-progress';
			this.reg_alert_msg = 'You\'re account is now being created. Please wait!';

			try {
				await this.$store.dispatch('register', values);
			} catch (error) {
				this.reg_in_submission = false;
				this.reg_alert_variant = 'form-message--invalid';
				this.reg_alert_msg = 'Registration failed - a unexpected error occurred. <br> Please try again later!';
				return;
			}

			this.reg_alert_msg = 'Success! You\'re new account account is now available for use!';
			this.reg_alert_variant = 'form-message--valid';

			window.location.reload();
		},
	},
};
</script>

<style scoped>

</style>
