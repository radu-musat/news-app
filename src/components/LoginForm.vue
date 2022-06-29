<template>
	<span v-if="login_show_alert" class="form-message" :class="login_alert_variant" >
		{{ login_alert_msg }}
	</span>
	<vee-form class="form" :validation-schema="schema" @submit="login">
		<div class="form__group">
			<label>email</label>
			<vee-field type="email" name="email"/>
			<error-message name="email"/>
		</div>
		<div class="form__group ">
			<label>password</label>
			<vee-field type="password" name="password"/>
			<error-message name="password"/>
		</div>
		<button type="submit" :disabled="login_in_submission">Submit</button>
	</vee-form>
</template>

<script>
export default {
	name: 'LoginForm',
	data() {
		return {
			schema: {
				email: 'required|min:3|max:100|email',
				password: 'required|min:6|max:100',
			},
			login_in_submission: false,
			login_show_alert: false,
			login_alert_variant: 'form-message--in-progress',
			login_alert_msg: 'Please wait. You\'re now being logged in!',
		};
	},
	methods: {
		async login(values) {
			this.login_show_alert = true;
			this.login_in_submission = true;
			this.login_alert_variant = 'form-message--in-progress';
			this.login_alert_msg = 'Please wait. You\'re now being logged in!';

			try {
				await this.$store.dispatch('login', values);
			} catch (error) {
				this.login_in_submission = false;
				this.login_alert_variant = 'form-message--invalid';
				this.login_alert_msg = 'Invalid login details.';
				return;
			}

			this.login_alert_msg = 'Login successful!';
			this.login_alert_variant = 'form-message--valid';
			window.location.reload();
		},
	},
};
</script>

<style scoped>

</style>
