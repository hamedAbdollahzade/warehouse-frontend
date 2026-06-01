<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-(--brand-border)">
    <div class="container-app px-4 py-4 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3">
        <div
            class="w-20 h-20  rounded-full flex items-center justify-center text-white font-bold"
            style="background: var(--brand-accent)"
        >
          <img class="rounded-full w-full h-full" src="/src/assets/Stockio.png" alt="StockioLogo">
        </div>
        <div>
          <div class="font-extrabold text-lg text-(--brand-primary)">Stockio</div>
          <div class="text-xs text-slate-500">Warehouse Management</div>
        </div>
      </router-link>

      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <router-link to="/" class="hover:text-(--brand-accent)">خانه</router-link>
        <router-link to="/about" class="hover:text-(--brand-accent)">درباره ما</router-link>
        <router-link to="/contact" class="hover:text-(--brand-accent)">تماس با ما</router-link>
        <router-link to="/products" class="hover:text-(--brand-accent)">کالاها</router-link>
      </nav>

      <div class="flex items-center gap-3">
        <router-link to="/login" class="btn-outline hidden sm:inline-block">ورود</router-link>
        <router-link to="/register" class="btn-primary">ثبت‌نام</router-link>
      </div>
    </div>
  </header>
</template>
