<script setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isAuthenticated)

const handleLogout = async () => {
  await auth.logout()
  router.push({name: 'login'})
}
</script>

<template>
  <!-- هدر چسبنده با پس‌زمینه نیمه‌شفاف و افکت بلور -->
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--brand-border)]">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">

      <!-- بخش لوگو و برند (سمت راست) -->
      <router-link to="/" class="flex items-center gap-3 group">
        <div
            class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow"
            style="background-color: var(--brand-accent);"
        >
          <!-- اگر عکس لود نشد، یک متن جایگزین نمایش داده شود -->
          <img
              class="w-full h-full object-cover rounded-full"
              src="/src/assets/Stockio.png"
              alt="StockioLogo"
              @error="e => e.target.style.display='none'"
          >

        </div>
        <div class="hidden sm:block">
          <div class="font-extrabold text-lg leading-tight" style="color: var(--brand-primary);">
            Stockio
          </div>
          <div class="text-xs font-medium tracking-wide" style="color: var(--brand-muted);">
            Warehouse Management
          </div>
        </div>
      </router-link>

      <!-- منوی ناوبری (وسط صفحه) -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <router-link
            to="/"
            class="hover:text-(--brand-accent) transition-colors duration-200"
            active-class="text-[var(--brand-accent)]"
        >
          خانه
        </router-link>
        <router-link
            to="/about"
            class="hover:text-(--brand-accent) transition-colors duration-200"
        >
          درباره ما
        </router-link>
        <router-link
            to="/contact"
            class="hover:text-(--brand-accent) transition-colors duration-200"
        >
          تماس با ما
        </router-link>
        <router-link
            to="/products"
            class="hover:text-(--brand-accent) transition-colors duration-200"
        >
          کالاها
        </router-link>
      </nav>

      <!-- بخش احراز هویت (سمت چپ) -->
      <div class="flex items-center gap-3">
        <template v-if="isLoggedIn">
          <!-- نمایش نام کاربر در دسکتاپ -->
          <span class="hidden md:inline-block text-sm font-medium px-3 py-1 rounded-full"
                style="background-color: var(--brand-bg); color: var(--brand-primary);">
            {{ auth.user?.name || 'کاربر' }}
          </span>

          <!-- دکمه خروج -->
          <button
              @click="handleLogout"
              class="text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              style="color: var(--brand-danger); border: 1px solid var(--brand-border);"
              onmouseover="this.style.backgroundColor='var(--brand-danger)'; this.style.color='white';"
              onmouseout="this.style.backgroundColor='transparent'; this.style.color='var(--brand-danger)';"
          >
            خروج
          </button>
        </template>

        <template v-else>
          <!-- دکمه ورود (Outline) -->
          <router-link
              to="/login"
              class="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style="color: var(--brand-primary); border: 1px solid var(--brand-border);"
              onmouseover="this.style.borderColor='var(--brand-primary)'; this.style.color='var(--brand-primary)';"
              onmouseout="this.style.borderColor='var(--brand-border)';"
          >
            ورود
          </router-link>

          <!-- دکمه ثبت‌نام (Primary) -->
          <router-link
              to="/register"
              class="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
              style="background-color: var(--brand-accent);"
              onmouseover="this.style.opacity='0.9';"
              onmouseout="this.style.opacity='1';"
          >
            ثبت‌نام
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>