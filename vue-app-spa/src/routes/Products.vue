<template>
  <div>
    <h1>Cart Items: {{ hostState.cart?.items?.length || 0 }}</h1>
    <h1>Products Items: {{ hostState.storeAproducts?.products?.length || 0 }}</h1>

    <h2>Products:</h2>
    <ul>
      <li v-for="product in hostState.storeAproducts?.products || []" :key="product.id">
        {{ product.title }} - ${{ product.price }}
      </li>
    </ul>

    <button @click="addItem">Add Item</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { hostState, initHostStore, dispatchToHost } from '../store/hostStore.js';

const products = hostState?.storeAproducts?.products;

console.log('Products:', products);

onMounted(async () => {
  await initHostStore();
  const {fetchStoreAProducts} = await import("host_app/store/apis");
  dispatchToHost(fetchStoreAProducts())
});

function addItem() {
  dispatchToHost('addToCart',{ id: Date.now(), name: 'New Product' });
}

</script>

