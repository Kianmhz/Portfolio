<script setup>
const props = defineProps({
  scroll: Object,
  scrollTo: Function,
});

const SCROLL_THRESHOLD = 100;
const maximumScrollPosition = ref(0);
const isScrollingUp = ref(true);
const lastScrollTime = ref(Date.now());
const loaded = ref(false);

const scrollDetector = () => {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > maximumScrollPosition.value + SCROLL_THRESHOLD) {
    if (isScrollingUp.value) isScrollingUp.value = false;
    maximumScrollPosition.value = currentScrollPosition;
  } else if (currentScrollPosition < maximumScrollPosition.value - SCROLL_THRESHOLD) {
    if (!isScrollingUp.value) isScrollingUp.value = true;
    maximumScrollPosition.value = currentScrollPosition;
  }
};

const scrollHandler = () => {
  const now = Date.now();
  if (now - lastScrollTime.value > 100) {
    scrollDetector();
    lastScrollTime.value = now;
  }
};

onMounted(() => {
  setTimeout(() => loaded.value = true, 2000);
  window.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <transition name="navbar-fade">
    <UContainer v-show="isScrollingUp" class="fixed top-0 left-0 right-0 z-[100]">
      <div class="flex justify-between items-center h-16" :class="{ 'no-slide': loaded }">
        <button @click="scrollTo('home')" class="nav slide-in" aria-label="Go to Homepage">
          <div class="flex justify-center items-center w-full">
            <Sign class="sign" />
          </div>
        </button>
        <button @click="scrollTo('whatIDo')" class="nav slide-in delay-1">What I do</button>
        <button @click="scrollTo('projects')" class="nav slide-in delay-2">Projects</button>
        <button @click="scrollTo('resume')" class="nav slide-in delay-3">Resume</button>
      </div>
    </UContainer>
  </transition>
</template>

<style scoped>
.nav {
  @apply text-base transition-all duration-200 opacity-0 hover:text-[--main-color] max-sm:hidden max-sm:first:flex;
}

.slide-in {
  animation: slideInFromLeft 0.5s forwards;
}

.no-slide .slide-in {
  animation: none;
  opacity: 1;
}

.delay-1 {
  animation-delay: 0.25s;
}

.delay-2 {
  animation-delay: 0.5s;
}

.delay-3 {
  animation-delay: 0.75s;
}

.navbar-fade-enter-from,
.navbar-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.navbar-fade-enter-to,
.navbar-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.navbar-fade-enter-active,
.navbar-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
</style>
