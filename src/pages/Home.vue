<template>
  <section class="container-app px-4 py-12 md:py-20">
    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-5"
            style="background: rgba(6, 182, 212, 0.1); color: var(--brand-accent)"
        >
          <span>●</span>
          <span>نسخه فاز اول آماده توسعه</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-extrabold leading-normal text-(--brand-primary)">
          مدیریت انبار،
          <span class="text-(--brand-accent)">سریع‌تر</span>
          و دقیق‌تر با Stockio
        </h1>

        <p class="mt-5 text-slate-600 leading-8 text-lg">
          یک پنل ساده و حرفه‌ای برای ثبت کالاها، مشاهده موجودی، کنترل انبار و مدیریت عملیات روزانه.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <router-link to="/products" class="btn-primary">
            مشاهده کالاها
          </router-link>
          <router-link to="/register" class="btn-outline">
            شروع کنید
          </router-link>
        </div>

        <div class="mt-10 grid sm:grid-cols-3 gap-4">
          <FeatureCard title="سریع" desc="ثبت و جستجوی کالاها با چند کلیک ساده" icon="⚡" />
          <FeatureCard title="دقیق" desc="کنترل موجودی و تعداد کالاها با نظم بالا" icon="📦" />
          <FeatureCard title="مدرن" desc="رابط کاربری تمیز، سبک و قابل توسعه" icon="🧠" />
        </div>
      </div>

      <div class="card p-6 md:p-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-(--brand-primary)">نمای کلی انبار</h3>
            <p class="text-sm text-slate-500 mt-1">نمونه‌ای از وضعیت کالاها</p>
          </div>
          <div
              class="px-3 py-1 rounded-full text-sm text-white"
              style="background: var(--brand-success)"
          >
            فعال
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-2xl border border-(--brand-border) p-4 flex items-center justify-between">
            <div>
              <div class="font-semibold">لپ‌تاپ HP</div>
              <div class="text-sm text-slate-500 mt-1">SKU: HP-1001</div>
            </div>
            <div class="text-left">
              <div class="font-bold text-lg">25</div>
              <div class="text-xs text-slate-500">موجودی</div>
            </div>
          </div>

          <div class="rounded-2xl border border-(--brand-border) p-4 flex items-center justify-between">
            <div>
              <div class="font-semibold">ماوس بی‌سیم</div>
              <div class="text-sm text-slate-500 mt-1">SKU: MS-2004</div>
            </div>
            <div class="text-left">
              <div class="font-bold text-lg">140</div>
              <div class="text-xs text-slate-500">موجودی</div>
            </div>
          </div>

          <div class="rounded-2xl border border-(--brand-border) p-4 flex items-center justify-between">
            <div>
              <div class="font-semibold">کیبورد مکانیکی</div>
              <div class="text-sm text-slate-500 mt-1">SKU: KB-8890</div>
            </div>
            <div class="text-left">
              <div class="font-bold text-lg">65</div>
              <div class="text-xs text-slate-500">موجودی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from "../components/FeatureCard.vue";
</script>
