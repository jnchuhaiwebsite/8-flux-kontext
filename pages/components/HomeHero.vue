<template>
  <div class="home-hero-container w-full pb-16">
    <!-- 顶部标题区域 -->
    <div class="text-center px-4">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        Remove Black Cross Background - Free AI Background Remover
      </h1>
      <p class="text-gray-600 text-base md:text-lg mb-8 text-center">
        Instantly remove black cross backgrounds from your images with our AI-powered tool. Get clean, transparent PNGs in seconds. Perfect for professional use and avoiding religious conflicts.
      </p>
    </div>

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
import { ref, onMounted, computed, watch, nextTick, reactive } from 'vue'
import { createTask } from '~/api/index'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/composables/useToast';
const { toast, showToast } = useToast();

defineOptions({
  name: 'HomeHero'
})

// 使用用户信息 store
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const remainingTimes = ref(userStore.userInfo?.free_limit+userStore.userInfo?.remaining_limit|| 0)

// 结果图片
const resultImg = ref('')
// 原始图片
const originImg = ref('')

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
      resultImg.value = response.data.image_url
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
  if (!resultImg.value) return
  try {
    const response = await fetch(resultImg.value)
    if (!response.ok) {
      throw new Error('下载失败')
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
</script>

<style scoped>

</style> 