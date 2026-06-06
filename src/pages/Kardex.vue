<script setup>

import {onMounted} from "vue"
import {useRoute} from "vue-router"
import {storeToRefs} from "pinia"
import {useKardexStore} from "../stores/kardex"

const route = useRoute()

const kardexStore = useKardexStore()

const {rows, loading} = storeToRefs(kardexStore)

onMounted(() => {

  kardexStore.fetchKardex(route.params.id)

})

</script>

<template>

  <div class="p-6 max-w-6xl mx-auto">

    <h1 class="text-2xl font-black mb-6">
      کاردکس کالا
    </h1>

    <div v-if="loading">
      در حال دریافت اطلاعات...
    </div>

    <table v-else class="w-full text-sm">

      <thead class="border-b">
      <tr class="text-right">
        <th class="p-3">تاریخ</th>
        <th class="p-3">نوع</th>
        <th class="p-3">مقدار</th>
        <th class="p-3">تغییر</th>
        <th class="p-3">موجودی</th>
        <th class="p-3">توضیح</th>
      </tr>
      </thead>

      <tbody>

      <tr
          v-for="row in rows"
          :key="row.id"
          class="border-b hover:bg-gray-50"
      >

        <td class="p-3">
          {{ new Date(row.date).toLocaleString("fa-ir") }}
        </td>

        <td class="p-3">

          <span
              v-if="row.type==='IN'"
              class="status-success px-2 py-1 rounded"
          >
            ورود
          </span>

          <span
              v-if="row.type==='OUT'"
              class="status-danger px-2 py-1 rounded"
          >
            خروج
          </span>

        </td>

        <td class="p-3 font-bold">
          {{ row.quantity }}
        </td>

        <td
            class="p-3 font-bold"
            :class="row.change > 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ row.change }}
        </td>

        <td class="p-3 font-black">
          {{ row.balance }}
        </td>

        <td class="p-3 text-muted">
          {{ row.note }}
        </td>

      </tr>

      </tbody>

    </table>

  </div>

</template>
