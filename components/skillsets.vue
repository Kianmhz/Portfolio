<script setup>
const props = defineProps(['icon', 'title', 'content']);
</script>

<template>
  <div class="skillsets">
    <font-awesome-icon class="skill-icon" :icon="icon" size="2xl"/>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<style scoped>
.skill-icon {
  font-size: 40px;
  transition: all 0.2s ease-in-out;
}

.skillsets:hover .skill-icon {
  transform: scale(1.2);
  color: var(--main-color)
}

h2 {
  @apply text-[1.2rem] font-[700] my-[10px];
}
</style>