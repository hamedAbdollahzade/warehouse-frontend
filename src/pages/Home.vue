<template>
  <!-- اگر لاگین باشد -->
  <Dashboard v-if="isLoggedIn" />
  <section v-else class="relative overflow-hidden">
    <div class="absolute inset-x-0 top-0 -z-10 h-[620px]" style="background: var(--hero-gradient)"></div>
    <div class="absolute right-0 top-32 -z-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--brand-accent)_22%,transparent)] blur-3xl"></div>
    <div class="absolute left-10 top-20 -z-10 h-56 w-56 rounded-full bg-[color-mix(in_srgb,var(--brand-accent-2)_20%,transparent)] blur-3xl"></div>

    <div class="container-app px-4 py-12 md:py-20">
      <div class="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div class="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-(--brand-accent)">
            <span class="h-2 w-2 rounded-full bg-(--brand-success)"></span>
            <span>سیستم مدیریت انبار هوشمند برای تیم‌های در حال رشد</span>
          </div>

          <h1 class="mt-6 max-w-3xl text-4xl font-black leading-[1.45] text-(--brand-primary) md:text-6xl">
            انبارت رو با
            <span class="relative inline-block text-gradient">
              Stockio
              <span class="absolute -bottom-1 right-0 h-3 w-full -z-10 rounded-full bg-[color-mix(in_srgb,var(--brand-accent)_18%,transparent)]"></span>
            </span>
            دقیق، سریع و قابل کنترل مدیریت کن
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-9 text-muted">
            موجودی کالا، عملیات ورود و خروج، وضعیت کمبودها و گزارش‌های روزانه را در یک داشبورد تمیز و قابل توسعه ببینید؛ بدون پیچیدگی اضافه.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <router-link to="/products" class="btn-primary inline-flex items-center gap-2 px-6 py-3 font-bold shadow-lg shadow-slate-900/10">
              مشاهده کالاها
              <span aria-hidden="true">←</span>
            </router-link>
            <router-link to="/register" class="btn-outline inline-flex items-center gap-2 px-6 py-3 font-bold">
              شروع رایگان
            </router-link>
          </div>

          <div class="glass-panel mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-3xl">
            <div
                v-for="stat in stats"
                :key="stat.label"
                class="border-l border-[var(--brand-border)] p-4 last:border-l-0 sm:p-5"
            >
              <div class="text-2xl font-black text-(--brand-primary) md:text-3xl">{{ stat.value }}</div>
              <div class="mt-1 text-xs leading-6 text-muted sm:text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-accent)_30%,transparent),color-mix(in_srgb,var(--brand-accent-2)_22%,transparent))] blur-2xl"></div>
          <div class="card overflow-hidden rounded-[2rem]">
            <div class="flex items-center justify-between border-b border-[var(--brand-border)] px-6 py-5">
              <div>
                <h2 class="text-xl font-black text-(--brand-primary)">داشبورد امروز</h2>
                <p class="mt-1 text-sm text-muted">نمای سریع وضعیت انبار مرکزی</p>
              </div>
              <div class="status-success rounded-full px-3 py-1 text-sm font-bold">
                پایدار
              </div>
            </div>

            <div class="grid gap-4 p-5 sm:grid-cols-2">
              <div class="rounded-3xl bg-[linear-gradient(135deg,var(--brand-primary),#312E81)] p-5 text-white">
                <div class="text-sm text-white/70">ارزش موجودی</div>
                <div class="mt-3 text-3xl font-black">۸۴۰M</div>
                <div class="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                  <div class="h-full w-3/4 rounded-full bg-[var(--brand-accent-2)]"></div>
                </div>
                <p class="mt-3 text-xs leading-6 text-white/70">۷۵٪ ظرفیت انبار استفاده شده است</p>
              </div>

              <div class="space-y-3">
                <div
                    v-for="metric in metrics"
                    :key="metric.title"
                    class="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface-soft)] p-4"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted">{{ metric.title }}</span>
                    <span class="rounded-full px-2 py-1 text-xs font-bold" :class="metric.badgeClass">{{ metric.badge }}</span>
                  </div>
                  <div class="mt-2 text-2xl font-black text-(--brand-primary)">{{ metric.value }}</div>
                </div>
              </div>
            </div>

            <div class="px-5 pb-5">
              <div class="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="font-extrabold text-(--brand-primary)">کالاهای نیازمند توجه</h3>
                  <router-link to="/products" class="text-sm font-bold text-(--brand-accent)">مدیریت</router-link>
                </div>

                <div class="space-y-3">
                  <div
                      v-for="item in inventoryAlerts"
                      :key="item.sku"
                      class="flex items-center justify-between rounded-2xl bg-[var(--brand-surface-soft)] px-4 py-3"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-surface)] text-xl shadow-sm">
                        {{ item.icon }}
                      </div>
                      <div>
                        <div class="font-bold text-(--brand-primary)">{{ item.name }}</div>
                        <div class="mt-1 text-xs text-muted">SKU: {{ item.sku }}</div>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="font-black text-(--brand-primary)">{{ item.stock }}</div>
                      <div class="text-xs" :class="item.statusClass">{{ item.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 grid gap-5 md:grid-cols-3">
        <FeatureCard title="کنترل موجودی" desc="حداقل موجودی، هشدار کمبود و وضعیت کالاها را سریع‌تر دنبال کنید." icon="📦" />
        <FeatureCard title="عملیات روان" desc="ثبت ورود و خروج کالا برای تیم انبار ساده، منظم و قابل پیگیری می‌شود." icon="⚡" />
        <FeatureCard title="گزارش‌های شفاف" desc="تصمیم‌های روزانه را با آمار دقیق و نمای کلی قابل فهم بگیرید." icon="📊" />
      </div>

      <div class="card mt-16 grid gap-6 rounded-[2rem] p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
        <div>
          <p class="text-sm font-bold text-(--brand-accent)">فرآیند پیشنهادی</p>
          <h2 class="mt-3 text-3xl font-black leading-normal text-(--brand-primary)">از ثبت کالا تا گزارش‌گیری در سه قدم</h2>
          <p class="mt-4 leading-8 text-muted">
            Stockio برای شروع سریع طراحی شده؛ اول کالاها را ثبت کنید، سپس موجودی را کنترل کنید و در نهایت تصمیم‌های بهتر بگیرید.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="rounded-3xl bg-[var(--brand-surface-soft)] p-5"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-accent),var(--brand-accent-2))] text-sm font-black text-white">
              {{ index + 1 }}
            </div>
            <h3 class="mt-5 font-black text-(--brand-primary)">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-7 text-muted">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {computed} from "vue"
