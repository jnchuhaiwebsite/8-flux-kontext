<template>
  <div class="w-full h-full relative flex items-center justify-center py-20 overflow-hidden">
    <!-- 炫酷背景 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500"></div>
      <div class="absolute inset-0">
        <div class="absolute w-[800px] h-[800px] rounded-full bg-blue-300/20 blur-[100px] -top-40 -left-40 animate-pulse"></div>
        <div class="absolute w-[800px] h-[800px] rounded-full bg-cyan-300/20 blur-[100px] top-1/2 -right-40 animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute w-[800px] h-[800px] rounded-full bg-sky-300/20 blur-[100px] -bottom-40 left-1/3 animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>

    <!-- 鼠标跟随效果 -->
    <div v-if="!showForm" class="mouse-follower-container">
      <div class="mouse-follower"></div>
      <div class="mouse-follower mouse-follower-2"></div>
      <div class="mouse-follower mouse-follower-3"></div>
    </div>

    <!-- 主内容区 -->
    <div class="relative z-0 w-full max-w-7xl px-4">
      <!-- 默认展示区域 -->
      <div v-if="!showForm" class="flex flex-col md:flex-row items-center gap-16">
        <div class="w-full md:w-1/2 space-y-8">
          <div class="space-y-4">
            <h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Flux Kontext
            </h1>
            <p class="text-2xl text-white">
              AI Image Generation & Editing with Character Consistency
            </p>
          </div>
          
          <div class="space-y-4 text-blue-50">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-white"></div>
              <p>Generate stunning images with AI</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-cyan-200"></div>
              <p>Maintain character consistency across generations</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-blue-200"></div>
              <p>Professional-grade image editing tools</p>
            </div>
          </div>

          <button 
            @click="showForm = true"
            class="group relative px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xl font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span class="relative z-10">Try It Now</span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div class="w-full md:w-1/2">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl transform rotate-6 scale-105 opacity-30"></div>
            <img 
              src="/logo.png" 
              alt="Demo Preview" 
              class="relative rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105 bg-white/20 backdrop-blur-sm p-4"
            />
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div v-else class="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        <div class="flex flex-col md:flex-row w-full">
          <!-- 左侧上传区 -->
          <div class="w-full md:w-2/5 p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-200/20">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Flux Kontext</h2>
            <p class="text-gray-500 text-sm mb-4">AI Image Generation & Editing with Character Consistency</p>

            <div class="text-gray-800 text-sm">
              <p>Image (Optional)</p>
              <p class="text-gray-500">Upload Image(s)</p>
            </div>

            <!-- 上传图片 -->
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 py-8 mb-4 cursor-pointer transition hover:border-blue-400 relative min-h-[200px] min-w-[200px]"
              @click="handleUploadAreaClick"
            >
              <!-- 已经上传图片 -->
              <template v-if="uploadImg">
                <nuxt-img :src="uploadImg" alt="预览" class="w-80 max-h-60 object-contain rounded-lg" />
                <!-- 右上角叉号 -->
                <button
                  class="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition"
                  @click.stop="removeImage"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </template>

              <!-- 没有上传图片 -->
              <template v-else>
                <!-- Heroicons 图片图标 -->
                <PhotoIcon class="w-12 h-12 text-gray-400 mb-2" />
                <span class="text-gray-400 text-sm">
                  Drag & drop or 
                  <span class="text-blue-500 cursor-pointer underline" @click.stop="() => fileInputRef?.click()">browse</span>
                </span>
                <span class="text-gray-300 text-xs mt-1">PNG, JPG, JPEG or WEBP (max: 10MB)</span>
              </template>
              <input type="file" accept="image/*" class="hidden" ref="fileInputRef" @change="onFileChange" />
            </div>
            <!-- Prompt输入框 -->
            <textarea class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" rows="2" placeholder="Describe how your image should look like..."></textarea>
            <!-- 尺寸选择 -->
            <div class="flex flex-wrap gap-2 mt-2">
              <button
                v-for="item in ratios"
                :key="item.value"
                :class="[
                  'flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold transition',
                  selectedRatio === item.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow'
                    : 'border-gray-200 text-gray-600 bg-white hover:border-blue-300',
                ]"
                @click="() => selectRatio(item.value)"
                type="button"
              >
                <!-- 比例方框图标 -->
                <svg v-if="item.icon" :width="20" :height="20" viewBox="0 0 20 20" fill="none" class="flex items-center">
                  <rect x="3" y="3" :width="item.icon.w" :height="item.icon.h" rx="3" :stroke="selectedRatio === item.value ? '#3B82F6' : '#A1A1AA'" stroke-width="2" />
                </svg>
                <span>{{ item.label }}</span>
              </button>
            </div>
            <!-- 生成按钮 -->
            <button class="mt-6 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 rounded-xl shadow hover:from-blue-600 hover:to-cyan-600 transition">Generate <span class="ml-1 text-xs">5 Credits</span></button>
          </div>

          <!-- 右侧图片对比区 -->
          <div class="w-full md:w-3/5 p-8 flex flex-col items-center justify-center relative">
            <!-- 加载状态 -->
            <div v-if="isProcessing" class="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg flex items-center justify-center">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-gray-600">Processing your image...</span>
              </div>
            </div>

            <!-- 结果展示区域 -->
            <div v-else-if="generatedImage" class="w-full flex flex-col items-center gap-6">
              <div class="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <nuxt-img 
                  :src="generatedImage" 
                  alt="Generated Result" 
                  class="w-full h-full object-contain"
                />
              </div>
              <button 
                @click="handleDownload"
                class="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow hover:from-blue-600 hover:to-cyan-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Result
              </button>
            </div>

            <!-- 默认图片对比区域 -->
            <ImageCompare
              v-else
              :before-image="originImg"
              :after-image="resultImg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue'
