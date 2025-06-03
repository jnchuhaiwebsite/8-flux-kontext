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
    id: 'black-cross-background-removal',
    title: 'Professional Black Cross Background Removal: Transform Your Images',
    content: `
      <h2 class="text-2xl font-bold mb-4">Professional Black Cross Background Removal</h2>
      <p>Discover the power of AI-powered black cross background removal technology. Transform your images with precision and ease, creating stunning visuals with transparent backgrounds.</p>
      
      <p>Black cross background removal has revolutionized image editing, allowing professionals and enthusiasts alike to create clean, professional-looking images without complex editing software.</p>
      
      <p>Our advanced AI technology ensures precise edge detection and smooth background removal, even for complex images with intricate details around the black cross symbol.</p>
      
      <h2>Key features of our black cross background removal tool:</h2>
      <ul class="list-disc pl-5 mb-6">
        <li>One-Click Removal - Instantly remove backgrounds with a single click</li>
        <li>High Precision - Maintains perfect edges around the black cross</li>
        <li>Smart Detection - Automatically identifies and preserves the black cross</li>
        <li>Quality Preservation - Maintains original image quality and details</li>
        <li>Instant Preview - See results in real-time before downloading</li>
      </ul>
      
      <p>Whether you're creating marketing materials, social media content, or professional presentations, our black cross background removal tool helps you achieve perfect results every time.</p>
    `,
    description: 'Learn about professional black cross background removal technology and its applications',
    date: '2025-05-28',
    category: 'Creative Inspiration',
    skip: false,
    cta: "Start Removing",
  },
  {
    id: 'feature-update',
    title: 'New Update: Enhanced Black Cross Background Removal Features',
    content: `
      <h2 class="text-2xl font-bold mb-4">Latest Update Announcement</h2>
      <p>We're excited to announce significant improvements to our black cross background removal technology, making it more powerful and user-friendly than ever.</p>
      
      <h3 class="text-xl font-bold my-4">New Features</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Advanced Edge Detection - Improved accuracy for complex black cross patterns</li>
        <li>Enhanced Preview - Real-time preview of the removed background</li>
        <li>Improved Processing Speed - Faster background removal for all image sizes</li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Fixed Issues</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Improved handling of complex black cross patterns</li>
        <li>Enhanced processing speed for large images</li>
        <li>Better preservation of fine details</li>
        <li>Optimized memory usage for faster processing</li>
      </ul>
      
      <p>These improvements were implemented based on user feedback to provide the best possible background removal experience for black cross images.</p>
    `,
    description: 'Latest version released: enhanced black cross background removal capabilities',
    date: '2025-05-28',
    category: 'Feature Updates',
    skip: false,
    cta: "Learn More",
  },
  {
    id: 'background-removal-tutorial',
    title: 'Quick Guide: Perfect Black Cross Background Removal',
    content: `
      <h2 class="text-2xl font-bold mb-4">Complete Guide to Black Cross Background Removal</h2>
      <p>Follow this simple guide to achieve perfect background removal for your black cross images.</p>
      
      <h3 class="text-xl font-bold my-4">Step 1: Upload Your Image</h3>
      <p>Click the upload area or drag and drop your image containing the black cross. For best results, use high-quality images with clear contrast between the black cross and background. Supported formats include JPG and PNG, with a maximum file size of 10MB.</p>
      
      <h3 class="text-xl font-bold my-4">Step 2: Process Your Image</h3>
      <p>Click "Remove Background" to start the process. The system will automatically detect and preserve the black cross while removing the background.</p>
      
      <h3 class="text-xl font-bold my-4">Step 3: Download</h3>
      <p>Once processing is complete, you can:</p>
      <ul class="list-disc pl-5 mb-6">
        <li>Preview the result with transparent background</li>
        <li>Download the transparent PNG</li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Pro Tips</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Ensure good lighting in your original image for best results</li>
        <li>Save in PNG format to preserve transparency</li>
        <li>Use the preview feature to check edge quality before finalizing</li>
        <li>For best results, use images with clear contrast between the black cross and background</li>
      </ul>
      
      <p class="mt-6">With these steps, you can achieve professional-quality background removal for your black cross images in minutes.</p>
    `,
    description: 'Learn how to use our AI tool for perfect black cross background removal',
    date: '2025-05-28',
    category: 'Tutorial',
    skip: false,
    cta: "Start Learning",
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