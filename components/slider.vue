<template>
    <div class="slider">
        <video class="w-full h-full object-cover" autoplay loop muted playsinline>
            <source src="/video/slider.mp4" type="video/mp4">
        </video>
    </div>
</template>

<style scoped>
.slider {
    @apply w-full h-[750px] relative z-0 max-lg:h-[500px] max-sm:h-[300px];
}

/* To make the bottom and top edges of video transition to background */
/* Change height to change the brightness */
.slider::after {
    @apply absolute bottom-[-1px] left-0 w-full h-[85%];
    content: '';
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.slider::before {
    @apply absolute top-[-1px] left-0 w-full h-[85%];
    content: '';
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>