<template>
  <div class="mx-auto">
    <main class="max-w-24xl mx-auto min-h-screen">
      <!-- 首屏区块 -->
      <section
        id="hero"
        class="hero-gradient-bg flex flex-col items-center justify-center min-h-[600px] relative pt-32"
      >
        <HomeHero />
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
import { useToast } from '~/composables/useToast';
import { useSeo } from '~/composables/useSeo';

const PricingPlans = defineAsyncComponent(() => import('~/components/PricingPlans.vue'))
const HomeHero = defineAsyncComponent(() => import('~/pages/components/HomeHero.vue'))
const FaqSection = defineAsyncComponent(() => import('~/pages/components/FaqSection.vue'))

const { toast, showToast } = useToast();

useSeo({
  title: "Black Cross Removed Background - Background Removal Tool",
  description: "Remove black cross backgrounds with AI. Get clean, transparent PNGs instantly. Perfect for professional use and avoiding religious conflicts.",
  ogTitle: "Black Cross Removed Background - AI Image Tool",
  ogDescription: "Remove black cross backgrounds with AI. Get clean, transparent PNGs instantly. Perfect for professional use and avoiding religious conflicts.",
  twitterTitle: "Black Cross Removed Background - AI Image Tool",
  twitterDescription: "Remove black cross backgrounds with AI. Get clean, transparent PNGs instantly. Perfect for professional use and avoiding religious conflicts."
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
    name: "Black Cross Background Remover",
    description:
      "Professional Black Cross Background Remover tool. Create clean, professional images with our advanced AI technology.",
    applicationCategory: "ImageEditingApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
  // 添加结构化数据到页面头部
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
</script>

<style scoped>
.hero-gradient-bg {
  background: linear-gradient(135deg, #fef2e8 0%, #e8ecff 50%, #faf0ff 100%);
}

html {
  font-size: 18px;
}
</style>