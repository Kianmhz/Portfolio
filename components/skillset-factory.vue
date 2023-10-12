<script setup>
const contentSkills = ref([
  { id: 1, icon: ['fas', 'code'], title: "Frontend Development", content: "Transforming designs into interactive experiences, optimized for speed and scalability." },
  { id: 2, icon: ['fas', 'server'], title: "Backend Development", content: "Building and maintaining robust server-side logic, ensuring data integrity and seamless integration." },
  { id: 3, icon: ['fas', 'sliders-h'], title: "Web Motion Design", content: "Elevating web designs with fluid animations and transitions, enhancing dynamics and user engagement." },
  { id: 4, icon: ['fas', 'sync'], title: "Automation", content: "Designing scripts and bots to automate repetitive tasks, streamlining processes for efficiency." }
]);
</script>

<template>
  <div class="grid grid-cols-2 gap-[5rem]">
    <skillsets v-for="skill in contentSkills" :id="skill.id" :title="skill.title" :icon="skill.icon" :content="skill.content" />
  </div>
</template>