<script setup>
const contentCards = ref([
  { id: 1, title: "title", content: "Lorem ipsum..." },
  { id: 2, title: "title", content: "Lorem ipsum..." },
  { id: 3, title: "title", content: "Lorem ipsum..." },
  { id: 4, title: "title", content: "Lorem ipsum..." }
]);
</script>

<template>
  <div class="grid grid-cols-2 gap-[5rem]">
    <skillsets v-for="card in contentCards" :key="card.id" :title="card.title" :content="card.content" />
  </div>
</template>