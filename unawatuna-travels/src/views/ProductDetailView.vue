<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-md">
      <p class="text-red-700 dark:text-red-200">{{ error }}</p>
      <button @click="router.back()" class="mt-4 text-indigo-600 dark:text-indigo-400 font-medium">Go Back</button>
    </div>
    
    <div v-else-if="product" class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div class="md:flex">
        <div class="md:flex-shrink-0 md:w-1/2 bg-slate-100 dark:bg-slate-700 p-8 flex items-center justify-center">
          <img class="w-full h-auto object-contain max-h-[400px] mix-blend-multiply dark:mix-blend-normal" :src="activeImage" :alt="product.title" />
        </div>
        
        <div class="p-8 md:w-1/2 flex flex-col">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">{{ product.category }}</div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{{ product.title }}</h1>
          
          <div class="flex items-center mb-4">
            <div class="flex items-center text-yellow-400 text-sm">
              <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <span class="text-slate-600 dark:text-slate-300 ml-1">{{ product.rating }} Rating</span>
            </div>
            <span class="mx-3 text-slate-300 dark:text-slate-600">|</span>
            <span class="text-slate-600 dark:text-slate-300">{{ product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock' }}</span>
          </div>
          
          <p class="mt-2 text-slate-600 dark:text-slate-300 flex-grow">{{ product.description }}</p>
          
          <div class="mt-6 flex space-x-2 overflow-x-auto pb-2">
             <button 
               v-for="(img, idx) in product.images" 
               :key="idx"
               @click="activeImage = img"
               class="flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden"
               :class="activeImage === img ? 'border-indigo-500' : 'border-transparent'"
             >
               <img :src="img" class="w-full h-full object-cover" />
             </button>
          </div>

          <div class="mt-8 flex items-end justify-between">
            <div>
              <p class="text-3xl font-bold text-slate-900 dark:text-white">${{ product.price }}</p>
              <p v-if="product.discountPercentage > 0" class="text-sm text-red-500 font-medium mt-1">
                {{ product.discountPercentage }}% OFF
              </p>
            </div>
            <button 
              @click="addToCart"
              class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Product } from '../types';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const activeImage = ref('');

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const data: Product = await res.json();
    product.value = data;
    activeImage.value = data.thumbnail;
  } catch (err: any) {
    error.value = err.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
});

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
  }
};
</script>
