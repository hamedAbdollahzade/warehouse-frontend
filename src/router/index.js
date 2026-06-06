import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from '../stores/auth'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Products from '../pages/Products.vue'
import Dashboard from '../pages/Dashboard.vue'
import Kardex from "../pages/Kardex.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {guest: true},
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {guest: true},
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        meta: {requiresAuth: true},
    },
    {
        path: "/products/:id/kardex",
        name: "product-kardex",
        component: Kardex,
        meta: {requiresAuth: true},
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth: true},
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()

    if (auth.token && !auth.user) {
        try {
            await auth.fetchUser()
        } catch (error) {
            // اگر توکن نامعتبر بود، fetchUser خودش پاکش می‌کند
        }
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return {name: 'login'}
    }

    if (to.meta.guest && auth.isAuthenticated) {
        return {name: 'products'}
    }
})

export default router
