<script setup>
const cards = ref([
  { id: 3, title: "Python", content: "Lorem ipsum..." },
  { id: 2, title: "C++", content: "Lorem ipsum..." },
  { id: 1, title: "Resume", content: "Lorem ipsum..." }
]);
</script>

<template>
    <div class="cards-wrapper">
      <Cards 
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :title="card.title"
        :content="card.content"
      />
    </div>
</template>

<style scoped>
.cards-wrapper {
    display: flex;
    position: relative;
    width: 75%;
    height: 50vh;
}

/* Card-specific styles for positioning and hover effect */
.resume-card[id='card1'] {
    @apply z-[3] translate-x-[15%];
    border-left: 2px solid var(--main-color);
}

.resume-card[id='card2'] {
    @apply z-[2] filter brightness-[0.5];
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
</style>