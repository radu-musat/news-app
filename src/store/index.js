import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
		news: [],
		nytSearchApi: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=',
		apiKey: 'ZKndWafQR36iVe9yLwpsmYivsXcorGov',
	},

	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth(state) {
			state.userLoggedIn = !state.userLoggedIn;
		},
		setNews(state, payload) {
			state.news = [...payload.response.docs];
		},
	},

	getters: {
		// authModalShow: (state) => state.authModalShow,
	},

	actions: {
		// ctx - same this.$store.commit - below it's destructured
		async register({ commit }, payload) {
			const userCredentials = await auth.createUserWithEmailAndPassword(
				payload.email,
				payload.password,
			);

			// will not work if user is not authenticated - register() will create a user, store a login token, then store a collection item
			// await usersCollection.add({
			await usersCollection.doc(userCredentials.user.uid).set({
				name: payload.name,
				email: payload.email,
				age: payload.age,
				country: payload.country,
			});

			await userCredentials.user.updateProfile({
				displayName: payload.name,
			});

			commit('toggleAuth');
		},
		// signs in - adds token for init_login
		async login({ commit }, payload) {
			await	auth.signInWithEmailAndPassword(payload.email, payload.password);
			commit('toggleAuth');
		},
		// checks for sign-in token
		init_login({ commit }) {
			const user = auth.currentUser;

			if (user) {
				commit('toggleAuth');
			}
		},

		async logout({ commit }) {
			await auth.signOut();
			commit('toggleAuth');
		},

		// { commit, state, dispatch }
		async setNews({ commit, state }, payload) {
			try {
				const request = await fetch(`${state.nytSearchApi}${payload}&api-key=${state.apiKey}`);
				const response = await request.json();
				// console.log(response);
				commit('setNews', response);
			} catch (err) {
				// eslint-disable-next-line no-alert
				alert('something went wrong please try reloading the page');
				// eslint-disable-next-line no-alert
				throw new Error(err);
			}
		},
	},
});
