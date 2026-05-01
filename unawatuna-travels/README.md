# StoreFront (CS3404 Mini Project)

A responsive Data-Driven Single Page Application built with Vue 3, TypeScript, and Tailwind CSS.

## Features Implemented
- **Vue 3 Composition API**: Used modern Vue 3 composition API with `<script setup>`.
- **Strict TypeScript Types**: Created interfaces in `src/types/index.ts`. No `any` types.
- **Component Architecture**: Used logical, reusable components (`NavBar`, `ProductCard`, `FilterBar`).
- **Data Fetching**: Connected to `dummyjson.com/products` to fetch products and categories.
- **Search & Filtering**: Search by product title or filter by category on the Home page.
- **Responsiveness**: Fully responsive using Tailwind CSS grid and flex utilities.
- **Detail View**: Product clicking routes to a detailed view using `vue-router`.
- **Bonus - Authentication**: Simulated login (emilys / emilyspass) using DummyJSON Auth API and Pinia store.
- **Bonus - Shopping Cart**: Global cart state persisted to `localStorage` using Pinia.
- **Bonus - Dynamic Routing**: Product IDs are passed to routes dynamically (`/product/:id`).
- **Bonus - Dark Mode**: Toggleable light/dark themes utilizing Tailwind's `dark:` classes.

## Prerequisites
- Node.js (v18+)
- npm (v9+)

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Dummy Login Credentials
- **Username**: `emilys`
- **Password**: `emilyspass`