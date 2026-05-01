<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700 dark:text-red-200">{{ error }}</p>
        </div>
      </div>
    </div>
    
    <div v-else>
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Products</h1>
        <p class="mt-2 text-lg text-slate-500 dark:text-slate-400">Discover top quality items across all categories.</p>
      </div>

      <FilterBar 
        :categories="categories" 
        @search="handleSearch" 
        @filter="handleFilter" 
      />
      
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-slate-900 dark:text-white">No products found</h3>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Product, ProductsResponse } from '../types';
import ProductCard from '../components/ProductCard.vue';
import FilterBar from '../components/FilterBar.vue';

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const searchQuery = ref('');
const selectedCategory = ref('');

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=50'),
      fetch('https://dummyjson.com/products/categories')
    ]);
    
    if (!productsRes.ok || !categoriesRes.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const productsData: ProductsResponse = await productsRes.json();
    const categoriesData = await categoriesRes.json();
    
    products.value = productsData.products;
    // Map categories depending on the API structure
    categories.value = categoriesData.map((c: any) => typeof c === 'string' ? c : c.slug);
  } catch (err: any) {
    error.value = err.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
});

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleFilter = (category: string) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>
