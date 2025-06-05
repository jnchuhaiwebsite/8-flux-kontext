<template>
  <div id="faq" class="relative w-full py-16 bg-gradient-to-b from-white via-blue-50 to-white" aria-labelledby="faq-heading">
    <!-- 标题 -->
    <div class="max-w-7xl mx-auto px-4">
      <h2 id="faq-heading" class="text-3xl font-bold text-center mb-12 text-blue-dark">Frequently Asked Questions</h2>
      
      <!-- 问题列表 -->
      <div class="max-w-4xl mx-auto">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="border-b border-gray-200 py-6"
        >
          <!-- 问题标题（可点击切换展开/折叠） -->
          <div 
            class="w-full text-left flex justify-between items-center cursor-pointer" 
            @click="toggleItem(index)"
            :aria-expanded="openItems[index]"
            :aria-controls="`faq-answer-${index}`"
          >
            <h3 class="text-lg text-gray-800 font-medium flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              {{ item.question }}
            </h3>
            <!-- 箭头图标（根据展开状态旋转） -->
            <svg 
              class="w-5 h-5 text-gray-500 transform transition-transform duration-200" 
              :class="{'rotate-180': openItems[index]}"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <!-- 问题答案（展开时显示） -->
          <div 
            v-show="openItems[index]"
            class="mt-3 text-gray-600 overflow-hidden transition-all duration-300"
            :id="`faq-answer-${index}`"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
      
      <!-- 查看更多按钮 -->
      <div class="text-center mt-10">
        <div 
          @click="showMore"
          v-if="hasMoreItems"
          class="bg-blue-medium hover:bg-blue-dark text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-block"
        >
          Show More
        </div>
        <div 
          @click="showLess"
          v-else-if="visibleCount > initialVisibleCount"
          class="bg-blue-light hover:bg-blue-medium text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-block"
        >
          Show Less
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  name: 'FaqSection'
})

// FAQ数据
const allFaqItems = [
  {
    question: 'What image formats does Flux Kontext support?',
    answer: 'Flux Kontext supports various common image formats including PNG, JPG, JPEG, and WEBP. For best results, we recommend using high-quality images with a maximum file size of 5MB.'
  },
  {
    question: 'How good is Flux Kontext\'s image editing quality?',
    answer: 'Flux Kontext uses advanced AI technology to precisely edit image content while maintaining character consistency. Whether it\'s background removal, content modification, or style transformation, we ensure natural and professional quality results.'
  },
  {
    question: 'How long does it take to process an image?',
    answer: 'Typically, a regular-sized image takes 5-10 seconds to process. Processing speed depends on image size, network conditions, and the complexity of the desired edits. Our system is optimized to handle most images quickly.'
  },
  {
    question: 'How to get the best image editing results?',
    answer: 'For optimal results, use clear images and provide detailed descriptions in your text prompts. Choosing the right image size ratio is also important as it affects the quality of the final result.'
  },
  {
    question: 'Can I use Flux Kontext\'s edited images commercially?',
    answer: 'This depends on the copyright of your original image. If you own the rights to the original image or have proper usage permissions, you can use the edited images commercially. We recommend ensuring you have appropriate image usage rights.'
  },
  {
    question: 'How does Flux Kontext maintain character consistency?',
    answer: 'Flux Kontext uses advanced AI models to intelligently recognize and maintain character features and styles in images. Even during the editing process, it ensures consistent appearance, expressions, and style of characters, making the editing results more natural.'
  },
  {
    question: 'What are the system requirements?',
    answer: 'Flux Kontext is a web-based application that works on all modern browsers including Chrome, Firefox, Safari, and Edge. You only need a stable internet connection and a device that can run these browsers.'
  },
  {
    question: 'What makes Flux Kontext different from traditional image editors?',
    answer: 'Unlike traditional image editors that require manual adjustments, Flux Kontext uses AI to understand your editing intentions. It can automatically maintain image quality, preserve important details, and ensure natural-looking results without requiring professional editing skills.'
  },
  {
    question: 'What are some common use cases for Flux Kontext?',
    answer: 'Flux Kontext is ideal for various scenarios: product photography enhancement, social media content creation, e-commerce image optimization, and personal photo editing. It\'s particularly useful for removing backgrounds, adjusting image styles, and making precise content modifications while maintaining visual consistency.'
  },
  {
    question: 'Can I edit multiple images at once?',
    answer: 'Currently, Flux Kontext processes one image at a time to ensure the highest quality results. However, you can queue multiple images for sequential processing. We are working on batch processing features for future updates.'
  }
];

// 初始显示的FAQ数量
const initialVisibleCount = 4;
const visibleCount = ref(initialVisibleCount);

// 跟踪每个FAQ项的展开状态
const openItems = ref(Array(allFaqItems.length).fill(false));

// 当前显示的FAQ项目
const faqItems = computed(() => {
  return allFaqItems.slice(0, visibleCount.value);
});

// 是否还有更多FAQ可显示
const hasMoreItems = computed(() => {
  return visibleCount.value < allFaqItems.length;
});

// 切换FAQ项的展开/折叠状态
const toggleItem = (index: number) => {
  openItems.value[index] = !openItems.value[index];
};

// 显示更多FAQ
const showMore = () => {
  visibleCount.value = allFaqItems.length;
};

// 显示较少FAQ
const showLess = () => {
  visibleCount.value = initialVisibleCount;
};
</script>

<style scoped>
/* 旋转动画 */
.rotate-180 {
  transform: rotate(180deg);
}

/* 滑动过渡效果 */
.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

/* 按钮悬浮效果 */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style> 