<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {
  createProductRequest,
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
} from '../services/products'

const products = ref([])
const loading = ref(false)
const error = ref('')

const creating = ref(false)
const createError = ref('')
const fieldErrors = ref({})

const deletingId = ref(null)

const searchTerm = ref('')
const stockFilter = ref('all')

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
})

const form = reactive({
  sku: '',
  name: '',
  description: '',
  stock: 0,
  min_stock: 0,
})

const editOpen = ref(false)
const editId = ref(null)
const editing = ref(false)

const editError = ref('')
const editFieldErrors = ref({})

const editForm = reactive({
  sku: '',
  name: '',
  description: '',
  stock: 0,
  min_stock: 0,
})

const openEdit = (product) => {
  editId.value = product.id
  editForm.sku = product.sku || ''
  editForm.name = product.name || ''
  editForm.description = product.description || ''
  editForm.stock = Number(product.stock ?? 0)
  editForm.min_stock = Number(product.min_stock ?? 0)

  editError.value = ''
  editFieldErrors.value = {}
  editOpen.value = true
}

const closeEdit = () => {
  editOpen.value = false
  editId.value = null
  editError.value = ''
  editFieldErrors.value = {}
}

const submitEdit = async () => {
  if (!editId.value) return

  editing.value = true
  editError.value = ''
  editFieldErrors.value = {}

  try {
    await updateProductRequest(editId.value, {
      sku: editForm.sku,
      name: editForm.name,
      description: editForm.description,
      stock: Number(editForm.stock),
      min_stock: Number(editForm.min_stock),
    })

    closeEdit()
    await fetchProducts(pagination.value.current_page)
  } catch (err) {
    if (err.response?.status === 422) {
      editFieldErrors.value = err.response.data.errors || {}
      editError.value = err.response.data.message || 'خطای اعتبارسنجی'
    } else {
      editError.value = err.response?.data?.message || 'خطا در ویرایش محصول'
    }
  } finally {
    editing.value = false
  }
}


const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch =
        !searchTerm.value ||
        product.name?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesStockFilter =
        stockFilter.value === 'all' ||
        (stockFilter.value === 'low' &&
            Number(product.stock) <= Number(product.min_stock)) ||
        (stockFilter.value === 'ok' &&
            Number(product.stock) > Number(product.min_stock))

    return matchesSearch && matchesStockFilter
  })
})

