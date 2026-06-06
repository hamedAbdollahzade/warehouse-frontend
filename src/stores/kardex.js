import {defineStore} from "pinia"
import api from "../services/api.js";


export const useKardexStore = defineStore("kardex", {

    state: () => ({
        rows: [],
        loading: false
    }),

    actions: {

        async fetchKardex(productId) {

            this.loading = true

            const res = await api.get(`/products/${productId}/kardex`)

            this.rows = res.data

            this.loading = false
        }

    }

})
