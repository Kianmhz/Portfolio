<script setup>
const { scroll } = defineProps(['scroll']);

// Smooth scroll to section.
const scrollTo = (refName) => {
  const sectionRef = scroll[refName];
  if (sectionRef) {
    sectionRef.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
    <div class="nav-bar">
      <div class="container">
        <button @click="scrollTo('home')" class="nav">
          <div class="img-container">
            <img class="logo" src="~/assets/img/sign.png" alt="Home">
          </div>
        </button>
        <button @click="scrollTo('whatIDo')" class="nav">What I do</button>
        <button @click="scrollTo('projects')" class="nav">Projects</button>
        <button @click="scrollTo('resume')" class="nav">Resume</button>
      </div>
    </div>
</template>

<style scoped>
.nav-bar {
	  @apply flex fixed flex-row flex-wrap justify-center w-full z-[100];
    background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0));
}

.container {
  @apply flex justify-between items-center flex-wrap;
}

.nav {
  @apply pt-2 transition-all duration-200;
}

.img-container {
  @apply flex justify-center items-center w-full;
}

.logo {
  @apply w-auto h-12 transition-all;
  filter: invert(100%) brightness(100%);
}

.logo:hover {
  content: url('~/assets/img/signGreen.png');
  filter: brightness(100%);
}

.nav:hover {
    @apply text-[#00DC82] font-bold;
}
</style>