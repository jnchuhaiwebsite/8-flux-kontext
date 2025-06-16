<template>
  <footer class="relative bg-gradient-to-b from-baby-pink/10 to-baby-blue/10 text-gray-800 py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4">
      
      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-12 mb-8 md:mb-12">
        <!-- 友情链接区域 -->
        <div class="md:w-1/3">
          <h3 class="text-baby-coral font-medium mb-4 text-left text-sm md:text-lg">Partner Sites</h3>
          <div class="flex flex-wrap gap-3">
            <a v-for="(item,index) in partnerSites" :key="index" 
               :href="item.url" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="text-gray-700 hover:text-baby-coral transition-colors text-sm">
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- 导航链接和法律条款 -->
        <div class="md:w-2/3 grid grid-cols-2 sm:grid-cols-2 gap-6 md:gap-8">
          <!-- 导航链接 -->
          <div>
            <h3 class="text-baby-coral font-medium mb-4 text-sm md:text-lg">Navigation</h3>
            <div class="flex flex-col gap-2">
              <template v-for="(section, index) in sections" :key="index">
                <NuxtLink v-if="section.href" :to="section.href" 
                  class="text-gray-700 hover:text-baby-coral transition-colors">
                  {{ section.name }}
                </NuxtLink>
                <div v-else @click.prevent="handleNavClick(section.id)" 
                  class="text-gray-700 hover:text-baby-coral transition-colors cursor-pointer"
                  :class="{ 'text-baby-coral': activeSection === section.id }">
                  {{ section.name }}
                </div>
              </template>
            </div>
          </div>

          <!-- 法律条款 -->
          <div>
            <h3 class="text-baby-coral font-medium mb-4 text-sm md:text-lg">Legal</h3>
            <div class="flex flex-col gap-2">
              <NuxtLink to="/subsidiary/privacy-policy" class="text-gray-700 hover:text-baby-coral transition-colors">Privacy Policy</NuxtLink>
              <NuxtLink to="/subsidiary/terms-of-service" class="text-gray-700 hover:text-baby-coral transition-colors">Terms of Service</NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Logo 和描述 -->
      <div class="py-6 border-t border-baby-pink/20">
        <div class="flex flex-col items-center text-center">
          <img src="/logo.png" alt="Flux Kontext - AI Image Editing & Background Removal" loading="lazy" class="h-16 md:h-24 mb-4">
          <p class="text-sm text-gray-700 max-w-xl mb-4">
            Transform your images with Flux Kontext's AI-powered editing tools. Edit images with text prompts, remove backgrounds, and maintain character consistency in your creations.
          </p>
          <div class="flex flex-col items-center gap-2 text-sm text-gray-600">
            <p>© 2025 Flux Kontext. All rights reserved.</p>
            <div class="flex items-center gap-2">
              <span>Contact:</span>
              <a href="mailto:support@kontextimg.com" class="hover:text-baby-coral transition-colors" style="color: #2a5ff6;">support@kontextimg.com</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { useNavigation } from '~/utils/navigation'

// 使用导航工具
const { activeSection, sections, handleNavClick, handleScroll } = useNavigation()

const partnerSites = [
  // 济南
  { url: 'https://ghiblimagicmaker.com/', name: 'Ghibli Magic Maker' },
  { url: 'https://www.ghiblitattoo.com/en', name: 'Ghibli Tattoo' },
  { url: 'https://www.girlaniai.com', name: 'Cool Anime Girl Wallpapers ' },
  { url: 'https://www.invictgen.com/', name: 'InvinCard' },
  { url: 'https://www.pencilartai.com/', name: ' PencilArtMagic ' },
  { url: 'https://www.kontextimg.com/', name: 'Erase BG' },
  { url: 'https://www.genbabyname.com/', name: 'NamiGenie' },
  // 莱芜
  { url: ' https://www.framepola.com/', name: 'Framepola' },
  { url: 'https://www.imagefusionai.com/', name: 'ImageFusion' },
  { url: 'https://www.aioutfitgen.com/', name: 'Aioutfitgen' },
  { url: 'https://www.seedancepro.com/', name: 'Seedance 1.0 pro' },
]
</script>

<style scoped>
/* 导航链接悬停效果 */
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #2a5ff6;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style> 