const fetchProducts = async (page = 1) => {
  loading.value = true
  error.value = ''

  try {
    const {data} = await getProductsRequest({page})

    products.value = data.data
    pagination.value = {
      current_page: data.current_page,
      last_page: data.last_page,
      per_page: data.per_page,
      total: data.total,
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'خطا در دریافت محصولات'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.sku = ''
  form.name = ''
  form.description = ''
  form.stock = 0
  form.min_stock = 0
}

const submitCreate = async () => {
  creating.value = true
  createError.value = ''
  fieldErrors.value = {}

  try {
    await createProductRequest({
      sku: form.sku,
      name: form.name,
      description: form.description,
      stock: Number(form.stock),
      min_stock: Number(form.min_stock),
    })

    resetForm()
    await fetchProducts(1)
  } catch (err) {
    if (err.response?.status === 422) {
      fieldErrors.value = err.response.data.errors || {}
      createError.value = err.response.data.message || 'خطای اعتبارسنجی'
    } else {
      createError.value = err.response?.data?.message || 'خطا در ایجاد محصول'
    }
  } finally {
    creating.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('محصول حذف شود؟')) return

  deletingId.value = id
  try {
    await deleteProductRequest(id)
    await fetchProducts(pagination.value.current_page)
  } catch (err) {
    alert(err.response?.data?.message || 'خطا در حذف محصول')
  } finally {
    deletingId.value = null
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <section class="products-page container-app space-y-6 px-4 py-6">
    <!-- Header -->
    <header class="space-y-2">
      <h1 class="section-title">مدیریت محصولات</h1>
      <p class="section-subtitle">
        در این بخش می‌تونی محصولات انبار را ثبت، مشاهده، جستجو و حذف کنی.
      </p>
    </header>

    <!-- Create form -->
    <div class="card p-6">
      <div class="mb-5">
        <h2 class="text-xl font-extrabold text-[var(--brand-primary)]">
          افزودن محصول جدید
        </h2>
        <p class="mt-1 text-sm text-[var(--brand-muted)]">
          اطلاعات محصول را وارد کن تا به لیست انبار اضافه شود.
        </p>
      </div>

      <form
          class="grid grid-cols-1 gap-4 md:grid-cols-2"
          @submit.prevent="submitCreate"
      >
        <div>
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            SKU
          </label>
          <input
              v-model="form.sku"
              type="text"
              class="input"
              placeholder="مثلاً PRD-1001"
          />
          <p v-if="fieldErrors.sku" class="mt-2 text-sm text-[var(--brand-danger)]">
            {{ fieldErrors.sku[0] }}
          </p>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            نام محصول
          </label>
          <input
              v-model="form.name"
              type="text"
              class="input"
              placeholder="مثلاً ماوس بی‌سیم"
          />
          <p v-if="fieldErrors.name" class="mt-2 text-sm text-[var(--brand-danger)]">
            {{ fieldErrors.name[0] }}
          </p>
        </div>

        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            توضیحات
          </label>
          <textarea
              v-model="form.description"
              rows="4"
              class="input resize-none"
              placeholder="توضیح کوتاه درباره محصول..."
          />
          <p
              v-if="fieldErrors.description"
              class="mt-2 text-sm text-[var(--brand-danger)]"
          >
            {{ fieldErrors.description[0] }}
          </p>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            موجودی
          </label>
          <input
              v-model="form.stock"
              type="number"
              class="input"
              placeholder="0"
          />
          <p v-if="fieldErrors.stock" class="mt-2 text-sm text-[var(--brand-danger)]">
            {{ fieldErrors.stock[0] }}
          </p>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            حداقل موجودی
          </label>
          <input
              v-model="form.min_stock"
              type="number"
              class="input"
              placeholder="0"
          />
          <p
              v-if="fieldErrors.min_stock"
              class="mt-2 text-sm text-[var(--brand-danger)]"
          >
            {{ fieldErrors.min_stock[0] }}
          </p>
        </div>

        <div class="md:col-span-2 flex flex-col gap-3 pt-2">
          <p
              v-if="createError"
              class="status-danger rounded-xl border border-[color-mix(in_srgb,var(--brand-danger)_24%,transparent)] px-4 py-3 text-sm"
          >
            {{ createError }}
          </p>

          <div class="flex items-center gap-3">
            <button
                type="submit"
                class="btn-accent"
                :disabled="creating"
            >
              {{ creating ? 'در حال ثبت...' : 'ثبت محصول' }}
            </button>

            <button
                type="button"
                class="btn-outline"
                @click="resetForm"
            >
              پاک کردن فرم
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Filters -->
    <div class="card p-6">
      <div class="mb-4">
        <h2 class="text-lg font-extrabold text-[var(--brand-primary)]">
          جستجو و فیلتر
        </h2>
        <p class="mt-1 text-sm text-[var(--brand-muted)]">
          محصولات را بر اساس نام، SKU و وضعیت موجودی فیلتر کن.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            جستجو
          </label>
          <input
              v-model="searchTerm"
              type="text"
              class="input"
              placeholder="جستجو بر اساس نام یا SKU..."
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">
            فیلتر موجودی
          </label>
          <select v-model="stockFilter" class="input">
            <option value="all">همه محصولات</option>
            <option value="low">فقط کم‌موجودها</option>
            <option value="ok">فقط موجود</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="card p-6">
      <p class="text-sm text-[var(--brand-muted)]">در حال دریافت محصولات...</p>
    </div>

    <!-- Error -->
    <div
        v-else-if="error"
        class="card status-danger border border-[color-mix(in_srgb,var(--brand-danger)_24%,transparent)] p-6"
    >
      <p class="text-sm font-medium text-[var(--brand-danger)]">
        {{ error }}
      </p>
    </div>

    <!-- Empty state -->
    <div v-else-if="products.length === 0" class="card p-8 text-center">
      <div class="mx-auto max-w-md space-y-3">
        <h3 class="text-lg font-extrabold text-[var(--brand-primary)]">
          هنوز محصولی ثبت نشده
        </h3>
        <p class="text-sm leading-7 text-[var(--brand-muted)]">
          اولین محصول را از فرم بالا اضافه کن تا لیست انبارت جان بگیرد 🚀
        </p>
      </div>
    </div>

    <!-- No filtered result -->
    <div v-else-if="filteredProducts.length === 0" class="card p-8 text-center">
      <div class="mx-auto max-w-md space-y-3">
        <h3 class="text-lg font-extrabold text-[var(--brand-primary)]">
          نتیجه‌ای پیدا نشد
        </h3>
        <p class="text-sm leading-7 text-[var(--brand-muted)]">
          عبارت جستجو یا فیلتر انتخابی را تغییر بده.
        </p>
      </div>
    </div>

    <!-- Products table -->
    <div v-else class="card overflow-hidden">
      <div class="flex items-center justify-between border-b border-[var(--brand-border)] px-6 py-4">
        <div>
          <h2 class="text-lg font-extrabold text-[var(--brand-primary)]">
            لیست محصولات
          </h2>
          <p class="mt-1 text-sm text-[var(--brand-muted)]">
            نمایش {{ filteredProducts.length }} محصول از {{ pagination.total }} محصول
          </p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-[var(--brand-surface-soft)]">
          <tr class="text-right text-sm text-[var(--brand-muted)]">
            <th class="px-6 py-4 font-bold">شناسه</th>
            <th class="px-6 py-4 font-bold">SKU</th>
            <th class="px-6 py-4 font-bold">نام محصول</th>
            <th class="px-6 py-4 font-bold">موجودی</th>
            <th class="px-6 py-4 font-bold">حداقل موجودی</th>
            <th class="px-6 py-4 font-bold">وضعیت</th>
            <th class="px-6 py-4 font-bold">عملیات</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-t border-[var(--brand-border)] text-sm transition hover:bg-[var(--brand-surface-soft)]"
          >
            <td class="px-6 py-4 font-medium text-[var(--brand-primary)]">
              {{ product.id }}
            </td>

            <td class="px-6 py-4 font-mono text-[var(--brand-muted)]">
              {{ product.sku }}
            </td>

            <td class="px-6 py-4 font-semibold text-[var(--brand-primary)]">
              {{ product.name }}
            </td>

            <td class="px-6 py-4 text-[var(--brand-text)]">
              {{ product.stock }}
            </td>

            <td class="px-6 py-4 text-[var(--brand-text)]">
              {{ product.min_stock }}
            </td>

            <td class="px-6 py-4">
                <span
                    class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                    :class="
                    Number(product.stock) <= Number(product.min_stock)
                      ? 'status-warning'
                      : 'status-success'
                  "
                >
                  {{
                    Number(product.stock) <= Number(product.min_stock)
                        ? 'کم‌موجود'
                        : 'موجود'
                  }}
                </span>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <button
                    class="btn-outline px-4 py-2 text-sm font-semibold"
                    @click="openEdit(product)"
                >
                  ویرایش
                </button>

                <button
                    class="status-danger rounded-xl border border-[color-mix(in_srgb,var(--brand-danger)_24%,transparent)] px-4 py-2 text-sm font-semibold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="deletingId === product.id"
                    @click="handleDelete(product.id)"
                >
                  {{ deletingId === product.id ? 'در حال حذف...' : 'حذف' }}
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div
        v-if="pagination.last_page > 1"
        class="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
    >
      <p class="text-sm text-(--brand-muted)">
        صفحه {{ pagination.current_page }} از {{ pagination.last_page }}
      </p>

      <div class="flex items-center gap-2">
        <button
            class="btn-outline"
            :disabled="pagination.current_page === 1"
            @click="fetchProducts(pagination.current_page - 1)"
        >
          قبلی
        </button>

        <button
            class="btn-primary"
            :disabled="pagination.current_page === pagination.last_page"
            @click="fetchProducts(pagination.current_page + 1)"
        >
          بعدی
        </button>
      </div>
    </div>


    <!-- Edit Modal -->
    <div v-if="editOpen" class="modal-overlay" @click.self="closeEdit">
      <div class="modal card p-6">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 class="text-lg font-extrabold text-[var(--brand-primary)]">
              ویرایش محصول
            </h3>
            <p class="mt-1 text-sm text-[var(--brand-muted)]">
              اطلاعات محصول را ویرایش کن و ذخیره بزن.
            </p>
          </div>

          <button class="btn-outline px-3 py-2 text-sm" @click="closeEdit">
            بستن
          </button>
        </div>

        <form class="grid grid-cols-1 gap-4 md:grid-cols-2" @submit.prevent="submitEdit">
          <div>
            <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">SKU</label>
            <input v-model="editForm.sku" type="text" class="input"/>
            <p v-if="editFieldErrors.sku" class="mt-2 text-sm text-[var(--brand-danger)]">
              {{ editFieldErrors.sku[0] }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">نام</label>
            <input v-model="editForm.name" type="text" class="input"/>
            <p v-if="editFieldErrors.name" class="mt-2 text-sm text-[var(--brand-danger)]">
              {{ editFieldErrors.name[0] }}
            </p>
          </div>

          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">توضیحات</label>
            <textarea v-model="editForm.description" rows="4" class="input resize-none"/>
            <p v-if="editFieldErrors.description" class="mt-2 text-sm text-[var(--brand-danger)]">
              {{ editFieldErrors.description[0] }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">موجودی</label>
            <input v-model="editForm.stock" type="number" class="input"/>
            <p v-if="editFieldErrors.stock" class="mt-2 text-sm text-[var(--brand-danger)]">
              {{ editFieldErrors.stock[0] }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-bold text-[var(--brand-primary)]">حداقل موجودی</label>
            <input v-model="editForm.min_stock" type="number" class="input"/>
            <p v-if="editFieldErrors.min_stock" class="mt-2 text-sm text-[var(--brand-danger)]">
              {{ editFieldErrors.min_stock[0] }}
            </p>
          </div>

          <div class="md:col-span-2">
            <p
                v-if="editError"
                class="status-danger mb-3 rounded-xl border border-[color-mix(in_srgb,var(--brand-danger)_24%,transparent)] px-4 py-3 text-sm"
            >
              {{ editError }}
            </p>

            <div class="flex items-center justify-end gap-2">
              <button type="button" class="btn-outline" @click="closeEdit">
                انصراف
              </button>

              <button type="submit" class="btn-accent" :disabled="editing">
                {{ editing ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </section>
</template>


<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45); /* brand-primary با شفافیت */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 50;
}

.modal {
  width: 100%;
  max-width: 760px;
}
</style>
