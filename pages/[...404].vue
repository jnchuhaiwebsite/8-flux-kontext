<template>
  <div class="error-container">
    <h1 class="error-title">404</h1>
    <p class="error-message">Sorry, the page you visited does not exist</p>
    <p class="error-submessage">The page may have been removed or the link is incorrect</p>
    <div class="action-buttons">
      <NuxtLink to="/" class="back-home-link">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

useHead({
  title: 'Page Not Found - 404 Error - Black Cross Background Remover',
  meta: [
    {
      name: 'description',
      content: 'Sorry, the page you requested does not exist. Please return to the homepage or use the navigation menu to find what you need.'
    },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
  background-color: #f8fafc;
}

.error-title {
  font-size: 120px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 20px;
  line-height: 1;
}

.error-message {
  font-size: 28px;
  color: #334155;
  margin-bottom: 10px;
}

.error-submessage {
  font-size: 18px;
  color: #64748b;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.back-home-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
}

.back-home-link:hover {
  background-color: #2563eb;
}
</style> 