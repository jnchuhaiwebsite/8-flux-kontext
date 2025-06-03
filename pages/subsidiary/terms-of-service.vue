<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="mb-6">
      <NuxtLink to="/" class="flex items-center text-gray-600 hover:text-gray-900">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </NuxtLink>
    </div>

    <h1 class="text-3xl font-bold mb-8">Terms of Service</h1>
    
    <div class="space-y-6">
      <section>
        <h2 class="text-2xl font-semibold mb-4">Welcome</h2>
        <p class="text-gray-700">Welcome to our professional black cross background removal service. By using our services, you agree to these terms. Please read them carefully.</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Service Description</h2>
        <p class="text-gray-700">We provide a professional black cross background removal service that allows users to easily remove black cross backgrounds from their images. Our service includes the following features:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Black Cross Background Removal: Professional removal of black cross backgrounds from user-uploaded images</li>
          <li>Multiple Processing Options: Various background removal techniques and image enhancement features</li>
          <li>Download and Save Processed Images</li>
          <li>Batch Processing Capability for Black Cross Background Images</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Account Usage</h2>
        <p class="text-gray-700">You may need to create an account to use certain features of our services. You must:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Provide accurate, complete, and up-to-date account information</li>
          <li>Maintain the security of your account and be fully responsible for all account activities</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
          <li>Not share your account with others or transfer your account</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Rules of Service Use</h2>
        <p class="text-gray-700">When using our services, you agree not to:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Generate or upload any illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable content</li>
          <li>Infringe upon the intellectual property rights or other rights of others</li>
          <li>Circumvent our usage restrictions or access control measures</li>
          <li>Use any automated means to access the service unless specifically permitted</li>
          <li>Engage in activities that may damage the service, user experience, or our infrastructure</li>
          <li>Resell or redistribute processed images for commercial purposes unless specifically authorized</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Generated Content</h2>
        <p class="text-gray-700">Regarding images processed using our black cross background removal service:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Personal Use: You may use processed images for personal and non-commercial purposes free of charge</li>
          <li>Commercial Use: Commercial usage requires additional authorization or subscription to the appropriate commercial plan</li>
          <li>Attribution: We encourage but do not require mentioning our service when using processed images</li>
          <li>Control: We reserve the right to remove any processed content that violates these terms</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Subscriptions and Payments</h2>
        <p class="text-gray-700">We offer subscription plans with the following terms:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Free Trial: New users receive two free black cross background removal generations upon registration. After using these free trials, a subscription is required to continue using the service</li>
          <li>Payment Methods: We accept various payment methods, depending on your location</li>
          <li>Subscription Renewal: Subscriptions will automatically renew unless you cancel</li>
          <li>Price Changes: We may change prices, but we will notify existing subscribers in advance</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p class="text-gray-700">Regarding intellectual property rights involved in our service:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Service Content: Our website, services, and black cross background removal technology are protected by intellectual property laws</li>
          <li>User Content: You retain all rights to your uploaded content but grant us usage rights to provide the service</li>
          <li>Processed Content: Usage rights for processed black cross background removal images depend on your subscription plan</li>
          <li>Feedback: Feedback you provide about our service may be freely used by us</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p class="text-gray-700">Our services are provided "as is" without any warranties of any kind. To the maximum extent permitted by law:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>We are not responsible for service interruptions, delays, or inaccuracies</li>
          <li>We are not responsible for any consequences that may result from your use of processed black cross background removal images</li>
          <li>Our liability for any damages you may suffer is limited to the amount you have paid to us</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Service Changes and Termination</h2>
        <p class="text-gray-700">We may:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Modify, suspend, or terminate any aspect of the black cross background removal service at any time</li>
          <li>Suspend or terminate your access in case of violation of these terms</li>
          <li>Notify users when significant changes to the service occur</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Terms Updates</h2>
        <p class="text-gray-700">We may update these Terms of Service from time to time. Significant changes will be communicated via email or in-service notifications. Continued use of our black cross background removal service after such changes indicates your acceptance of the modified terms.</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
        <p class="text-gray-700">If you have any questions about these Terms of Service, please contact us:</p>
        <p class="text-gray-700 mt-2">Email: ceo@ghiblimagicmaker.com</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead,useRequestURL } from 'nuxt/app'

const url = useRequestURL();
const baseUrl = url.origin;

// @ts-ignore: Nuxt宏函数
definePageMeta({
  layout: false,
  name: 'terms-of-service'
})


useHead({
  title: 'Black Cross Background Remover | Terms of Service & Usage Rules',
  meta: [
    { name: 'description', content: 'Professional Black Cross Background Removal Service Terms: Learn about our AI-powered background removal service, account usage, image processing rights, and commercial usage terms.' },
  ],
  link: [{ rel: 'canonical', href: `${baseUrl}/subsidiary/terms-of-service` }]
})
</script> 