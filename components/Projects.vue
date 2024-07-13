<script setup>
import { Autoplay, Pagination } from 'swiper/modules';

const projects = ref([
  {
    title: "Dine Discover",
    description: `Developed with Vanilla JS and Django, Dine Discover is a conceptual platform for exploring
                  restaurants. While the platform is not operational, its design emphasizes a user-friendly
                  interface, clean visuals, and organized data. Features include user authentication, search, and detailed
                  restaurant reviews.`,
    link: "https://github.com/Kianmhz/restaurant-finder",
    image: "/img/dine.webp",
    alt: "DineD logo"
  },
  {
    title: "Instagram Bot",
    description: `Utilizing Python Playwright library, this bot is designed to streamline various Instagram tasks. With
                  capabilities like logging in, posting photos and videos, as well as managing follow/unfollow
                  actions, it's built to run in a continuous loop, ensuring sustained activity and automation.`,
    link: "https://github.com/Kianmhz/IG-bot",
    image: "/img/ig.webp",
    alt: "ig logo"
  },
  {
    title: "X / Twitter Bot",
    description: `Engineered with Python Playwright library, Twitter Bot is equipped to handle tasks like
                  logging in, posting multimedia content, and following or
                  unfollowing users. Designed for long-term operations, it runs in an infinite loop, ensuring
                  consistent and reliable automation.`,
    link: "https://github.com/Kianmhz/X-bot",
    image: "/img/x.webp",
    alt: "X logo"
  }
]);
</script>

<template>
  <div class="flex flex-col justify-center items-center max-lg:overflow-hidden max-sm:overflow-hidden">
    <UContainer>
      <Swiper
        :modules="[Autoplay, Pagination]"
        :slidesPerView="1"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="projects"
      >
        <SwiperSlide v-for="(project, index) in projects" :key="index">
          <div class="grid grid-cols-2 justify-center items-center gap-[50px] max-sm:grid-cols-1 max-sm:text-center">
            <div>
              <h1 class="text-[3rem] font-[900] mb-[20px] max-lg:text-[2.5rem]">{{ project.title }}</h1>
              <p class="text-[1.2rem] font-[400] mb-[20px] text-[var(--secondary-text-color)]">{{ project.description }}</p>
              <BaseButton
              icon='codicon:github'
              title='GitHub'
              :link= project.link
              />
            </div>
            <div class="project-image">
              <img :src="project.image" :alt="project.alt" class="w-[550px] ml-auto" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </UContainer>
  </div>
</template>
