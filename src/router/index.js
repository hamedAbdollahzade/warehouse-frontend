import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Products from "../pages/Products.vue";

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/about", name: "about", component: About },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/products", name: "products", component: Products },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
