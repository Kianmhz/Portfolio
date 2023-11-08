<script setup>
const props = defineProps(['icon', 'title', 'content']);
</script>

<template>
  <div>
    <font-awesome-icon class="skill-icon" :icon="icon" size="2xl"/>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<style scoped>
.skill-icon {
  font-size: 40px;
  transition: scale 0.2s ease-in-out;
}

.skill-icon:hover {
  scale: 1.3;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 10px 0;
}
</style>