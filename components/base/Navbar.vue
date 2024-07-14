<script setup>
const { scroll } = defineProps(['scroll']);

// Smooth scroll to section.
const scrollTo = (refName) => {
  const sectionRef = scroll[refName];
  if (sectionRef) {
    sectionRef.scrollIntoView({ behavior: 'smooth' });
  }
};

const loaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 2000); // slightly longer than animation duration to ensure it completes
});
</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center h-16" :class="{ 'no-slide': loaded }">
      <button name @click="scrollTo('home')" class="nav slide-in" aria-label="Go to Homepage">
        <div class="img-container flex justify-center items-center w-full">
          <Sign class="sign" />
        </div>
      </button>
      <button @click="scrollTo('whatIDo')" class="nav slide-in delay-1">What I do</button>
      <button @click="scrollTo('projects')" class="nav slide-in delay-2">Projects</button>
      <button @click="scrollTo('resume')" class="nav slide-in delay-3">Resume</button>
    </div>
  </UContainer>
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
</style>
