import {createRouter, createWebHistory} from "@ionic/vue-router";
import {RouteRecordRaw} from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import TestPage from "../views/TestPage.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/tabs/home",
	},
	{
		path: "/tabs/",
		component: TabsPage,
		children: [
			{
				path: "",
				redirect: "/tabs/home",
			},
			{
				path: "home",
				component: () => import("@/views/TabHomepage.vue"),
			},
			{
				path: "navigate",
				component: () => import("@/views/TabNavigate.vue"),
			},
			{
				path: "search",
				component: () => import("@/views/TabAssets.vue"),
			},
		],
	},
	{
		path: "/test/",
		component: TestPage,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const url = to.fullPath;
	const existingState = history.state || {};
	history.replaceState({...existingState}, "", url);
	next();
});

export default router;
