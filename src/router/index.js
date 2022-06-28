import {
	createRouter,
	createWebHistory,
} from "vue-router";

import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";
import Register from "../views/Register.vue";
import SignIn from "../views/SignIn.vue";

import { useStore } from "vuex";

const store = useStore();
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

// router.beforeEach((to, from, next) => {
// 	if(store.getters.user != null) {
// 		next();
// 	} else {
// 		next("/signin");
// 	}
// });

export default router;