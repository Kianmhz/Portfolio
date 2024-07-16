<template>
    <div class="relative w-full lg:h-[500px] md:h-[400px] sm:h-[300px] z-0">
      <video class="w-full h-full object-cover" autoplay loop muted playsInline>
        <source src="/video/slider.mp4" type="video/mp4">
      </video>
      <div class="overlay-bottom absolute bottom-[-1px] left-0 w-full h-4/5 bg-gradient-to-t from-black to-transparent"></div>
      <div class="overlay-top absolute top-[-1px] left-0 w-full h-4/5 bg-gradient-to-b from-black to-transparent"></div>
    </div>
</template>  