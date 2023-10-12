<script setup>
const props = defineProps(['icon', 'title', 'content']);
</script>

<template>
  <div>
    <font-awesome-icon :icon="icon" size="2xl"/>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>