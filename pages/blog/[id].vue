<template>
  <div class="min-h-screen blog-page-gradient">
    <div class="pt-32 py-10 mx-auto w-11/12 max-w-4xl">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center text-gray-600 hover:text-blue-medium transition-colors mb-8"
        @click.prevent="handleBackToList"
      >
        <div class="arrow-left"></div>
        Back to List
      </NuxtLink>

      <article v-if="post" class="prose prose-slate max-w-none bg-white p-6 md:p-8 rounded-xl shadow-sm">
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-blue-dark border-l-4 border-blue-medium pl-4">{{ post.title}}</h1>
        
        <div class="flex items-center gap-2 mb-8 text-gray-500 text-sm">
          <span>{{ post.date }}</span>
          <span class="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
          <span class="px-2 py-1 category-badge text-xs rounded-full">
            {{ post.category }}
          </span>
        </div>

        <!-- Rich text content -->
        <div class="text-gray-700" v-html="post.content"></div>

        <!-- Related articles section -->
        <div class="mt-12 pt-8 border-t border-gray-200" v-if="relatedPosts.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink 
              v-for="relatedPost in relatedPosts" 
              :key="relatedPost.id"
              :to="`/blog/${relatedPost.id}`"
              class="p-4 border border-gray-100 rounded-lg hover:bg-blue-pale transition-colors"
            >
              <h2 class="font-medium mb-2 text-lg">{{ relatedPost.title }}</h2>
              <p class="text-sm text-gray-600 line-clamp-2">{{ relatedPost.description }}</p>
            </NuxtLink>
          </div>
        </div>

        <!-- Action button -->
        <div class="text-center mt-12">
          <h3 class="font-medium mb-4">Return to Homepage</h3>
          <NuxtLink
            to="/"
            class="inline-block px-6 py-3 bg-blue-medium hover:bg-blue-dark text-white rounded-lg transition-colors font-medium"
          >
            👉 Back to Home
          </NuxtLink>
        </div>
      </article>
      <div v-else class="text-center py-12">
        <p class="text-gray-600">The article does not exist or has been deleted.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogPosts } from '~/composables/useBlogPosts';
import { useSeo } from '~/composables/useSeo';

const route = useRoute();
const router = useRouter();

//获取文章数据
const { getPostById, allPosts } = useBlogPosts();

//获取文章内容
const post = computed(() => {
  const postId = route.params.id as string;
  if(!postId) {
    return null;
  }
  try {
    const foundPost = getPostById(postId);
    if (!foundPost) {
      router.push('/404');
      return null;
    }
    return foundPost;
  } catch (error) {
    router.push('/404');
    return null;
  }
});

//获取相关文章
const relatedPosts = computed(() => {
  if (!post.value) return [];
  return allPosts.value
    .filter(p => p.category === post.value?.category && p.id !== post.value?.id)
    .slice(0, 2); // Just show maximum 2 related posts
});

//获取文章描述
const metaDescription = computed(() => {
  if (!post.value) return '';
  return post.value.description.length > 155 
    ? post.value.description.substring(0, 155) + '...'
    : post.value.description;
});

//获取文章标题
const title = computed(() => {
  if (!post.value) return '';
  return post.value.title.length > 55 
    ? post.value.title.substring(0, 55) + '...' 
    : post.value.title;
});
//设置页面元数据
useSeo({
  title: title.value,
  description: metaDescription.value,
  ogType: 'article',
  other: [
    { property: 'article:published_time', content: post.value?.date || '' },//文章发布时间
    { property: 'article:section', content: post.value?.category || '' },//文章分类
  ]
});

//返回列表
const handleBackToList = () => {
  router.push('/blog');
};
</script>

<style>
.arrow-left {
  width: 10px;
  height: 10px;
  border-left: 2px solid #6b7280;
  border-bottom: 2px solid #6b7280;
  transform: rotate(45deg);
  margin-right: 8px;
  transition: border-color 0.2s;
}

.hover\:text-blue-medium:hover .arrow-left {
  border-left-color: var(--theme-primary);
  border-bottom-color: var(--theme-primary);
}

/* 类别标签样式 */
.category-badge {
  background-color: var(--theme-primary);
  color: white;
}
</style>