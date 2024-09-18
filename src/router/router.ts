import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useTokenStore } from "../store/store";


// Middleware for authenticated routes
const AuthenticatedMiddleware = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext) => {
    const token = localStorage.getItem('authToken') != null ? true : false;
    if (token) {   
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
        beforeEnter: AuthenticatedMiddleware,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