import {storeToRefs} from "pinia"
import {useAuthStore} from "../stores/auth"

import Dashboard from "./Dashboard.vue"
import FeatureCard from "../components/FeatureCard.vue"

const authStore = useAuthStore()
const {user} = storeToRefs(authStore)

const isLoggedIn = computed(() => !!user.value)

const stats = [
  { value: "۱,۲۴۰", label: "کالای ثبت‌شده" },
  { value: "۹۸٪", label: "دقت موجودی" },
  { value: "۳۲", label: "هشدار فعال" },
];

const metrics = [
  {
    title: "ورودی امروز",
    value: "۱۲۸",
    badge: "+۱۸٪",
    badgeClass: "status-success",
  },
  {
    title: "خروجی امروز",
    value: "۹۶",
    badge: "عادی",
    badgeClass: "bg-[color-mix(in_srgb,var(--brand-accent-2)_14%,transparent)] text-[var(--brand-accent-2)]",
  },
];

const inventoryAlerts = [
  {
    name: "لپ‌تاپ HP",
    sku: "HP-1001",
    stock: "۲۵",
    status: "موجود",
    icon: "💻",
    statusClass: "text-[var(--brand-success)]",
  },
  {
    name: "ماوس بی‌سیم",
    sku: "MS-2004",
    stock: "۸",
    status: "کمبود",
    icon: "🖱️",
    statusClass: "text-[var(--brand-warning)]",
  },
  {
    name: "کیبورد مکانیکی",
    sku: "KB-8890",
    stock: "۰",
    status: "ناموجود",
    icon: "⌨️",
    statusClass: "text-[var(--brand-danger)]",
  },
];

const steps = [
  { title: "ثبت کالا", desc: "اطلاعات پایه، SKU و تعداد اولیه کالا را وارد کنید." },
  { title: "کنترل موجودی", desc: "ورود، خروج و هشدارهای کمبود را در لحظه ببینید." },
  { title: "تصمیم‌گیری", desc: "با نمای کلی داشبورد، خرید و توزیع را دقیق‌تر برنامه‌ریزی کنید." },
];
</script>
