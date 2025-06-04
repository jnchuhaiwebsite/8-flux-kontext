<template>
  <div class="works-list">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]">
      <!-- 加载状态 -->
      <div v-if="loading" class="col-span-full flex items-center justify-center min-h-[400px]">
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-500">加载中...</p>
        </div>
      </div>

      <!-- 作品列表 -->
      <template v-else>
        <div v-if="!works.length" class="col-span-full flex items-center justify-center min-h-[400px]">
          <div class="flex flex-col items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-gray-500 text-lg">暂无作品</p>
          </div>
        </div>
        <div v-else v-for="work in works" :key="work.task_id" class="work-item">
          <div class="relative aspect-square rounded-lg overflow-hidden group">
            <NuxtImg 
              :src="work.generate_image" 
              :alt="work.status_msg"
              class="w-full h-full object-cover cursor-pointer"
              loading="lazy"
              placeholder
              sizes="sm:100vw md:50vw lg:33vw"
              @click="openLightbox(work.generate_image)"
            />
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                @click="openLightbox(work.generate_image)"
                class="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </button>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
              <p class="text-sm">{{ formatDate(work.created_at) }}</p>
              <p class="text-sm">{{ work.status_msg }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 分页 -->
    <div class="mt-8 flex justify-center">
      <nav class="flex items-center gap-2">
        <button 
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1 || loading"
          class="px-3 py-1 rounded border"
          :class="currentPage === 1 || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
        >
          上一页
        </button>
        <span class="px-3 py-1">第 {{ currentPage }} 页 / 共 {{ totalPage }} 页</span>
        <button 
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPage || loading"
          class="px-3 py-1 rounded border"
          :class="currentPage === totalPage || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
        >
          下一页
        </button>
      </nav>
    </div>

    <!-- 图片预览模态框 -->
    <div v-if="showPreview" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90" @click="closePreview">
      <div class="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <img 
          :src="previewImage" 
          class="max-w-full max-h-full object-contain cursor-pointer"
          :style="{ transform: `scale(${scale})` }"
          @wheel.prevent="handleWheel"
          @click="closePreview"
        />
        <button 
          @click="closePreview"
          class="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOpusList } from '~/api'
import { useToast } from '~/composables/useToast'

const { toast, showToast } = useToast()

interface Work {
  task_id: string
  origin_image: string
  size_image: string
  other_image: string
  generate_image: string
  quality_image: string
  status: number
  status_msg: string
  generation_time: number
  msg: string
  created_at: number
  updated_at: number
}

interface WorksResponse {
  count: number
  list: Work[]
  total_page: number
}

const works = ref<Work[]>([])
const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = 12

// 加载状态
const loading = ref(true)

// 图片预览相关状态
const showPreview = ref(false)
const previewImage = ref('')
const scale = ref(1)

const fetchWorks = async (page: number) => {
  loading.value = true
  try {
    const response = await getOpusList({
      page,
      page_size: pageSize,
      status: 1
    }) as any;
    
    if (response.code === 200) {
      works.value = response.data.list
      totalPage.value = response.data.total_page
    } else {
      works.value = []
      totalPage.value = 0
      showToast(response.msg || '获取作品列表失败')
    }
  } catch (error) {
    console.error('获取作品列表失败:', error)
    works.value = []
    totalPage.value = 0
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPage.value) return
  currentPage.value = page
  fetchWorks(page)
  // 直接滚动到顶部
  window.scrollTo(0, 0)
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 打开图片预览
const openLightbox = (img: string) => {
  previewImage.value = img
  showPreview.value = true
  scale.value = 1
}

// 关闭图片预览
const closePreview = () => {
  showPreview.value = false
}

// 处理滚轮缩放
const handleWheel = (e: WheelEvent) => {
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  const newScale = Math.max(0.1, Math.min(3, scale.value + delta))
  scale.value = newScale
}

onMounted(() => {
  fetchWorks(1)
})
</script>

<style scoped>
.work-item {
  transition: transform 0.2s;
}

.work-item:hover {
  transform: translateY(-4px);
}
</style> 