import { createTask } from '~/api/index'
import { useUserStore } from '~/stores/user'
import { PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
const ImageCompare = defineAsyncComponent(() => import('~/components/ImageCompare.vue'))

import { useToast } from '~/composables/useToast';
const { toast, showToast } = useToast();

defineOptions({
  name: 'HomeHero'
})

// 使用用户信息 store
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const remainingTimes = ref(userStore.userInfo?.free_limit+userStore.userInfo?.remaining_limit|| 0)

// 示例-结果图片
const resultImg = ref('https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80')
// 示例-原始图片
const originImg = ref('/logo.png')

// 上传的图片
const uploadImg = ref('')

// 生成的图片
const generatedImage = ref('')

// 比例选项
const ratios = [
  { label: 'Match Input', value: 'match', icon: { w: 14, h: 14 } },
  { label: '2:3', value: '2:3', icon: { w: 10, h: 15 } },
  { label: '3:2', value: '3:2', icon: { w: 15, h: 10 } },
  { label: '1:1', value: '1:1', icon: { w: 14, h: 14 } },
  { label: '16:9', value: '16:9', icon: { w: 16, h: 9 } }
]
const selectedRatio = ref('match')
const selectRatio = (val: string) => {
  selectedRatio.value = val
}

// 上传 input 相关
const fileInputRef = ref<HTMLInputElement | null>(null)
const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    uploadImg.value = URL.createObjectURL(files[0])
    handleUpload(files[0])
  }
}
const removeImage = () => {
  uploadImg.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}

// 添加登录状态检查方法
const checkLoginStatus = async () => {
  if (!userInfo.value) {
    showToast('Please login first to use this feature', 'error')
    // 使用 id 选择器获取登录按钮
    const loginButton = document.getElementById('bindLogin')
    if (loginButton) {
      loginButton.click()
    }
    return false
  }
  return true
}

// 添加使用次数检查方法
const checkUsageLimit = () => {
  if (remainingTimes.value <= 0) {
    showToast('Usage limit reached. Please upgrade to premium for more credits', 'error')
    return false
  }
  return true
}

// 监听用户信息变化
watch(
  userInfo,
  (newUserInfo: any) => {
    remainingTimes.value = newUserInfo?.free_limit+newUserInfo?.remaining_limit || 0
  },
  { immediate: true }
)

onMounted(() => {
  // 添加鼠标跟随效果
  const container = document.querySelector('.mouse-follower-container')
  const followers = document.querySelectorAll('.mouse-follower')
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // 检查鼠标是否在容器内
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      followers.forEach((follower, index) => {
        if (follower instanceof HTMLElement) {
          const delay = index * 50
          const scale = 1 + Math.sin(Date.now() * 0.002) * 0.08
          setTimeout(() => {
            follower.style.left = x + 'px'
            follower.style.top = y + 'px'
            follower.style.transform = `translate(-50%, -50%) scale(${scale})`
            follower.style.opacity = '1'
          }, delay)
        }
      })
    } else {
      // 鼠标离开容器时隐藏跟随效果
      followers.forEach(follower => {
        if (follower instanceof HTMLElement) {
          follower.style.opacity = '0'
        }
      })
    }
  }

  // 只在首屏区域添加事件监听
  watch(showForm, (newValue) => {
    if (!newValue) {
      document.addEventListener('mousemove', handleMouseMove)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, { immediate: true })
})

// 处理图片
const isProcessing = ref(false);//是否处理中
const processImage = async (file: File) => {
  if (!file) return
  
  // 创建临时URL
  originImg.value = URL.createObjectURL(file)
  isProcessing.value = true;//处理中
  
  try {
    const response = await createTask({file}) as any
    isProcessing.value = false // 处理完成
    if (response?.code==200) {
      generatedImage.value = response.data.image_url
      // 减少使用次数
      remainingTimes.value--
      // 更新用户信息
      await userStore.fetchUserInfo(true)
    }else{
      showToast(response.msg, 'error')
    }
  } catch (error) {
    console.error('Failed to process image:', error)
    isProcessing.value = false//处理完成
    showToast('Failed to process image, please try again later', 'error')
  }
}

// 上传图片点击触发
const handleUpload = async (file: File) => {
  // 检查登录状态|使用次数|是否处理中
  if (!await checkLoginStatus() || !checkUsageLimit() || isProcessing.value) {
    return
  }
  // 处理图片
  processImage(file)
}

// 下载图片
const handleDownload = async () => {
  if (!generatedImage.value) return
  try {
    const response = await fetch(generatedImage.value)
    if (!response.ok) {
      throw new Error('Download failed')
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${Date.now()}.png`
    
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
    showToast('Download failed, please try again later', 'error')
  }
}
// 上传图片点击触发
const handleUploadAreaClick = () => {
  if (!uploadImg.value && fileInputRef.value) fileInputRef.value.click()
}

const showForm = ref(false)
</script>

<style scoped>
.mouse-follower-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.mouse-follower {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(96, 165, 250, 0.6);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
  z-index: 9999;
  mix-blend-mode: screen;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.3);
}

.mouse-follower-2 {
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.3);
  transition: transform 0.15s ease;
  mix-blend-mode: screen;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
}

.mouse-follower-3 {
  width: 60px;
  height: 60px;
  background: rgba(37, 99, 235, 0.1);
  transition: transform 0.2s ease;
  mix-blend-mode: screen;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.1);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style> 