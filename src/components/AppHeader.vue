<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isAuthenticated)
const isDark = ref(false)

const navLinks = [
  {to: '/', label: 'خانه'},
  {to: '/about', label: 'درباره ما'},
  {to: '/contact', label: 'تماس با ما'},
  {to: '/products', label: 'کالاها'},
]

const handleLogout = async () => {
  await auth.logout()
  router.push({name: 'login'})
}

const applyTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
  applyTheme(isDark.value)
})

watch(isDark, applyTheme)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-bg)_82%,transparent)] backdrop-blur-xl">
    <div class="container-app px-4 py-4 flex items-center justify-between gap-4">
      <router-link to="/" class="flex items-center gap-3 group">
        <div
            class="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-violet-500/10 ring-1 ring-[var(--brand-border)] transition-transform group-hover:-translate-y-0.5"
            style="background: linear-gradient(135deg, var(--brand-accent), var(--brand-accent-2));"
        >
          <img
              class="w-full h-full object-cover"
              src="/src/assets/Stockio.png"
              alt="StockioLogo"
              @error="e => e.target.style.display='none'"
          >
        </div>
        <div class="hidden sm:block">
          <div class="font-black text-lg leading-tight text-(--brand-primary)">
            Stockio
          </div>
          <div class="text-xs font-medium tracking-wide text-muted">
            Warehouse Management
          </div>
        </div>
      </router-link>

      <nav class="hidden md:flex items-center gap-2 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)]/80 p-1 text-sm font-bold shadow-sm">
        <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-xl px-4 py-2 text-muted transition hover:bg-[var(--brand-surface-soft)] hover:text-[var(--brand-accent)]"
            active-class="!bg-[var(--brand-surface-soft)] !text-[var(--brand-accent)]"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="flex items-center gap-3">
        <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] text-lg transition hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            :aria-label="isDark ? 'فعال کردن حالت روشن' : 'فعال کردن حالت تاریک'"
            @click="toggleTheme"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <template v-if="isLoggedIn">
          <span class="hidden md:inline-block rounded-full bg-[var(--brand-surface-soft)] px-3 py-1 text-sm font-bold text-(--brand-primary)">
            {{ auth.user?.name || 'کاربر' }}
          </span>

          <button
              @click="handleLogout"
              class="rounded-xl border border-[var(--brand-border)] px-4 py-2 text-sm font-bold text-[var(--brand-danger)] transition hover:bg-[color-mix(in_srgb,var(--brand-danger)_12%,transparent)]"
          >
            خروج
          </button>
        </template>

        <template v-else>
          <router-link
              to="/login"
              class="btn-outline hidden px-5 py-2 text-sm font-bold sm:inline-flex"
          >
            ورود
          </router-link>

          <router-link
              to="/register"
              class="btn-primary inline-flex px-5 py-2 text-sm font-bold"
          >
            ثبت‌نام
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>
