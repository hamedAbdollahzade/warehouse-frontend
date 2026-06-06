<script setup>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useDashboardStore} from "../stores/dashboard.js";

const dashboardStore = useDashboardStore();
const {summary, loading} = storeToRefs(dashboardStore);

onMounted(() => {
  dashboardStore.fetchSummary();
});
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <header class="mb-10">
      <h1 class="section-title mb-2">داشبورد انبار</h1>
      <p class="section-subtitle">خلاصه وضعیت موجودی کالاها و انبار در یک نگاه</p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2" style="border-color: var(--brand-accent)"></div>
    </div>

    <!-- Dashboard Cards -->
    <div v-else-if="summary" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Total Products -->
      <div class="card p-6 flex flex-col justify-between">
        <div>
          <span class="text-muted text-sm font-medium uppercase tracking-wider">کل محصولات</span>
          <div class="text-3xl font-black mt-2" style="color: var(--brand-primary)">
            {{ summary.total_products }}
          </div>
        </div>
        <div class="mt-4 text-xs font-bold px-3 py-1 rounded-full w-fit theme-soft">
          تنوع کالا
        </div>
      </div>

      <!-- Total Stock -->
      <div class="card p-6 flex flex-col justify-between border-r-4" style="border-right-color: var(--brand-accent-2)">
        <div>
          <span class="text-muted text-sm font-medium uppercase tracking-wider">موجودی کل</span>
          <div class="text-3xl font-black mt-2 text-gradient">
            {{ summary.total_stock }}
          </div>
        </div>
        <div class="mt-4 text-xs font-bold px-3 py-1 rounded-full w-fit status-success">
          تعداد واحد
        </div>
      </div>

      <!-- Low Stock -->
      <div class="card p-6 flex flex-col justify-between border-r-4" style="border-right-color: var(--brand-warning)">
        <div>
          <span class="text-muted text-sm font-medium uppercase tracking-wider">رو به اتمام</span>
          <div class="text-3xl font-black mt-2" style="color: var(--brand-warning)">
            {{ summary.low_stock }}
          </div>
        </div>
        <div class="mt-4 text-xs font-bold px-3 py-1 rounded-full w-fit status-warning">
          نیاز به شارژ
        </div>
      </div>

      <!-- Out of Stock -->
      <div class="card p-6 flex flex-col justify-between border-r-4" style="border-right-color: var(--brand-danger)">
        <div>
          <span class="text-muted text-sm font-medium uppercase tracking-wider">ناموجود</span>
          <div class="text-3xl font-black mt-2" style="color: var(--brand-danger)">
            {{ summary.out_of_stock }}
          </div>
        </div>
        <div class="mt-4 text-xs font-bold px-3 py-1 rounded-full w-fit status-danger">
          توقف فروش
        </div>
      </div>

    </div>

    <!-- Placeholder for future Charts -->
    <div class="mt-8 grid grid-cols-1 gap-6">
      <div class="card p-8 glass-panel flex items-center justify-center border-dashed border-2">
        <span class="text-muted italic">نمودار تراکنش‌های اخیر (بزودی در مرحله بعد)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* استفاده از استایل‌های پایه ای که خودت تعریف کردی */
</style>
