<script setup>
const props = defineProps(['title', 'content']);
</script>

<template>
    <div>
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
</template>
  
