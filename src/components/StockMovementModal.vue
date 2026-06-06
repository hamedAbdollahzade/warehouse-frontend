<script setup>
import {reactive, watch} from 'vue'
import {createStockMovementRequest} from "../services/stockMovements.js";

const props = defineProps({
  product: Object,
  type: String,
  show: Boolean
})

const emit = defineEmits(['close', 'saved'])

const form = reactive({
  quantity: 1,
  note: ''
})

const submit = async () => {

  await createStockMovementRequest({
    product_id: props.product.id,
    type: props.type,
    quantity: form.quantity,
    note: form.note
  })

  form.quantity = 1
  form.note = ''

  emit('saved')
  emit('close')
}

watch(() => props.show, (val) => {
  if (!val) {
    form.quantity = 1
    form.note = ''
  }
})

const title = () => {
  if (props.type === 'IN') return 'ورود کالا'
  if (props.type === 'OUT') return 'خروج کالا'
  return 'اصلاح موجودی'
}
</script>

<template>

  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div class="card w-full max-w-md p-6 space-y-4">

      <h2 class="text-lg font-bold">
        {{ title() }} - {{ product?.name }}
      </h2>

      <div>
        <label class="text-sm">تعداد</label>
        <input
            type="number"
            v-model="form.quantity"
            class="input mt-1 w-full"
        />
      </div>

      <div>
        <label class="text-sm">توضیحات</label>
        <textarea
            v-model="form.note"
            class="input mt-1 w-full"
        ></textarea>
      </div>

      <div class="flex gap-3 justify-end">

        <button class="btn-outline" @click="$emit('close')">
          لغو
        </button>

        <button class="btn-primary" @click="submit">
          ثبت
        </button>

      </div>

    </div>

  </div>

</template>
