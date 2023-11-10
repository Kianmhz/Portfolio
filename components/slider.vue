<template>
    <div class="slider">
        <video class="w-full h-full object-cover" autoplay loop muted playsinline>
            <source src="~/assets/video/video2.mp4" type="video/mp4">
        </video>
    </div>
</template>

<style scoped>
.slider {
    @apply w-full h-[70%] absolute z-0;
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