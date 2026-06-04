<template>
  <section class="container-app px-4 py-14">
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h1 class="section-title">تماس با ما</h1>
        <p class="section-subtitle mt-4">
          اگر سوالی درباره سیستم مدیریت انبار Stockio دارید یا نیاز به همکاری و توسعه بیشتر دارید،
          از طریق فرم روبه‌رو با ما در ارتباط باشید.
        </p>

        <div class="card p-6 mt-8 space-y-4">
          <div>
            <div class="font-semibold text-(--brand-primary)">ایمیل</div>
            <div class="text-muted mt-1">support@stockio.app</div>
          </div>
          <div>
            <div class="font-semibold text-(--brand-primary)">شماره تماس</div>
            <div class="text-muted mt-1">021-00000000</div>
          </div>
          <div>
            <div class="font-semibold text-(--brand-primary)">آدرس</div>
            <div class="text-muted mt-1">تهران، ایران</div>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="text-xl font-bold text-(--brand-primary)">فرم تماس</h2>
        <form class="mt-6 space-y-4">
          <div>
            <label class="block mb-2 text-sm font-medium">نام</label>
            <input type="text" class="input" placeholder="نام شما" />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium">ایمیل</label>
            <input type="email" class="input" placeholder="example@email.com" />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium">پیام</label>
            <textarea class="input min-h-35" placeholder="پیام خود را بنویسید"></textarea>
          </div>

          <button type="submit" class="btn-primary w-full">ارسال پیام</button>
        </form>
      </div>
    </div>
  </section>
</template>
