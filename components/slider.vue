<template>
    <div class="slider" ref="video_elemenet_height">
        <video class="w-full h-full object-cover" autoplay loop muted>
            <source src="~/assets/video/video.mp4" type="video/mp4">
        </video>
    </div>
</template>

<style scoped>
.slider {
    @apply w-full h-full absolute z-0;
}

.slider::after {
    @apply absolute bottom-0 left-0 w-full h-[50%];
    content: '';
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.slider::before {
    @apply absolute top-0 left-0 w-full h-[50%];
    content: '';
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>