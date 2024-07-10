<script setup>
import { Icon } from '@iconify/vue'; // Assuming you're using Iconify for icons

const contacts = ref([
  { title: "Linkedin", link: "https://www.linkedin.com/in/kianmhz/", description: "Connect with me professionally and let's build bridges.", icon: 'jam:linkedin-square' },
  { title: "Email", link: "mailto:haddad.kianm@gmail.com", description: "Reach out directly for inquiries, collaborations, or just to say hi.", icon: 'material-symbols:mail-outline' },
  { title: "GitHub", link: "https://github.com/Kianmhz", description: "Explore my projects, repositories, and contributions.", icon: 'codicon:github' }
]);
</script>

<template>
  <div class=" grid grid-cols-1 text-center gap-16 sm:grid-cols-3 sm:text-left">
    <div v-for="contact in contacts " class="contact-item">
      <h1 class="text-[--main-color] text-lg font-bold">{{ contact.title }}</h1>
      <p class="text-3xl leading-normal">{{ contact.description }}</p>
      <button>
        <NuxtLink
          class="contact-button"
          :to="contact.link"
          target="_blank"
        >
          <div class="button-icon">
            <Icon :icon="contact.icon" class="text-2xl" />
          </div>
          <div class="button-text">{{ contact.title }}</div>
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
