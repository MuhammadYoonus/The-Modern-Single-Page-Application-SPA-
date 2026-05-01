<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <svg class="mx-auto h-24 w-24 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="text-2xl font-medium text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
      <p class="text-slate-500 dark:text-slate-400 mb-6">Looks like you haven't added anything yet.</p>
      <router-link to="/" class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
        Start Shopping
      </router-link>
    </div>

    <div v-else class="lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-8">
        <ul role="list" class="border-t border-b border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
          <li v-for="item in cartStore.items" :key="item.id" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <img :src="item.thumbnail" :alt="item.title" class="w-24 h-24 rounded-md object-contain object-center sm:w-32 sm:h-32 bg-slate-100 dark:bg-slate-700 p-2" />
            </div>

            <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white">
                      <router-link :to="`/product/${item.id}`">{{ item.title }}</router-link>
                    </h3>
                  </div>
                  <div class="mt-1 flex text-sm">
                    <p class="text-slate-500 dark:text-slate-400">{{ item.brand }}</p>
                  </div>
                  <p class="mt-1 text-sm font-medium text-slate-900 dark:text-white">${{ item.price }}</p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="flex items-center border border-slate-300 dark:border-slate-600 rounded-md w-max">
                    <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">-</button>
                    <span class="px-3 py-1 font-medium text-slate-900 dark:text-white">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
                  </div>

                  <div class="absolute top-0 right-0">
                    <button @click="cartStore.removeFromCart(item.id)" type="button" class="-m-2 p-2 inline-flex text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                      <span class="sr-only">Remove</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <p class="mt-4 flex space-x-2 text-sm text-slate-700 dark:text-slate-300">
                <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>In stock</span>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Order summary -->
      <div class="mt-16 bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 class="text-lg font-medium text-slate-900 dark:text-white">Order summary</h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-slate-600 dark:text-slate-400">Subtotal</dt>
            <dd class="text-sm font-medium text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</dd>
          </div>
          <div class="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <dt class="text-base font-medium text-slate-900 dark:text-white">Order total</dt>
            <dd class="text-base font-medium text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</dd>
          </div>
        </dl>

        <div class="mt-6">
          <button @click="handleCheckout" class="w-full bg-indigo-600 border border-transparent rounded-xl shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-800 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const handleCheckout = () => {
  if (!authStore.isAuthenticated) {
    alert('Please login to checkout.');
    router.push('/login');
    return;
  }
  
  if (confirm(`Total is $${cartStore.totalPrice.toFixed(2)}. Proceed to dummy payment?`)) {
    alert('Order placed successfully!');
    cartStore.clearCart();
    router.push('/');
  }
};
</script>
