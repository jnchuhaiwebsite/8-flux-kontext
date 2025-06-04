<template>
  <div class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-3">Powerful Image Editing</h2>
        <p class="text-xl text-gray-600">Experience the amazing effects of Flux Kontext through intuitive comparisons</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div v-for="item in compareItems" :key="item.title" class="bg-white rounded-lg shadow-sm p-3">
          <div class="scale-90 origin-top -mb-4">
            <ImageCompare 
              :beforeImage="item.beforeImage"
              :afterImage="item.afterImage"
            />
          </div>
          <div class="space-y-1">
            <h3 class="text-lg font-semibold text-gray-900 text-center">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 text-center">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ImageCompare = defineAsyncComponent(() => import('~/components/ImageCompare.vue'))

const compareItems = [
  {
    title: 'Local Redraw',
    description: 'Precisely control specific areas while keeping others unchanged',
    beforeImage: 'https://s.magicaitool.com/flux-ai/flux-kontext/before-3.jpg',
    afterImage: 'https://s.magicaitool.com/flux-ai/flux-kontext/after-3.jpg'
  },
  {
    title: 'Style Transfer',
    description: 'Transform images into different artistic styles with one click',
    beforeImage: 'https://s.magicaitool.com/flux-ai/flux-kontext/before-2.webp',
    afterImage: 'https://s.magicaitool.com/flux-ai/flux-kontext/after-2.webp'
  },
  {
    title: 'Smart Repair',
    description: 'Automatically fix image defects and restore perfect details',
    beforeImage: 'https://s.magicaitool.com/flux-ai/flux-kontext/before-1.jpg',
    afterImage: 'https://s.magicaitool.com/flux-ai/flux-kontext/after-1.jpg'
  }
]
</script> 