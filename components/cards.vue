<script setup>
const props = defineProps(['id', 'src', 'title', 'content']);
</script>  

<template>
    <div class="resume-card" :id="`card${id}`">
        <p>{{ content }}</p>
        <a :href="src" target="_blank" rel="noopener noreferrer" class="resume-title">{{ title }}</a>
    </div>
</template>

<style scoped>
.resume-card {
    @apply absolute w-[100%] h-[100%] p-10;
    background: linear-gradient(to right, rgb(24, 24, 24), rgb(0, 0, 0));
    transition: 0.3s ease-in-out;
    box-shadow: -30px 0px 30px rgba(0, 0, 0, 0.7);
}

.resume-card p {
    @apply text-[2rem] max-lg:text-[1.5rem];
}

.resume-title {
    @apply absolute top-[80%] text-[var(--secondary-text-color)] text-[2rem] max-lg:text-[1.5rem];
}
</style>
