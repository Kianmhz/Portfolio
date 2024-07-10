<script setup>
import { Icon } from '@iconify/vue'; // Ensure this is the correct import

const icons = ref([
  "vscode-icons:file-type-nuxt",
  'vscode-icons:file-type-vue',
  "vscode-icons:file-type-django",
  "vscode-icons:file-type-tailwind",
  "vscode-icons:file-type-cpp3",
  "vscode-icons:file-type-js-official",
  'vscode-icons:file-type-python',
]);
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-for="icon in icons" :key="icon">
      <Icon :icon="icon" class="text-4xl" />
    </div>
  </div>
</template>

<style scoped>

</style>
