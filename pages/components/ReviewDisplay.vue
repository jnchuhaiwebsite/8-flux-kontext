<template>
  <div class="review-section py-16 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
        <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">Hear from our customers about their experience with Flux Kontext</p>
        <div class="flex items-center justify-center">
          <div class="flex text-yellow-400 text-xl">
            <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.id" class="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center mb-6">
            <div class="w-14 h-14 rounded-full flex items-center justify-center" :class="review.bgColor">
              <span class="text-xl font-semibold" :class="review.textColor">{{ review.initial }}</span>
            </div>
            <div class="ml-5">
              <h3 class="font-semibold text-gray-800 text-lg">{{ review.name }}</h3>
              <div class="flex text-yellow-400 mt-1">
                <svg v-for="n in review.rating" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <p class="text-gray-600 leading-relaxed">{{ review.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const reviews = [
  {
    id: 1,
    name: 'John Smith',
    initial: 'J',
    rating: 5,
    content: "Flux Kontext's character consistency feature is revolutionary. The way it maintains visual coherence across multiple generations while allowing precise object modifications is truly impressive. It's transformed our character design workflow!",
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    initial: 'S',
    rating: 5,
    content: "The style transfer and background change capabilities in Flux Kontext are game-changing. Being able to transform images while maintaining visual consistency has significantly improved our creative process.",
    bgColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    id: 3,
    name: 'Michael Brown',
    initial: 'M',
    rating: 5,
    content: "Flux Kontext's composition control and style transfer features are outstanding. The ability to precisely control camera angles, poses, and background changes while maintaining visual consistency has revolutionized our creative workflow.",
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  }
]
</script>

<style scoped>
.review-section {
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
}

.fa-star {
  margin-right: 2px;
}
</style> 