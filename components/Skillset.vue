<script setup>
import { Icon } from '@iconify/vue'; // Ensure this is the correct import

const skills = ref([
  { id: 1, icon: 'fa6-solid:code', title: "Frontend Development", content: "Transforming designs into interactive experiences, optimized for speed and scalability." },
  { id: 2, icon: 'fa6-solid:server', title: "Backend Development", content: "Building and maintaining robust server-side logic, ensuring data integrity and seamless integration." },
  { id: 3, icon: 'fa6-solid:sliders', title: "Motion Web Design", content: "Elevating web designs with fluid animations and transitions, enhancing dynamics and user engagement." },
  { id: 4, icon: 'iconamoon:synchronize-bold', title: "Automation", content: "Designing scripts and bots to automate repetitive tasks, streamlining processes for efficiency." }
]);
</script>

<template>
  <div class="grid grid-cols-1 text-center gap-12 sm:grid-cols-2 sm:text-left">
    <div v-for="skill in skills" :key="skill.id" class="group">
      <Icon :icon="skill.icon" class="text-4xl"/>
      <h2 class="text-xl font-bold my-2.5">{{ skill.title }}</h2>
      <p>{{ skill.content }}</p>
    </div>
  </div>
</template>
