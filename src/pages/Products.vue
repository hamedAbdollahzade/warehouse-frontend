<script setup>
import {ref, reactive, computed, onMounted, watch} from 'vue'
import {
  getProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest
} from '../services/products'
import {createStockMovementRequest} from '../services/stockMovements'
import {useRouter} from "vue-router";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Scale,
  Pencil,
  Trash2,
  BarChart3
} from "lucide-vue-next"

const router = useRouter()

const movementBadgeClass = () => {
  if (movementType.value === 'IN')
    return 'bg-green-100 text-green-700'

  if (movementType.value === 'OUT')
    return 'bg-red-100 text-red-700'

  return 'bg-yellow-100 text-yellow-700'
}

const movementBadgeText = () => {
  if (movementType.value === 'IN') return 'ورود کالا'
  if (movementType.value === 'OUT') return 'خروج کالا'
  return 'اصلاح موجودی'
}


/* ===========================
   STATE
=========================== */

const products = ref([])
const loading = ref(false)
const error = ref('')

const selectedIds = ref([])
const deletingBulk = ref(false)

const searchTerm = ref('')
const debouncedSearch = ref('')
const stockFilter = ref('all')

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
})

/* ===========================
   MODALS
=========================== */

const createModal = ref(false)
const editModal = ref(false)
const movementModal = ref(false)

const selectedProduct = ref(null)
const movementType = ref('')

/* ===========================
   FORMS
=========================== */

const createForm = reactive({
  name: '',
  sku: '',
  min_stock: 0
})

const editForm = reactive({
  id: null,
  name: '',
  sku: '',
  min_stock: 0
})

const movementForm = reactive({
  quantity: 1,
  note: ''
})

/* ===========================
   DEBOUNCE SEARCH
=========================== */

let timeout
watch(searchTerm, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    debouncedSearch.value = val
  }, 300)
})

watch(debouncedSearch, () => fetchProducts(1))

/* ===========================
   FETCH
=========================== */

const fetchProducts = async (page = 1) => {
  loading.value = true
  try {
    const {data} = await getProductsRequest({
      page,
      search: debouncedSearch.value,
    })

    products.value = data.data
    pagination.value = data
  } finally {
    loading.value = false
  }
}

/* ===========================
   FILTER
=========================== */

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const stock = Number(p.current_stock)

    if (stockFilter.value === 'out') return stock === 0
    if (stockFilter.value === 'low') return stock > 0 && stock <= p.min_stock
    if (stockFilter.value === 'ok') return stock > p.min_stock

    return true
  })
})

/* ===========================
   CRUD
=========================== */

const createProduct = async () => {
  await createProductRequest(createForm)
  createModal.value = false
  Object.assign(createForm, {name: '', sku: '', min_stock: 0})
  await fetchProducts()
}

const openEdit = (product) => {
  Object.assign(editForm, product)
  editModal.value = true
}

const updateProduct = async () => {
  await updateProductRequest(editForm.id, editForm)
  editModal.value = false
  await fetchProducts()
}

const deleteProduct = async (id) => {
  if (!confirm('حذف شود؟')) return
  await deleteProductRequest(id)
  await fetchProducts()
}

/* ===========================
   BULK DELETE
=========================== */

const bulkDelete = async () => {
  if (!selectedIds.value.length) return
  if (!confirm('حذف گروهی انجام شود؟')) return

  deletingBulk.value = true

  for (const id of selectedIds.value) {
    await deleteProductRequest(id)
  }

  selectedIds.value = []
  deletingBulk.value = false
  await fetchProducts()
}

/* ===========================
   STOCK MOVEMENT
=========================== */

const openMovement = (product, type) => {
  selectedProduct.value = product
  movementType.value = type
  movementModal.value = true
}

const submitMovement = async () => {
  await createStockMovementRequest({
    product_id: selectedProduct.value.id,
    type: movementType.value,
    quantity: movementForm.quantity,
    note: movementForm.note
  })

  movementModal.value = false
  movementForm.quantity = 1
  movementForm.note = ''

  await fetchProducts()
}

