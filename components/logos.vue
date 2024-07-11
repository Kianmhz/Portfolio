<script setup>
import { Autoplay, FreeMode } from 'swiper/modules';
import { Icon } from '@iconify/vue';

const icons = ref([
  "vscode-icons:file-type-nuxt",
  'vscode-icons:file-type-vue',
  "vscode-icons:file-type-django",
  "vscode-icons:file-type-tailwind",
  "vscode-icons:file-type-cpp3",
  "vscode-icons:file-type-js-official",
  'vscode-icons:file-type-python',
]);

// Triple the icons array
const tripledIcons = computed(() => icons.value.concat(icons.value, icons.value));
</script>

<template>
  <div class="logos">
    <Swiper
      :modules="[Autoplay, FreeMode]"
      :slidesPerView="4"
      :loop="true"
      :autoplay="{ delay: 100, disableOnInteraction: false }"
      :speed="6000"
      :freeMode="true"
      :freeModeMomentum="false"
    >
      <SwiperSlide v-for="icon in tripledIcons" :key="icon">
        <Icon :icon="icon" class="text-[6vw]"/>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logos {
  @apply max-sm:hidden;
}

.logos::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 1;
}

.logos::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 1;
}
</style>
