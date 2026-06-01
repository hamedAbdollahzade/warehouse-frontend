<template>
  <section class="container-app px-4 py-14">
    <div class="max-w-md mx-auto card p-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-(--brand-primary)">ثبت‌نام</h1>
        <p class="text-slate-500 mt-2">برای شروع، حساب کاربری خود را بسازید</p>
      </div>

      <form @submit.prevent="submit" class="mt-8 space-y-4">
        <div>
          <label class="block mb-2 text-sm font-medium">نام کامل</label>
          <input v-model="form.name" type="text" class="input" placeholder="نام و نام خانوادگی"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">ایمیل</label>
          <input v-model="form.email" type="email" class="input" placeholder="example@email.com"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">رمز عبور</label>
          <input v-model="form.password" type="password" class="input" placeholder="********"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium">تکرار رمز عبور</label>
          <input v-model="form.password_confirmation" type="password" class="input" placeholder="********"/>
        </div>

        <p v-if="auth.error" class="text-sm text-red-600">
          {{ auth.error }}
        </p>


        <button
            type="submit"
            class="btn-primary w-full"
            :disabled="auth.loading"
        >
          {{ auth.loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
        </button>
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

<script setup>
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const submit = async () => {
  try {
    await auth.register(form)
    router.push({name: 'products'})
  } catch (e) {
    // auth.error در store ست می‌شود
  }
}
</script>
