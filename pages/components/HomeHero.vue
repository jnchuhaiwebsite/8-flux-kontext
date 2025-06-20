<template>
  <div class="w-full min-h-[800px] relative flex items-center justify-center py-24 overflow-hidden">
    <!-- 炫酷背景 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500"></div>
      <div class="absolute inset-0">
        <div class="absolute w-[800px] h-[800px] rounded-full bg-blue-300/20 blur-[100px] -top-40 -left-40 animate-pulse"></div>
        <div class="absolute w-[800px] h-[800px] rounded-full bg-cyan-300/20 blur-[100px] top-1/2 -right-40 animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute w-[800px] h-[800px] rounded-full bg-sky-300/20 blur-[100px] -bottom-40 left-1/3 animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]">
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="relative z-0 w-full max-w-7xl px-4">
      <!-- 默认展示区域 -->
      <div v-if="!showForm" class="flex flex-col md:flex-row items-center gap-16">
        <div class="w-full md:w-1/2 space-y-8">
          <div class="space-y-4">
            <h1 class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Flux Kontext
            </h1>
            <p class="text-3xl text-white">
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
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-indigo-200"></div>
              <p>Advanced style transfer capabilities</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-purple-200"></div>
              <p>High-resolution output support</p>
            </div>
          </div>

          <button 
            @click="showForm = true"
            class="group relative px-10 py-5 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-2xl font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span class="relative z-10">Try It Now</span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div class="w-full md:w-1/2">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl transform rotate-6 scale-105 opacity-30"></div>
            <img 
              src="/img/1.webp" 
              alt="Demo Preview" 
              class="relative rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105 bg-white/20 backdrop-blur-sm p-4"
            />
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div v-else class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-2 max-w-6xl mx-auto relative">
        <!-- 返回按钮 -->
        <button 
          @click="handleBack"
          class="absolute left-0 -top-10 flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span class="text-sm font-medium">Back</span>
        </button>
        <div class="flex flex-col md:flex-row w-full">
          <!-- 左侧上传区 -->
          <div class="w-full md:w-1/3 p-4 flex flex-col gap-3 border-b md:border-b-0 md:border-r border-gray-200/20">
            <h2 class="text-2xl font-bold text-gray-800">Flux Kontext</h2>
            <p class="text-gray-500 text-sm mb-2">AI Image Generation & Editing with Character Consistency</p>

            <div class="text-gray-800 text-sm">
              <p>Image (Optional)</p>
            </div>

            <!-- 上传图片 -->
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 py-4 mb-2 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-lg relative h-[140px] w-full"
              @click="handleUploadAreaClick"
              @dragenter.prevent="handleDragEnter"
              @dragover.prevent="handleDragOver"
              @dragleave.prevent="handleDragLeave"
              @drop.prevent="handleDrop"
              :class="{ 'border-blue-400 bg-blue-50 shadow-lg scale-[1.02]': isDragging }"
            >
              <!-- 已经上传图片 -->
              <template v-if="uploadImgs.length">
                <div class="flex gap-2 w-full h-full items-center justify-center">
                  <div v-for="(img, idx) in uploadImgs" :key="img" class="relative w-[45%] h-[120px] flex items-center justify-center">
                    <nuxt-img :src="img" alt="Preview" class="max-h-[120px] max-w-full object-contain rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl" />
                    <button
                      class="absolute -top-2 right-2 bg-gray-300 bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition"
                      @click.stop="removeImage(idx)"
                      type="button"
                    >
                      <XMarkIcon class="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <div v-if="uploadImgs.length < 2" class="absolute bottom-2 right-2 text-xs text-blue-400">You can upload one more picture.</div>
              </template>
              <!-- 没有上传图片 -->
              <template v-else>
                <PhotoIcon class="w-10 h-10 text-gray-400 mb-1" />
                <span class="text-gray-400 text-sm">
                  Drag & drop or 
                  <span class="text-blue-500 cursor-pointer underline" @click.stop="handleBrowseClick">browse</span>
                </span>
                <span class="text-gray-300 text-sm mt-1">PNG, JPG, JPEG or WEBP (max: 5MB, Up to 2 sheets)</span>
              </template>
              <input type="file" accept="image/*" class="hidden" ref="fileInputRef" @change="onFileChange" :multiple="uploadImgs.length < 1" />
            </div>
            <!-- Prompt输入框 -->
            <textarea 
              v-model="prompt" 
              class="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" 
              rows="3" 
              placeholder="Describe how your image should look like..."
              maxlength="400"
              @focus.prevent="handleTextareaFocus"
            ></textarea>
            <div class="text-right text-sm text-gray-500">{{ prompt.length }}/400</div>
            <!-- 尺寸选择 -->
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in showMoreRatios ? ratios : defaultRatios"
                  :key="item.value"
                  :class="[
                    'flex flex-col items-center justify-center gap-0.5 px-1 py-1 rounded-lg border text-xs font-semibold transition w-[45px] h-[45px]',
                    selectedRatio === item.value
                      ? 'border-blue-500 bg-blue-50 text-blue-600 shadow'
                      : 'border-gray-200 text-gray-600 bg-white hover:border-blue-300',
                  ]"
                  @click="() => selectRatio(item.value)"
                  type="button"
                >
                  <!-- 比例方框图标 -->
                  <svg v-if="item.icon" :width="20" :height="20" viewBox="0 0 24 24" fill="none" class="flex items-center justify-center">
                    <rect 
                      :x="(24 - item.icon.w) / 2" 
                      :y="(24 - item.icon.h) / 2" 
                      :width="item.icon.w" 
                      :height="item.icon.h" 
                      rx="2" 
                      :stroke="selectedRatio === item.value ? '#3B82F6' : '#A1A1AA'" 
                      stroke-width="2"
                      :stroke-dasharray="item.value === 'match_input_image' ? '2 2' : 'none'"
                    />
                  </svg>
                  <span class="text-xs">{{ item.label }}</span>
                </button>
              </div>
              <button
                v-if="!showMoreRatios"
                @click="showMoreRatios = true"
                class="w-full py-2 text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center justify-center gap-1"
              >
                <span>More Options</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <button
                v-else
                @click="showMoreRatios = false"
                class="w-full py-2 text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center justify-center gap-1"
              >
                <span>Show Less</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
            </div>
            <!-- 生成按钮 -->
            <button @click="handleSubmit" class="mt-4 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 rounded-xl shadow hover:from-blue-600 hover:to-cyan-600 transition">Generate</button>
          </div>

          <!-- 右侧图片对比区 -->
          <div class="w-full md:w-2/3 p-4 flex flex-col items-center relative">
            <!-- 标题和说明文字 -->
            <div class="w-full text-left mb-3">
              <h2 class="text-lg font-bold text-gray-800 mb-1">Flux Kontext Result</h2>
              <p class="text-sm text-gray-600">The modified image results will appear here.</p>
            </div>

            <!-- 加载状态 -->
            <div v-if="isProcessing" class="w-full aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100 shadow-lg flex items-center justify-center">
              <div class="flex flex-col items-center gap-3">
                <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-gray-600 text-sm">Processing your image...</span>
                <span class="text-xs text-gray-500">Result Time: 5s - 20s</span>
              </div>
            </div>

            <!-- 结果展示区域 -->
            <div v-else-if="generatedImage" class="w-full flex flex-col items-center gap-4">
              <div class="w-full aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100 shadow-lg relative p-3">
                <div v-if="isImageLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div class="flex flex-col items-center gap-4">
                    <ArrowPathIcon class="w-12 h-12 text-blue-500 animate-spin" />
                    <span class="text-gray-600">Loading image...</span>
                  </div>
                </div>
                <nuxt-img 
                  :src="generatedImage" 
                  alt="Generated Result" 
                  class="w-full h-full object-contain rounded-xl"
                  @load="handleImageLoad"
                  @error="handleImageError"
                />
              </div>
              <button 
                @click="handleDownload"
                :disabled="isDownloading"
                class="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowPathIcon v-if="isDownloading" class="animate-spin h-5 w-5" />
                <ArrowDownTrayIcon v-else class="h-5 w-5" />
                {{ isDownloading ? 'Downloading...' : 'Download Result' }}
              </button>
            </div>

            <!-- 默认图片对比区域 -->
            <ImageCompare
              v-else
              :before-image="originImg"
              :after-image="resultImg"
              class="aspect-[3/2]"
            />
          </div>
        </div>
      </div>
    </div>
    <Toast
      :show="toast.show"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      :duration="2000"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { createTask, upload } from '~/api/index'
