<template>
  <section class="container-app px-4 py-14">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 class="section-title">لیست کالاها</h1>
        <p class="section-subtitle mt-2">
          کالاهای انبار را مشاهده، اضافه و مدیریت کنید.
        </p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div class="card p-6">
          <h2 class="text-xl font-bold text-(--brand-primary)">افزودن کالا</h2>

          <form class="mt-6 space-y-4" @submit.prevent="addProduct">
            <div>
              <label class="block mb-2 text-sm font-medium">نام کالا</label>
              <input v-model="form.name" type="text" class="input" placeholder="مثلاً لپ‌تاپ Dell"/>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">کد SKU</label>
              <input v-model="form.sku" type="text" class="input" placeholder="مثلاً DL-2025"/>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">تعداد</label>
              <input v-model.number="form.quantity" type="number" class="input" placeholder="مثلاً 50"/>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">مکان</label>
              <input v-model="form.location" type="text" class="input" placeholder="مثلاً قفسه A3"/>
            </div>

            <button type="submit" class="btn-primary w-full">افزودن به انبار</button>
          </form>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="card overflow-hidden">
          <div class="p-5 border-b border-(--brand-border) flex items-center justify-between">
            <h2 class="font-bold text-lg text-(--brand-primary)">جدول کالاها</h2>
            <span class="text-sm text-slate-500">{{ products.length }} کالا</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-slate-50">
              <tr class="text-right">
                <th class="p-4 font-bold">نام کالا</th>
                <th class="p-4 font-bold">SKU</th>
                <th class="p-4 font-bold">تعداد</th>
                <th class="p-4 font-bold">مکان</th>
                <th class="p-4 font-bold">عملیات</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="product in products"
                  :key="product.id"
                  class="border-t border-(--brand-border)"
              >
                <td class="p-4 font-medium">{{ product.name }}</td>
                <td class="p-4">{{ product.sku }}</td>
                <td class="p-4">
                    <span
                        class="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        :style="{
                        background:
                          product.quantity > 20
                            ? 'var(--brand-success)'
                            : 'var(--brand-warning)'
                      }"
                    >
                      {{ product.quantity }}
                    </span>
                </td>
                <td class="p-4">{{ product.location }}</td>
                <td class="p-4">
                  <button
                      @click="removeProduct(product.id)"
                      class="px-3 py-2 rounded-lg text-white"
                      style="background: var(--brand-danger)"
                  >
                    حذف
                  </button>
                </td>
              </tr>

              <tr v-if="products.length === 0">
                <td colspan="5" class="text-center p-8 text-slate-500">
                  هنوز کالایی ثبت نشده است.
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {reactive, ref} from "vue";

const products = ref([
  {
    id: 1,
    name: "لپ‌تاپ HP",
    sku: "HP-1001",
    quantity: 25,
    location: "قفسه A1",
  },
  {
    id: 2,
    name: "ماوس بی‌سیم",
    sku: "MS-2004",
    quantity: 140,
    location: "قفسه B2",
  },
  {
    id: 3,
    name: "کیبورد مکانیکی",
    sku: "KB-8890",
    quantity: 18,
    location: "قفسه C4",
  },
]);

const form = reactive({
  name: "",
  sku: "",
  quantity: null,
  location: "",
});

const addProduct = () => {
  if (!form.name || !form.sku || !form.quantity || !form.location) return;

  products.value.unshift({
    id: Date.now(),
    name: form.name,
    sku: form.sku,
    quantity: form.quantity,
    location: form.location,
  });

  form.name = "";
  form.sku = "";
  form.quantity = null;
  form.location = "";
};

const removeProduct = (id) => {
  products.value = products.value.filter((product) => product.id !== id);
};
</script>
