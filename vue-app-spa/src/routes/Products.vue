<template>
  <div>
    <h1>Products Items: {{ hostState.storeBProducts?.products?.length || 0 }}</h1>

    <div class='grid grid-cols-4 gap-4'>
      <Card :productObj=product v-for="product in hostState.storeBProducts?.products" :key="product.id" />
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Card from '../components/Card.vue';
import { hostState, initHostStore, dispatchToHost } from '../store/hostStore.js';

const products = hostState?.storeBProducts?.products;

onMounted(async () => {
  await initHostStore();
  const {fetchStoreBProducts} = await import("host_app/store/apis");
  dispatchToHost(fetchStoreBProducts())
});

function addItem() {
  dispatchToHost('addToCart',{ id: Date.now(), name: 'New Product' });
}

</script>

