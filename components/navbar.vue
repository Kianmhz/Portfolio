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
          <Sign class="logo" />
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
  @apply flex flex-row flex-wrap justify-center w-full;
  background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0));
}

.container {
  @apply flex justify-between items-center flex-wrap;
}

.nav {
  @apply pt-2 transition-all duration-200 opacity-0 hover:text-[#00DC82];
}

.img-container {
  @apply flex justify-center items-center w-full;
}

.slide-in {
  animation: slideInFromLeft 0.5s forwards;
}

.no-slide .slide-in {
  animation: none;
  opacity: 1;
}

/* Add varying delays for each button */
.delay-1 {
  animation-delay: 0.25s;
}

.delay-2 {
  animation-delay: 0.5s;
}

.delay-3 {
  animation-delay: 0.75s;
}

@keyframes slideInFromLeft {
  0% {
      transform: translateX(-100%);
      opacity: 0;
  }
  100% {
      transform: translateX(0);
      opacity: 1;
  }
}
</style>