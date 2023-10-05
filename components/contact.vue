<template>
<div class="contact-item">
    <h1>Linkedin</h1>
    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
    <button class="contact-button">
        <div class="button-icon">
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
        </div>
        <div class="button-text">Linkedin</div>
    </button>
</div>
<div class="contact-item">
    <h1>Email</h1>
    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
    <button class="contact-button">
        <div class="button-icon">
            <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
        </div>
        <div class="button-text">Email</div>
    </button>
</div>
</template>

<style scoped>
.contact-item {
    @apply mb-[50px];
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