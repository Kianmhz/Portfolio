<script setup>
const contactItems = ref([
  { title: "Linkedin", description: "Connect with me professionally and let's build bridges.", icon: ['fab', 'linkedin'] },
  { title: "Email", description: "Reach out directly for inquiries, collaborations, or just to say hi.", icon: ['fas', 'envelope'] },
  { title: "Codepen", description: "Explore my snippets, experiments, and innovative solutions.", icon: ['fab', 'codepen'] }
]);
</script>

<template>
  <div class=" grid grid-cols-3 gap-x-5">
    <contacts v-for="item in contactItems" :key="item.title" :title="item.title" :description="item.description"
      :icon="item.icon" />
  </div>
</template>