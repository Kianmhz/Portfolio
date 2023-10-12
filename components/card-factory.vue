<script setup>
const cards = ref([
    { id: 3, title: "Python Certification", content: "Certified in Python, I possess a strong foundation in scripting and backend development, showcasing my dedication to continuous learning in this versatile language."},
    { id: 2, title: "C++ Certification", content: "A reflection to my proficiency in C++, this certification validates my skills in object-oriented programming and data structures." },
    { id: 1, title: "Professional Resume", content: "A blend of foundational knowledge and hands-on projects, showcasing my dedication to software engineering." }
]);
</script>

<template>
    <div class="cards-wrapper">
        <Cards v-for="card in cards" :id="card.id" :title="card.title" :content="card.content" />
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