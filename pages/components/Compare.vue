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
    title: 'Color Modification',
    description: 'Change the color of the car to yellow and leave the rest as it is',
    beforeImage: '/img/2_before.png',
    afterImage: '/img/2_after.png'
  },
  {
    title: 'Object Addition',
    description: 'Add a pink cat lying next to the cat',
    beforeImage: '/img/3_before.png',
    afterImage: '/img/3_after.png'
  },
  {
    title: 'Smart Repair',
    description: 'Restore the broken bowl to its original form and generate a complete bowl',
    beforeImage: '/img/4_before.png',
    afterImage: '/img/4_after.png'
  }
]
</script> 