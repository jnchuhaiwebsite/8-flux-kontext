<template>
  <div
    class="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg"
    ref="containerRef"
    style="background: repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 40px 40px;"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded-full text-sm z-10">Before</div>
    <div class="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-sm z-10">After</div>
    <!-- 原图（完整显示） -->
    <div class="absolute inset-0">
      <nuxt-img 
        :src="beforeImage" 
        alt="Original" 
        class="w-full h-full object-contain" 
      />
    </div>
    
    <!-- 结果图片（可裁切） -->
    <div 
      class="absolute inset-0 overflow-hidden"
      :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
    >
      <nuxt-img 
        :src="afterImage" 
        alt="Result" 
        class="w-full h-full object-contain"
      />
    </div>

    <!-- 分割线 -->
    <div
      class="absolute z-20 flex items-center justify-center transform -translate-x-1/2 cursor-ew-resize"
      :style="{ left: `${position}%`, top: 0, bottom: 0, height: '100%' }"
    >
      <div class="relative flex flex-col items-center justify-center h-full w-0">
        <!-- 上半段线 -->
        <div class="w-0.5 bg-white/90 rounded-full shadow-lg" :style="{ height: 'calc(50% - 20px)' }"></div>
        <!-- 圆形把手 -->
        <div class="w-14 h-14 backdrop-blur-md bg-black/20 border-2 border-white/90 rounded-full shadow-2xl flex items-center justify-center z-10">
          <!-- 左箭头 -->
          <ChevronLeftIcon class="w-5 h-5 text-white/90 mr-1" stroke-width="2.5" />
          <!-- 右箭头 -->
          <ChevronRightIcon class="w-5 h-5 text-white/90 ml-1" stroke-width="2.5" />
        </div>
        <!-- 下半段线 -->
        <div class="w-0.5 bg-white/90 rounded-full shadow-lg" :style="{ height: 'calc(50% - 20px)' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

defineOptions({
  name: 'ImageCompare'
})

const props = defineProps<{
  beforeImage: string
  afterImage: string
}>()

const position = ref(50)
const isDragging = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (e.cancelable) e.preventDefault()
  isDragging.value = true
  drag(e)
  window.addEventListener('mousemove', drag, { passive: false })
  window.addEventListener('touchmove', drag, { passive: false })
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
}

const drag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  let clientX: number
  if ('touches' in e) {
    clientX = e.touches[0].clientX
  } else {
    clientX = e.clientX
  }
  const offsetX = clientX - rect.left
  const newPosition = Math.max(0, Math.min(100, (offsetX / rect.width) * 100))
  position.value = newPosition
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', drag)
  window.removeEventListener('touchmove', drag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
}

onUnmounted(() => {
  stopDrag()
})
</script> 