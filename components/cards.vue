<script setup>
const cards = ref([
  { id: 3, title: "Python Certification", src: "/python.jpg", content: "Certified in Python, I possess a strong foundation in scripting and backend development, showcasing my dedication to continuous learning in this versatile language."},
  { id: 2, title: "C++ Certification", src: "/CPP.jpg", content: "A reflection to my proficiency in C++, this certification validates my skills in object-oriented programming and data structures." },
  { id: 1, title: "Professional Resume", src: "/ENGresume.pdf", content: "A blend of foundational knowledge and hands-on projects, showcasing my dedication to software engineering." }
]);
</script>

<template>
  <UContainer>
    <div class="flex flex-col justify-center items-center max-sm:hidden">
      <div class="flex justify-center items-center my-10 text-5xl font-bold text-[--main-color]">
        <span >My</span>
        <div class="overflow-hidden h-[60px] pl-3">
            <ul class="list">
                <li class="item">Resume &</li>
                <li class="item">Certificates</li>
            </ul>
        </div>
      </div>
      <div class="flex relative w-[75%] h-[350px] lg:h-[500px]">
        <div v-for="card in cards" :key="card.id" class="resume-card" :id="`card${card.id}`">
          <p class="text-3xl">{{ card.content }}</p>
          <NuxtLink :href="card.src" target="_blank" rel="noopener noreferrer" class="absolute bottom-16 text-[--secondary-text-color] text-3xl">{{ card.title }}</NuxtLink>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
.list {
  @apply text-left list-none leading-[60px];
  animation: change 3s infinite;
}

/* Card-specific styles for positioning and hover effect */
.resume-card[id='card1'] {
  @apply z-[3] translate-x-[15%];
  border-left: 2px solid var(--main-color);
}

.resume-card[id='card2'] {
  @apply z-[2] brightness-[0.5];
  border-left: 2px solid var(--secondary-color);
}

.resume-card[id='card3'] {
  @apply z-[1] translate-x-[-15%] brightness-[0.5];
  border-left: 2px solid var(--quaternary-color);
}

/* Hover effects */
.resume-card[id='card2']:hover,
.resume-card[id='card3']:hover {
  @apply filter brightness-[1];
}

.resume-card[id='card3']:hover~.resume-card[id='card1'],
.resume-card[id='card2']:hover~.resume-card[id='card1'] {
  @apply transform translate-x-[100%] filter brightness-[0.5];
}

.resume-card[id='card3']:hover~.resume-card[id='card2'] {
  @apply transform translate-x-[85%] filter brightness-[0.5];
}

.resume-card {
  @apply absolute w-[100%] h-[100%] p-10;
  background: linear-gradient(to right, rgb(24, 24, 24), rgb(0, 0, 0));
  transition: 0.3s ease-in-out;
  box-shadow: -30px 0px 30px rgba(0, 0, 0, 0.7);
}
</style>
