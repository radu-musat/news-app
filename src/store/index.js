import { createStore } from 'vuex';
import { auth, usersCollection, configsCollection } from '@/includes/firebase';
import defaultTags from '@/includes/tags';

export default createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
		showTagError: false,
		news: [],
		tagConfig: {},
		nytSearchApi: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=',
		apiKey: 'ZKndWafQR36iVe9yLwpsmYivsXcorGov',
		weatherApiKey: 'efed1650d269ddf8fc4da49595587e5e',
	},

	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth(state) {
			state.userLoggedIn = !state.userLoggedIn;
		},
		toggleTagError(state) {
			state.showTagError = !state.showTagError;
		},
		setNews(state, payload) {
			state.news = [...payload.response.docs];
		},
		setTagConfig(state, payload) {
			// console.log(payload);
			state.tagConfig = payload;
		},
		setTagError(state) {
			state.showTagError = !this.state.showTagError;
		},
	},

	getters: {
		// authModalShow: (state) => state.authModalShow,
	},

	actions: {
		// ctx - same as this.$store.commit - below it's destructured (ctx.commit)
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
				commit('setNews', response);
			} catch (err) {
				// eslint-disable-next-line no-alert
				alert('something went wrong please try reloading the page');
				// eslint-disable-next-line no-alert
				throw new Error(err);
			}
		},
		setTagConfig({ commit }, payload) {
			commit('setTagConfig', payload);
		},
		async checkForUserConfig({ commit, dispatch }) {
			const { uid } = auth.currentUser;
			const baseConfig = {
				tags: defaultTags,
				selectedTags: [],
			};
			let config;

			try {
				config = await configsCollection.doc(uid).get();
				if (config) {
					const data = config.data();

					if (!data || (!data.tagConfig.tags && !data.tagConfig.selectedTags)) {
						dispatch('setTagConfig', baseConfig);
					} else {
						dispatch('setTagConfig', data.tagConfig);
					}
				}
			} catch (err) {
				commit('setTagError');
				console.error(err);
			}
		},
	},
});
