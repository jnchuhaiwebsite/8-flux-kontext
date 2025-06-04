<template>
  <div class="max-w-7xl mx-auto p-4 pt-32">
    <h1 class="text-2xl font-bold mb-6">My works</h1>
    <WorksList />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const WorksList = defineAsyncComponent(() => import('~/pages/works/components/WorksList.vue'))
</script>

<style scoped>

</style> 