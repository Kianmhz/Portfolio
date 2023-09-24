<template>
    <div>
        <h1>Linkedin</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
        <button class="linkedin-button">
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
            <span class="button-text">LinkedIn</span>
        </button>
    </div>
    <div>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et
            dolore magna aliqua."</p>
    </div>
    <div>
        <h1>Email</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
        <button class="email-button">
            <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
            <span class="button-text">Email</span>
        </button>
    </div>
    <div>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et
            dolore magna aliqua."</p>
    </div>
</template>

<style scoped>
div {
    flex: 1 1 50%;
    padding: 30px 0;
}

h1 {
    @apply text-[1rem] font-[700] text-[#00DC82];
}

h2 {
    @apply text-[2rem] font-[700];
}

p {
    @apply text-[1.1rem] font-[400] text-[#909090];
}
</style>