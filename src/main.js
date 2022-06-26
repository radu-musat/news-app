import '@/assets/shared/scss/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';

// app is wrapped in callback in order to check with Firebase if the user has been authenticated first when it fist starts
let app;
auth.onAuthStateChanged(() => {
	// check is done in order to not initialize the app multiple times because of event
	if (!app) {
		app = createApp(App);
		app.use(store);
		app.use(router);
		app.use(VeeValidatePlugin);

		app.mount('#app');
	}
});
