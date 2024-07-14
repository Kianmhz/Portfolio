<script setup>
const props = defineProps({
  scroll: Object,
});


// Scroll direction detection logic.
const SCROLL_THRESHOLD = 100;
const maximumScrollPosition = ref(0);
const isScrollingUp = ref(true);
const scrollDetector = () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > maximumScrollPosition.value + SCROLL_THRESHOLD) {
        if (isScrollingUp.value) {
            isScrollingUp.value = false;
        }
        maximumScrollPosition.value = currentScrollPosition;
    }
    else if (currentScrollPosition < maximumScrollPosition.value - SCROLL_THRESHOLD) {
        if (!isScrollingUp.value) {
            isScrollingUp.value = true;
        }
        maximumScrollPosition.value = currentScrollPosition;
    }
};

// attach scroll handler
let lastScrollTime = Date.now();
const scrollHandler = () => {
    const now = Date.now();
    if (now - lastScrollTime > 100) { // throttle scroll handler to 100ms
        scrollDetector();
        lastScrollTime = now;
    }
};

const loaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 2000); // slightly longer than animation duration to ensure it completes

  window.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <transition name="navbar-fade">
    <div class="navbar-wrapper" v-show="isScrollingUp">
      <UContainer>
        <div class="flex justify-between items-center h-16" :class="{ 'no-slide': loaded }">
          <button @click="scrollTo('home')" class="nav slide-in" aria-label="Go to Homepage">
            <div class="img-container flex justify-center items-center w-full">
              <Sign class="sign" />
            </div>
          </button>
          <button @click="scrollTo('whatIDo')" class="nav slide-in delay-1">What I do</button>
          <button @click="scrollTo('projects')" class="nav slide-in delay-2">Projects</button>
          <button @click="scrollTo('resume')" class="nav slide-in delay-3">Resume</button>
        </div>
      </UContainer>
    </div>
  </transition>
</template>

<style scoped>
.nav {
  @apply text-base transition-all duration-200 opacity-0 hover:text-[--main-color] max-sm:hidden max-sm:first:flex;
}

/* Initial load Animation for header */
.slide-in {
  animation: slideInFromLeft 0.5s forwards;
}

/* To prevent animation from triggering after initial load */
.no-slide .slide-in {
  animation: none;
  opacity: 1;
}

/* varying delays for each button */
.delay-1 {
  animation-delay: 0.25s;
}

.delay-2 {
  animation-delay: 0.5s;
}
.delay-3 {
  animation-delay: 0.75s;
}

/* navbar animation */
.navbar-wrapper {
  @apply fixed top-0 left-0 right-0 z-[100];
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
