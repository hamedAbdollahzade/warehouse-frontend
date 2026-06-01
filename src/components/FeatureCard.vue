<template>
  <div class="card p-5">
    <div
        class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold mb-4"
        :style="{ background: 'var(--brand-accent)' }"
    >
      {{ icon }}
    </div>
    <h3 class="text-lg font-bold text-(--brand-primary)">{{ title }}</h3>
    <p class="text-sm text-slate-600 mt-2 leading-7">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  icon: {
    type: String,
    default: "•",
  },
});
</script>
