import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import CustomFeed from '@/views/CustomFeed.vue';
import Climate from '@/views/Climate.vue';
import store from '@/store';

const routes = [
	{
		name: 'world',
		path: '/',
		component: Home,
	},
	{
		name: 'about',
		path: '/about',
		component: About,
	},
	{
		name: 'manage',
		path: '/manage',
		component: Manage,
		meta: {
			requiresAuth: true,
		},
		// beforeEnter: (to, from, next) => {
		// 	next();
		// },
	},
	{
		name: 'my-feed',
		path: '/my-feed',
		component: CustomFeed,
		meta: {
			requiresAuth: true,
		},
	},
	{
		name: 'climate',
		path: '/climate',
		component: Climate,
	},
	{
		path: '/:catchAll(.*)*',
		redirect: { name: 'world' },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
	if (!to.matched.some((record) => record.meta.requiresAuth)) {
		next();
		return;
	}

	if (store.state.userLoggedIn) {
		next();
	} else {
		next({ name: 'world' });
	}
});

export default router;
