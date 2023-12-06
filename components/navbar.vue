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
  <div class="nav-bar" :class="{ 'no-slide': loaded }">
    <div class="container">
      <button @click="scrollTo('home')" class="nav slide-in">
        <div class="img-container">
          <Sign class="sign" />
        </div>
      </button>
      <button @click="scrollTo('whatIDo')" class="nav slide-in delay-1">What I do</button>
      <button @click="scrollTo('projects')" class="nav slide-in delay-2">Projects</button>
      <button @click="scrollTo('resume')" class="nav slide-in delay-3">Resume</button>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  @apply flex justify-center w-full;
  background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0));
}

.container {
  @apply flex justify-between items-center;
}

.nav {
  @apply mt-2 text-[1rem] transition-all duration-200 opacity-0 hover:text-[var(--main-color)] max-sm:hidden max-sm:first:flex;
}

/* to make the logo centered */
.img-container {
  @apply flex justify-center items-center w-full;
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