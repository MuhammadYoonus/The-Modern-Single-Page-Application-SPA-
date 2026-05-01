<template>
  <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center border border-slate-100 dark:border-slate-700">
    <div class="relative w-full sm:w-96">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="emitSearch"
        placeholder="Search products..." 
        class="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      />
    </div>
    
    <div class="w-full sm:w-auto">
      <select 
        v-model="selectedCategory" 
        @change="emitCategory"
        class="block w-full pl-3 pr-10 py-2 text-base border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ formatCategory(category) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'filter', category: string): void;
}>();

const searchQuery = ref('');
const selectedCategory = ref('');

const emitSearch = () => {
  emit('search', searchQuery.value);
};

const emitCategory = () => {
  emit('filter', selectedCategory.value);
};

const formatCategory = (category: string) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>