/* ===========================
   CSV EXPORT
=========================== */

const exportCSV = () => {
  const headers = ['ID', 'SKU', 'Name', 'Stock']
  const rows = filteredProducts.value.map(p => [
    p.id,
    p.sku,
    p.name,
    p.current_stock
  ])

  const csv = [headers, ...rows]
      .map(e => e.join(','))
      .join('\n')

  const blob = new Blob([csv], {type: 'text/csv'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'products.csv'
  a.click()
}

/* ===========================
   STOCK STATUS
=========================== */

const stockStatusClass = (p) => {
  const stock = Number(p.current_stock)
  if (stock === 0) return 'status-danger'
  if (stock <= p.min_stock) return 'status-warning'
  return 'status-success'
}

const stockStatusText = (p) => {
  const stock = Number(p.current_stock)
  if (stock === 0) return 'ناموجود'
  if (stock <= p.min_stock) return 'کم‌موجود'
  return 'موجود'
}

onMounted(fetchProducts)
</script>

<template>
  <section class="container-app px-4 py-6 space-y-6">

    <div class="flex justify-between items-center">
      <h1 class="section-title">مدیریت محصولات</h1>

      <button class="btn-primary" @click="createModal=true">
        ➕ افزودن محصول
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-4 flex gap-4 flex-wrap">

      <input
          v-model="searchTerm"
          class="input max-w-sm"
          placeholder="جستجو..."
      />

      <select v-model="stockFilter" class="input max-w-xs">
        <option value="all">همه</option>
        <option value="out">ناموجود</option>
        <option value="low">کم موجود</option>
        <option value="ok">موجود</option>
      </select>

      <button class="btn-outline" @click="exportCSV">
        خروجی CSV
      </button>

      <button
          class="status-danger px-4 py-2 rounded-xl text-sm font-semibold"
          :disabled="!selectedIds.length"
          @click="bulkDelete"
      >
        حذف گروهی
      </button>

    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-[var(--brand-surface-soft)]">
        <tr>
          <th class="px-3 py-2">
            <input
                type="checkbox"
                @change="selectedIds = $event.target.checked ? filteredProducts.map(p=>p.id) : []"
            />
          </th>
          <th>ID</th>
          <th>SKU</th>
          <th>نام</th>
          <th>موجودی</th>
          <th>وضعیت</th>
          <th>آخرین بروزرسانی</th>
          <th>عملیات</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="p in filteredProducts"
            :key="p.id"
            class="border-t hover:bg-[var(--brand-surface-soft)] transition"
        >
          <td class="px-3 py-2">
            <input type="checkbox" :value="p.id" v-model="selectedIds"/>
          </td>

          <td>{{ p.id }}</td>
          <td class="font-mono">{{ p.sku }}</td>
          <td class="font-bold">{{ p.name }}</td>
          <td class="font-extrabold">{{ p.current_stock }}</td>

          <td>
          <span
              class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
              :class="stockStatusClass(p)"
          >
            {{ stockStatusText(p) }}
          </span>
          </td>

          <td>{{ new Date(p.updated_at).toLocaleString("fa-ir") }}</td>

          <td class="flex justify-center gap-2 flex-wrap py-2">

            <!-- IN -->
            <div class="relative group">
              <button class="btn-outline p-2 text-green-600"
                      @click="openMovement(p,'IN')">
                <ArrowDownCircle class="w-4 h-4"/>
              </button>
              <span class="tooltip">ورود کالا</span>
            </div>

            <!-- OUT -->
            <div class="relative group">
              <button class="btn-outline p-2 text-orange-600"
                      @click="openMovement(p,'OUT')">
                <ArrowUpCircle class="w-4 h-4"/>
              </button>
              <span class="tooltip">خروج کالا</span>
            </div>

            <!-- ADJUST -->
            <div class="relative group">
              <button class="btn-outline p-2 text-blue-600"
                      @click="openMovement(p,'ADJUST')">
                <Scale class="w-4 h-4"/>
              </button>
              <span class="tooltip">اصلاح موجودی</span>
            </div>

            <!-- EDIT -->
            <div class="relative group">
              <button class="btn-outline p-2"
                      @click="openEdit(p)">
                <Pencil class="w-4 h-4"/>
              </button>
              <span class="tooltip">ویرایش</span>
            </div>

            <!-- DELETE -->
            <div class="relative group">
              <button class="btn-outline p-2 text-red-600"
                      @click="deleteProduct(p.id)">
                <Trash2 class="w-4 h-4"/>
              </button>
              <span class="tooltip">حذف محصول</span>
            </div>

            <!-- KARDEX -->
            <div class="relative group">
              <button class="btn-outline p-2"
                      @click="$router.push({ name: 'product-kardex', params: { id: p.id } })">
                <BarChart3 class="w-4 h-4"/>
              </button>
              <span class="tooltip">کاردکس</span>
            </div>

          </td>


        </tr>
        </tbody>
      </table>
    </div>

    <!-- CREATE MODAL -->
    <div v-if="createModal" class="modal">
      <div class="card p-6 space-y-5">
        <h2 class="font-bold text-lg">افزودن محصول</h2>

        <div class="space-y-1">
          <label class="text-sm font-medium">نام محصول</label>
          <input
              v-model="createForm.name"
              class="input w-full"
              placeholder="مثال: لپتاپ Dell XPS"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">SKU</label>
          <input
              v-model="createForm.sku"
              class="input w-full"
              placeholder="مثال: DELL-XPS-001"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">حداقل موجودی</label>
          <input
              type="number"
              v-model="createForm.min_stock"
              class="input w-full"
              placeholder="مثال: 10"
          />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button class="btn-outline" @click="createModal=false">
            لغو
          </button>

          <button class="btn-primary" @click="createProduct">
            ثبت محصول
          </button>
        </div>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <div v-if="editModal" class="modal">
      <div class="card p-6 space-y-5">
        <h2 class="font-bold text-lg">ویرایش محصول</h2>

        <div class="space-y-1">
          <label class="text-sm font-medium">نام محصول</label>
          <input
              v-model="editForm.name"
              class="input w-full"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">SKU</label>
          <input
              v-model="editForm.sku"
              class="input w-full"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">حداقل موجودی</label>
          <input
              type="number"
              v-model="editForm.min_stock"
              class="input w-full"
          />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button class="btn-outline" @click="editModal=false">
            لغو
          </button>

          <button class="btn-primary" @click="updateProduct">
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>

    <!-- MOVEMENT MODAL -->
    <div v-if="movementModal" class="modal">
      <div class="card p-6 space-y-5">

        <div class="flex items-center justify-between">
          <h2 class="font-bold text-lg">
            عملیات موجودی
          </h2>

          <span
              class="px-3 py-1 rounded-full text-xs font-semibold"
              :class="movementBadgeClass()"
          >
        {{ movementBadgeText() }}
      </span>
        </div>

        <p class="text-sm text-[var(--brand-muted)]">
          محصول: <span class="font-semibold">{{ selectedProduct?.name }}</span>
        </p>

        <div class="space-y-1">
          <label class="text-sm font-medium">تعداد</label>
          <input
              type="number"
              v-model="movementForm.quantity"
              class="input w-full"
              placeholder="مثال: 20"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">توضیحات</label>
          <textarea
              v-model="movementForm.note"
              class="input w-full"
              placeholder="توضیح درباره این عملیات..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button class="btn-outline" @click="movementModal=false">
            لغو
          </button>

          <button class="btn-primary" @click="submitMovement">
            ثبت عملیات
          </button>
        </div>
      </div>
    </div>


  </section>
</template>
