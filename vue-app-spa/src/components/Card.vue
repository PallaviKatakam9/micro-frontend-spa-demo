<template>
    <div key={productObj.id} className='bg-white rounded-lg border-2 border-black p-3 min-h-max flex flex-col justify-between'>
        <img className='h-48 object-contain mx-auto' :src= props?.productObj?.images[0] />
        <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-900">{{ props?.productObj.title }}</h3>
        <p className="mt-1 text-lg font-bold text-indigo-600">${{ props.productObj.price }}</p>
        <div className="mt-1">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-500">{{ props.productObj?.rating }}</span>
        </div>
        <button class="w-full bg-indigo-600 text-white text-sm py-2 rounded-xl hover:bg-indigo-700 transition"> Add to Cart </button>
        </div>
    </div> 
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps(['productObj'])
</script>
