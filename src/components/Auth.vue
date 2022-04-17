<template>
  <div class="authentication" :class="{ 'authentication__hidden': hidden }">
    <div class="authentication__form">
      <h3 class="h2"> {{ tab }} </h3>
      <div class="authentication__form-tabs">
        <a class="btn-primary" :class="{'btn-primary--active': tab === 'login'}" href="#" @click.prevent="tab = 'login'">Login</a>
        <a class="btn-primary" :class="{'btn-primary--active': tab === 'register'}"  href="#" @click.prevent="tab = 'register'">Register</a>
      </div>

			<!-- Login Form -->
			<app-login-form v-if="tab === 'login'"/>

			<!-- Register Form -->
			<app-register-form v-else/>
    </div>
  </div>
</template>

<script>
import AppLoginForm from './LoginForm.vue';
import AppRegisterForm from './RegisterForm.vue';

export default {
	name: 'Auth',
	components: {
		AppLoginForm,
		AppRegisterForm,
	},
	data() {
		return {
			tab: 'login',
			hidden: true,
		};
	},
};
</script>

<style lang="scss" scoped>
  .authentication {
    background-color: rgba(31,41,55, .7);
    display: block;
		height: 100vh;
    left: 0;
		overflow-y: auto;
    padding: 1.5rem;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 9999;
		text-align: center;
		transition: opacity .25s ease-out;

		&.authentication__hidden {
			pointer-events: none;
			opacity: 0;
			z-index: -9999;
		}
  }

  .authentication__form {
    border-radius: 7px;
    background-color: $theme-secondary;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04);
		display: inline-block;
    max-width: 500px;
    padding: 20px;
    width: 100%;

    h3 {
			margin-bottom: 1.5rem;
      text-align: center;
      text-transform: capitalize;
    }
  }

  .authentication__form-tabs {
    margin-bottom: 1.5rem;

    .btn-primary {
      flex-basis: 45%;
      display: block;
      &:first-child {
        margin-bottom: 20px;
      }
    }
  }

  @media only screen and (min-width: $tablet) {

		.authentication__form {
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}

    .authentication__form-tabs {
      display: flex;
      justify-content: space-between;

      .btn-primary:first-child {
        margin: 0;
      }
    }

  }

</style>
