import { createRouter, createWebHistory } from "vue-router";

// Define routes
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./components/Products.vue"),
    },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
