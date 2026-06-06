import {defineStore} from 'pinia';
import dashboardService from "../services/dashboardService.js";

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        summary: null,
        loading: false,
    }),
    actions: {
        async fetchSummary() {
            this.loading = true;
            try {
                const response = await dashboardService.getSummary();
                this.summary = response.data;
            } catch (error) {
                console.error("Error fetching dashboard summary:", error);
            } finally {
                this.loading = false;
            }
        }
    }
});
