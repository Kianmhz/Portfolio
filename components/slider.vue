<template>
    <div class="slider" ref="video_elemenet_height">
        <video autoplay loop muted>
            <source src="~/assets/video/video.mp4" type="video/mp4">
        </video>
    </div>
</template>

<style>
.slider {
    @apply w-full h-full absolute z-0;
}
.slider::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)); /* Gradient shadow effect */
}
.slider::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)); /* Gradient shadow effect */
}
.slider video {
    @apply w-full h-full object-cover;
  }
  
  .title {
    @apply flex justify-center items-center h-screen;
  }
  
.title .container h1 {
    font-size: 7rem;
    font-weight: 700;
    background: linear-gradient(to right, #00DC82, #00FFA6);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    position: relative;
    white-space: nowrap;
}
</style>