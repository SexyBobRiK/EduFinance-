import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
{
    path: "/",
    name: "SignIn",
    component: () => import("../components/SignIn.vue")
},
{
    path: "/registration",
    name: "Reg",
    component: () => import("../components/Regis.vue")
},
{
    path: "/home",
    name: "home",
    component: () => import("../components/Home.vue")
}
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router