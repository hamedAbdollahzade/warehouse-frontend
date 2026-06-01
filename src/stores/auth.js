import {defineStore} from 'pinia'
import {
    loginRequest,
    registerRequest,
    logoutRequest,
    getUserRequest,
} from '../services/auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async register(payload) {
            this.loading = true
            this.error = null

            try {
                const {data} = await registerRequest(payload)
                this.token = data.token
                this.user = data.user
                localStorage.setItem('token', data.token)
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(payload) {
            this.loading = true
            this.error = null

            try {
                const {data} = await loginRequest(payload)
                this.token = data.token
                this.user = data.user
                localStorage.setItem('token', data.token)
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchUser() {
            if (!this.token) return null

            try {
                const {data} = await getUserRequest()
                this.user = data
                return data
            } catch (error) {
                this.user = null
                this.token = null
                localStorage.removeItem('token')
                throw error
            }
        },

        async logout() {
            try {
                if (this.token) {
                    await logoutRequest()
                }
            } catch (error) {
                // حتی اگر API خطا داد هم ما کاربر را لوکال logout می‌کنیم
            } finally {
                this.user = null
                this.token = null
                localStorage.removeItem('token')
            }
        },
    },
})
