<template>
  <div class="card p-5 transition hover:-translate-y-1 hover:border-[var(--brand-accent)]">
    <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold mb-4 shadow-lg shadow-violet-500/15"
        :style="{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-accent-2))' }"
    >
      {{ icon }}
    </div>
    <h3 class="text-lg font-black text-(--brand-primary)">{{ title }}</h3>
    <p class="text-sm text-muted mt-2 leading-7">{{ desc }}</p>
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
