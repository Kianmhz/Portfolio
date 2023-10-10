<script setup>
const props = defineProps(['title', 'description', 'icon']);
</script>

<template>
    <div class="contact-item">
        <h1>{{ title }}</h1>
        <h2>{{ description }}</h2>
        <button class="contact-button">
            <div class="button-icon">
                <font-awesome-icon :icon="icon" size="lg" />
            </div>
            <div class="button-text">{{ title }}</div>
        </button>
    </div>
</template>
    
    
<style scoped>
.contact-item {
    @apply mb-[50px] flex flex-col;
}

h1 {
    @apply text-[1.2rem] font-[700] text-[var(--main-color)];
}

h2 {
    @apply text-[2rem] font-[700];
}

p {
    @apply text-[1.2rem] font-[400] text-[var(--secondary-text-color)];
}
</style>