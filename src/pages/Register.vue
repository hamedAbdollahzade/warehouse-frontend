<template>
  <section class="container-app px-4 py-14">
    <div class="max-w-md mx-auto card p-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-(--brand-primary)">ثبت‌نام</h1>
        <p class="text-slate-500 mt-2">برای شروع، حساب کاربری خود را بسازید</p>
      </div>

      <form class="mt-8 space-y-4">
        <div>
          <label class="block mb-2 text-sm font-medium">نام کامل</label>
          <input type="text" class="input" placeholder="نام و نام خانوادگی"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">ایمیل</label>
          <input type="email" class="input" placeholder="example@email.com"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">رمز عبور</label>
          <input type="password" class="input" placeholder="********"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">تکرار رمز عبور</label>
          <input type="password" class="input" placeholder="********"/>
        </div>

        <button type="submit" class="btn-primary w-full">ایجاد حساب</button>
      </form>

      <p class="text-sm text-slate-500 mt-6 text-center">
        قبلاً ثبت‌نام کرده‌اید؟
        <router-link to="/login" class="text-(--brand-accent) font-semibold">
          وارد شوید
        </router-link>
      </p>
    </div>
  </section>
</template>
