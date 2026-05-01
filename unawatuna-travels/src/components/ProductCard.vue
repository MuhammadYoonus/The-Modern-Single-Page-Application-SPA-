<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-slate-100 dark:border-slate-700">
    <!-- Image container -->
    <div class="relative pt-[100%] overflow-hidden bg-slate-100 dark:bg-slate-700 cursor-pointer" @click="goToDetail">
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="absolute inset-0 w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500 p-4"
      />
      <div v-if="product.discountPercentage > 10" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        -{{ Math.round(product.discountPercentage) }}%
      </div>
    </div>
    
    <!-- Content container -->
    <div class="p-5 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1 cursor-pointer" @click="goToDetail" :title="product.title">
          {{ product.title }}
        </h3>
        <span class="flex items-center text-yellow-400 text-sm">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          {{ product.rating }}
        </span>
      </div>
      
      <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-grow">
        {{ product.description }}
      </p>
      
      <div class="flex justify-between items-center mt-auto">
        <div class="flex flex-col">
          <span class="text-xl font-bold text-slate-900 dark:text-white">${{ product.price }}</span>
        </div>
        
        <button 
          @click.stop="addToCart"
          class="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          title="Add to Cart"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Product } from '../types';
import { useCartStore } from '../stores/cart';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();

const goToDetail = () => {
  router.push(`/product/${props.product.id}`);
};

const addToCart = () => {
  cartStore.addToCart(props.product);
};
</script>
