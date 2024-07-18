<script setup>
import { Autoplay} from 'swiper/modules';

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
  <UContainer>
    <Swiper
      :modules="[Autoplay]"
      :slidesPerView="1"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
    >
      <SwiperSlide v-for="(project, index) in projects" :key="index">
        <div class="my-20">
          <div class="grid grid-cols-1 justify-center items-center gap-10 sm:gap-20 text-center sm:grid-cols-2 sm:text-left">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold">{{ project.title }}</h1>
              <p class="text-md sm:text-lg my-5 text-[--secondary-text-color]">{{ project.description }}</p>
              <BaseButton
                icon='codicon:github'
                title='GitHub'
                :link="project.link"
              />
            </div>
            <div class="">
              <NuxtImg loading="lazy" :src="project.image" :alt="project.alt" class="ml-auto max-sm:mx-auto w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </UContainer>
</template>
