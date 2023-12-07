<script setup>
const props = defineProps(['title', "link", 'description', 'icon']);
</script>

<template>
    <div class="contact-item">
        <h1>{{ title }}</h1>
        <h2>{{ description }}</h2>
            <button>
                <a class="contact-button" :href="link" target="_blank" rel="noopener noreferrer">
                    <div class="button-icon">
                        <font-awesome-icon :icon="icon" size="lg" />
                    </div>
                    <div class="button-text">{{ title }}</div>
                </a>
            </button>
    </div>
</template>
    
    
<style scoped>
h1 {
    @apply text-[1.2rem] font-[700] text-[var(--main-color)];
}

.contact-button {
    @apply max-sm:flex max-sm:justify-center;
}

h2 {
    @apply text-[2rem] font-[700] max-lg:text-[1.5rem];
}
</style>