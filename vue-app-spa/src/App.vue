<template>
  <div class="text-3xl mx-auto max-w-6xl"> 
     <router-view></router-view>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { hostState, initHostStore, dispatchToHost } from './store/hostStore.js';

  onMounted(async () => {
    await initHostStore();
  });

</script>
