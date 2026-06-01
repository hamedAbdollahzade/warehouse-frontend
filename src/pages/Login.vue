<template>
  <section class="container-app px-4 py-14">
    <div class="max-w-md mx-auto card p-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-(--brand-primary)">ورود</h1>
        <p class="text-slate-500 mt-2">برای دسترسی به پنل خود وارد شوید</p>
      </div>

      <form class="mt-8 space-y-4">
        <div>
          <label class="block mb-2 text-sm font-medium">ایمیل</label>
          <input type="email" class="input" placeholder="example@email.com" />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">رمز عبور</label>
          <input type="password" class="input" placeholder="********" />
        </div>

        <button type="submit" class="btn-primary w-full">ورود</button>
      </form>

      <p class="text-sm text-slate-500 mt-6 text-center">
        حساب ندارید؟
        <router-link to="/register" class="text-(--brand-accent) font-semibold">
          ثبت‌نام کنید
        </router-link>
      </p>
    </div>
  </section>
</template>
