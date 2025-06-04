<template>
  <div class="mx-auto">
    <main class="max-w-24xl mx-auto min-h-screen">
      <!-- 首屏区块 -->
      <section
        id="hero"
        class="min-h-[700px] relative pt-[64px]"
      >
        <HomeHero />
      </section>

      <!-- 对比展示模块 -->
      <section id="compare">
        <Compare />
      </section>

      <!-- 评价模块 -->
      <section id="review">
        <ReviewDisplay />
      </section>

      <!-- 定价模块 -->
      <section id="pricing">
        <PricingPlans />
      </section>

      <!-- 常见问题模块 -->
      <section id="faq">
        <FaqSection />
      </section>
    </main>
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
import { onBeforeMount,defineAsyncComponent} from "vue";
import { useSeo } from '~/composables/useSeo';

const PricingPlans = defineAsyncComponent(() => import('~/components/PricingPlans.vue'))
const HomeHero = defineAsyncComponent(() => import('~/pages/components/HomeHero.vue'))
const Compare = defineAsyncComponent(() => import('~/pages/components/Compare.vue'))
const FaqSection = defineAsyncComponent(() => import('~/pages/components/FaqSection.vue'))
const ReviewDisplay = defineAsyncComponent(() => import('~/pages/components/ReviewDisplay.vue'))

import { useToast } from '~/composables/useToast';
const { toast, showToast } = useToast();

useSeo({
  title: "Flux Kontext - AI Image Generation & Editing Platform",
  description: "Transform images with Flux Kontext's AI tools. Generate and edit using text and image prompts, featuring character consistency and precise object modification.",
  ogTitle: "Flux Kontext - AI Image Generation & Editing Platform",
  ogDescription: "Transform images with Flux Kontext's AI tools. Generate and edit using text and image prompts, featuring character consistency and precise object modification.",
  twitterTitle: "Flux Kontext - AI Image Generation & Editing Platform",
  twitterDescription: "Transform images with Flux Kontext's AI tools. Generate and edit using text and image prompts, featuring character consistency and precise object modification."
});

// 处理支付回调
onBeforeMount(() => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const paySuccess = urlParams.get("paysuccess");

  if (paySuccess == "1") {
    window.history.replaceState({}, "", window.location.pathname);
    setTimeout(() => {
      showToast("Thank you for your support! Your membership benefits are now activated.", "success");
    }, 500);
  } else if (urlParams.get("payfail") == "1") {
    window.history.replaceState({}, "", window.location.pathname);
  }
});

// 设置页面元数据
onBeforeMount(() => {
  // 结构化数据标记以提高SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Flux Kontext",
    description: "Advanced contextual image generation and editing AI platform that combines text and image prompts for precise control and consistent results.",
    applicationCategory: "ImageEditingApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Character consistency",
      "Precise object modification",
      "Local repainting",
      "Text replacement",
      "Style transfer",
      "Background changes",
      "Fast inference",
      "Composition control"
    ],
    screenshot: "/logo.png",
    applicationSubCategory: "AI Image Generation",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0"
  };
  // 添加结构化数据到页面头部
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
</script>

<style scoped>
html {
  font-size: 18px;
}
</style>