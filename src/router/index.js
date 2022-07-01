import {
	createRouter,
	createWebHistory,
} from "vue-router";

import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";
import Register from "../views/Register.vue";
import SignIn from "../views/SignIn.vue";

import store from "../store";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/feed",
			component: Feed,
		},
		{
			path: "/register",
			component: Register,
		},
		{
			path: "/signin",
			component: SignIn,
		},
	],
});

export default router;