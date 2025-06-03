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
    question: 'How to remove image background?',
    answer: 'Simply upload your image and let our app do the work! XBGRemove uses AI to automatically remove photo backgrounds, giving you clean, background-free images. Our AI technology precisely identifies foreground and background elements to ensure the best results.'
  },
  {
    question: 'Can I remove backgrounds on my phone?',
    answer: 'Yes, you can use XBGRemove to remove backgrounds directly in your mobile browser. Our platform is fully mobile-compatible and requires no app installation. You can access our website through your phone\'s browser, upload images, and get results instantly.'
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support various common image formats including JPG, PNG, WEBP, and more. For best results, we recommend using high-quality images.'
  },
  {
    question: 'What is the quality of processed images?',
    answer: 'Our AI technology maintains the original image quality while precisely removing backgrounds. Processed images retain their original resolution with smooth, natural edges, making them suitable for various design applications.'
  },
  {
    question: 'How long does it take to process an image?',
    answer: 'Typically, a regular-sized image takes 2-5 seconds to process. Processing speed depends on image size and network conditions. Our system is optimized to handle most images quickly.'
  },
  {
    question: 'Can I use the processed images commercially?',
    answer: 'This depends on the copyright of your original image. If you own the rights to the original image or have proper usage permissions, you can use the processed images commercially. We recommend ensuring you have appropriate image usage rights.'
  },
  {
    question: 'How to get the best background removal results?',
    answer: 'For optimal results, use images with simple backgrounds and clear subjects. Avoid images with complex backgrounds or where the subject and background colors are similar. Using high-resolution images will yield better results when possible.'
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