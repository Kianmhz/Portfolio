<script setup>
const contactItems = ref([
  { title: "Linkedin", link: "https://www.linkedin.com/in/kianmhz/", description: "Connect with me professionally and let's build bridges.", icon: ['fab', 'linkedin'] },
  { title: "Email", link: "mailto:haddad.kianm@gmail.com", description: "Reach out directly for inquiries, collaborations, or just to say hi.", icon: ['fas', 'envelope'] },
  { title: "Codepen", link: "https://codepen.io/Kianmhz", description: "Explore my snippets, experiments, and innovative solutions.", icon: ['fab', 'codepen'] }
]);
</script>

<template>
  <div class=" grid grid-cols-3 gap-x-5 max-sm:grid-cols-1 max-sm:text-center max-sm:gap-y-10">
    <contacts v-for="item in contactItems" :key="item.title" :link="item.link" :title="item.title" :description="item.description"
      :icon="item.icon" />
  </div>
</template>