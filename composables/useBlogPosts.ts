import { ref, computed } from 'vue'
import { createError } from 'nuxt/app'

// Define blog post data structure
export interface BlogPost {
  id: string;
  title: string;
  content: string; // Rich text content, includes text and images
  description: string;
  date: string;
  category: string;
  skip?: boolean;
  cta?: string;
}

// Blog post data
const blogPostsData: BlogPost[] = [
  {
    id: 'flux-kontext-introduction',
    title: 'Introducing Flux Kontext: Transform Your Images with AI Text Prompts',
    content: `
      <h2 class="text-2xl font-bold mb-4">Welcome to Flux Kontext</h2>
      <p>Experience the future of image editing with Flux Kontext, your AI-powered image transformation tool. Create stunning visuals by simply describing how you want your images to look.</p>
      
      <p>Flux Kontext brings professional-grade image editing capabilities to your fingertips, making it easy to transform your images with natural language prompts.</p>
      
      <h2>Key Features of Flux Kontext:</h2>
      <ul class="list-disc pl-5 mb-6">
        <li>Text-to-Image Editing - Transform images using natural language descriptions</li>
        <li>Usage-Based System - Simple credit system for image processing</li>
        <li>High-Quality Results - Professional-grade image transformations</li>
        <li>User-Friendly Interface - Intuitive design for seamless experience</li>
        <li>Instant Results - Quick processing with immediate preview</li>
      </ul>
      
      <p>Perfect for social media content, marketing materials, and personal projects, Flux Kontext helps you achieve professional results with minimal effort.</p>
    `,
    description: 'Discover Flux Kontext: Your AI-powered image transformation solution',
    date: '2024-03-20',
    category: 'Product Introduction',
    skip: false,
    cta: "Try Now",
  },
  {
    id: 'how-to-use-flux',
    title: 'Getting Started with Flux Kontext: A Simple Guide',
    content: `
      <h2 class="text-2xl font-bold mb-4">How to Use Flux Kontext</h2>
      <p>Learn how to use Flux Kontext to transform your images using text prompts in just a few simple steps.</p>
      
      <h3 class="text-xl font-bold my-4">Step 1: Upload Your Image</h3>
      <p>Select a single image from your device. For optimal results, choose high-quality images. Supported formats include JPG and PNG.</p>
      
      <h3 class="text-xl font-bold my-4">Step 2: Write Your Prompt</h3>
      <p>Describe how you want your image to look. Be specific about the changes you want to make, such as style, mood, or specific elements to add or modify.</p>
      
      <h3 class="text-xl font-bold my-4">Step 3: Generate and Download</h3>
      <p>Once processing is complete, you can:</p>
      <ul class="list-disc pl-5 mb-6">
        <li>Preview the transformed image</li>
        <li>Download your processed image</li>
        <li>Use your transformed image immediately</li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Best Practices</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Use clear and specific prompts</li>
        <li>Start with high-quality source images</li>
        <li>Check the preview before finalizing</li>
        <li>Experiment with different prompt styles</li>
      </ul>
      
      <p class="mt-6">Start creating amazing transformed images with Flux Kontext today!</p>
    `,
    description: 'Learn how to use Flux Kontext for image transformation with text prompts',
    date: '2024-03-20',
    category: 'Tutorial',
    skip: false,
    cta: "Start Now",
  },
  {
    id: 'flux-kontext-benefits',
    title: 'Why Choose Flux Kontext for Image Transformation',
    content: `
      <h2 class="text-2xl font-bold mb-4">The Flux Kontext Advantage</h2>
      <p>Discover why Flux Kontext is the preferred choice for AI-powered image transformation, offering a perfect balance of quality and simplicity.</p>
      
      <h3 class="text-xl font-bold my-4">Quality-First Approach</h3>
      <p>By processing one image at a time, Flux Kontext ensures the highest quality results for each transformation. Our AI technology focuses on delivering perfect image edits based on your text prompts.</p>
      
      <h3 class="text-xl font-bold my-4">Simple Usage System</h3>
      <p>No complex credit systems or subscriptions. Flux Kontext offers a straightforward usage-based approach, making it easy to manage your image processing needs.</p>
      
      <h3 class="text-xl font-bold my-4">Key Benefits</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Professional-grade transformations</li>
        <li>Simple one-image-at-a-time processing</li>
        <li>Clear usage tracking</li>
        <li>Instant preview and download</li>
        <li>User-friendly interface</li>
      </ul>
      
      <p>Experience the difference with Flux Kontext - where quality meets simplicity in image transformation.</p>
    `,
    description: 'Learn about the benefits of using Flux Kontext for image transformation',
    date: '2024-03-20',
    category: 'Product Features',
    skip: false,
    cta: "Learn More",
  }
]

export function useBlogPosts() {
  // Currently selected category
  const currentCategory = ref('all')

  // Get all blog posts
  const allPosts = computed(() => blogPostsData)

  // Filter posts by current category
  const filteredPosts = computed(() => {
    if (currentCategory.value === 'all') {
      return allPosts.value
    }
    return allPosts.value.filter(post => post.category === currentCategory.value)
  })

  // Get a single post by ID
  const getPostById = (id: string): BlogPost => {
    const post = blogPostsData.find(post => post.id === id)
    
    if (!post) {
      throw createError({
        statusCode: 404,
        message: 'Article not found'
      })
    }
    
    return post
  }

  // Get category label
  const getCategoryLabel = (category: string) => {
    return category
  }

  // Get all available categories
  const allCategories = computed(() => {
    const categories = new Set<string>()
    blogPostsData.forEach(post => {
      categories.add(post.category)
    })
    return Array.from(categories)
  })

  return {
    currentCategory,
    allPosts,
    filteredPosts,
    getPostById,
    getCategoryLabel,
    allCategories
  }
} 