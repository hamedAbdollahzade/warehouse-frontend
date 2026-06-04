<template>
  <div class="min-h-screen flex flex-col bg-(--brand-bg) text-(--brand-text)">
    <AppHeader/>
    <main class="flex-1 transition-colors">
      <slot/>
    </main>
    <AppFooter/>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
</script>
script