import { useUserStore } from '~/stores/user'
import { 
  PhotoIcon, 
  ArrowDownTrayIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
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

// 示例-原始图片
const originImg = ref('/img/5_before.webp')
// 示例-结果图片
const resultImg = ref('/img/5_after.webp')

// 上传的图片
const uploadImgs = ref<string[]>([])
const uploadFiles = ref<File[]>([])
// 输入的 prompt
const prompt = ref('')

// 生成的图片
const generatedImage = ref('')
const isImageLoading = ref(false)
const isProcessing = ref(false) //是否处理中

// 比例选项
const ratios = [
  { label: 'Match Input', value: 'match_input_image', icon: { w: 22, h: 22 } },
  { label: '1:1', value: '1:1', icon: { w: 14, h: 14 } },
  { label: '4:3', value: '4:3', icon: { w: 12, h: 9 } },
  { label: '3:4', value: '3:4', icon: { w: 9, h: 12 } },
  { label: '16:9', value: '16:9', icon: { w: 16, h: 9 } },
  { label: '9:16', value: '9:16', icon: { w: 9, h: 16 } },
  { label: '3:2', value: '3:2', icon: { w: 15, h: 10 } },
  { label: '2:3', value: '2:3', icon: { w: 10, h: 15 } },
  { label: '4:5', value: '4:5', icon: { w: 12, h: 15 } },
  { label: '5:4', value: '5:4', icon: { w: 15, h: 12 } },
  { label: '21:9', value: '21:9', icon: { w: 21, h: 9 } },
  { label: '9:21', value: '9:21', icon: { w: 9, h: 21 } },
  { label: '2:1', value: '2:1', icon: { w: 16, h: 8 } },
  { label: '1:2', value: '1:2', icon: { w: 8, h: 16 } }
]

// 默认显示的比例选项
const defaultRatios = ratios.slice(0, 6)
const showMoreRatios = ref(false)
const selectedRatio = ref('match_input_image')
const selectRatio = (val: string) => {
  if (!checkLogin()) return
  selectedRatio.value = val
}

// 上传 input 相关
const fileInputRef = ref<HTMLInputElement | null>(null)
const onFileChange = (e: Event) => {
  if (!checkLogin()) return
  const files = (e.target as HTMLInputElement).files
  if (files) {
    handleUpload(Array.from(files))
  }
}
const removeImage = (idx: number) => {
  uploadImgs.value.splice(idx, 1)
  uploadFiles.value.splice(idx, 1)
  if (fileInputRef.value) fileInputRef.value.value = ''
}


// 修改 checkUsageLimit 方法
const checkUsageLimit = () => {
  if (remainingTimes.value <= 0) {
    showToast('Usage limit reached. Please upgrade to premium for more credits', 'error')
    setTimeout(() => {
      // 跳转到套餐模块
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
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

// 处理图片上传
const handleUpload = async (files: File | File[]) => {
  let fileArr = Array.isArray(files) ? files : [files]
  // 只允许最多两张
  fileArr = fileArr.slice(0, 2 - uploadFiles.value.length)
  for (const file of fileArr) {
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size should not exceed 5MB', 'error')
      continue
    }
    uploadFiles.value.push(file)
    uploadImgs.value.push(URL.createObjectURL(file))
  }
}

// 处理表单提交
const handleSubmit = async () => {
  if (!checkLogin()) return
  if (!checkUsageLimit() || isProcessing.value) {
    return
  }
  if (!prompt.value) {
    showToast('Please enter a prompt', 'error')
    const promptInput = document.querySelector('textarea')
    if (promptInput) {
      promptInput.focus()
    }
    return
  }
  if (prompt.value.length > 400) {
    showToast('Prompt should not exceed 400 characters', 'error')
    return
  }
  if (uploadFiles.value.length === 0) {
    showToast('Please upload at least one image.', 'error')
    return
  }
  isProcessing.value = true
  try {
    // 先上传图片，拿到url
    const urls: string[] = []
    for (const file of uploadFiles.value) {
      const res = await upload({file: file}) as any
      if (res?.code == 200 && res.data) {
        urls.push(res.data)
      } else {
        showToast('Image upload failed', 'error')
        isProcessing.value = false
        return
      }
    }
    const image_url = urls.join('||')
    let reqData = {
      prompt: prompt.value,
      size: selectedRatio.value,
      image_url
    }
    const response = await createTask(reqData) as any
    if (response?.code === 200) {
      generatedImage.value = response.data.image_url
      // 减少使用次数
      remainingTimes.value--
      // 更新用户信息
      await userStore.fetchUserInfo(true)
    } else {
      showToast(response.msg, 'error')
    }
  } catch (error) {
    console.error('Failed to process image:', error)
    showToast('Failed to process the image, please try again later', 'error')
  } finally {
    isProcessing.value = false
  }
}

// 下载图片
const isDownloading = ref(false)
const handleDownload = async () => {
  if (!generatedImage.value || isDownloading.value) return
  isDownloading.value = true
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
  } finally {
    isDownloading.value = false
  }
}
// 上传图片点击触发
const handleUploadAreaClick = () => {
  if (!checkLogin()) return
  if (uploadImgs.value.length < 2 && fileInputRef.value) fileInputRef.value.click()
}

const showForm = ref(false)

// 监听图片加载
const handleImageLoad = () => {
  isImageLoading.value = false
}

// 监听图片加载失败
const handleImageError = () => {
  isImageLoading.value = false
  showToast('Failed to load image', 'error')
}

// 监听生成的图片URL变化
watch(generatedImage, (newUrl) => {
  if (newUrl) {
    isImageLoading.value = true
  }
})

// 在 script setup 部分添加 handleBack 函数
const handleBack = () => {
  showForm.value = false
  prompt.value = ''
  uploadImgs.value = []
  uploadFiles.value = []
  if (fileInputRef.value) fileInputRef.value.value = ''
  selectedRatio.value = 'match_input_image'
  generatedImage.value = ''
  isProcessing.value = false
  isImageLoading.value = false
  isDownloading.value = false
}

// 拖拽状态
const isDragging = ref(false)

// 处理拖拽进入
const handleDragEnter = (e: DragEvent) => {
  isDragging.value = true
}

// 处理拖拽悬停
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

// 处理拖拽离开
const handleDragLeave = (e: DragEvent) => {
  isDragging.value = false
}
const checkLogin = () => {
  if (!userInfo.value) {
    const loginButton = document.getElementById('bindLogin')
    if (loginButton) {
      loginButton.click()
    }
    return false
  }
  return true
}
// 处理文件拖放
const handleDrop = async (e: DragEvent) => {
  if (!checkLogin()) return
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files) {
    handleUpload(Array.from(files))
  }
}

// 在 script setup 部分修改 handleTextareaFocus 函数
const handleTextareaFocus = () => {
  if (!userInfo.value) {
    const loginButton = document.getElementById('bindLogin')
    if (loginButton) {
      loginButton.click()
      // 移除焦点
      const textarea = document.querySelector('textarea')
      if (textarea) {
        textarea.blur()
      }
    }
  }
}

// 在 script setup 部分添加 handleBrowseClick 函数
const handleBrowseClick = () => {
  if (!checkLogin()) return
  if (fileInputRef.value && uploadImgs.value.length < 2) {
    fileInputRef.value.click()
  }
}
</script>

<style scoped>
/* 只保留无法用Tailwind实现的动画效果 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style> 