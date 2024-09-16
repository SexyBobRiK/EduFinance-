import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useTokenStore } from "../store/store";
import Management from "../components/Management.vue";

// Middleware for authenticated routes
const AuthenticatedMiddleware = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext) => {
    const tokenStore = useTokenStore();
    if (tokenStore.token) {
        next();
    } else {
        next('/');
    }
};

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "SignIn",
        component: () => import("../components/SignIn.vue"),
    },
    {
        path: "/registration",
        name: "Reg",
        component: () => import("../components/Regis.vue"),
    },
    {
        path: "/graphs",
        name: "graphs",
        component: () => import("../components/Chart.vue"),
        beforeEnter: AuthenticatedMiddleware,
    },
    {
        path: "/management",
        name: "Management",
        component: () => import("../components/Management.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
