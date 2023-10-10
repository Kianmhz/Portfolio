<script setup>
const contactItems = ref([
    { title: "Linkedin", description: "Lorem ipsum dolor sit amet, consectetur adipiscing", icon: ['fab', 'linkedin'] },
    { title: "Email", description: "Lorem ipsum dolor sit amet, consectetur adipiscing", icon: ['fas', 'envelope'] },
    { title: "Codepen", description: "Lorem ipsum dolor sit amet, consectetur adipiscing", icon: ['fab', 'codepen'] }
]);
</script>

<template>
    <div class=" grid grid-cols-3 gap-x-5">
      <contacts 
        v-for="item in contactItems"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
      />
    </div>
</template>