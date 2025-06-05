<template>
  <div class="max-w-7xl mx-auto p-4 pt-32">
    <h1 class="text-2xl font-bold mb-6">My works</h1>
    <WorksList @show-toast="handleToast" />
    <Toast
      :show="toast.show"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useToast } from '~/composables/useToast'

const WorksList = defineAsyncComponent(() => import('~/pages/works/components/WorksList.vue'))
const { toast, showToast } = useToast()

const handleToast = ({ message, type, title }: { message: string; type: 'success' | 'error' | 'info'; title?: string }) => {
  showToast(message, type, title)
}
</script>

<style scoped>

</style> 