<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Autoplay } from "swiper/modules";

// Define the projects data
const projects = ref([
  {
    title: "Dine Discover",
    description: `Developed with Vanilla JS and Django, Dine Discover is a conceptual platform for exploring
                  restaurants. While the platform is not operational, its design emphasizes a user-friendly
                  interface, clean visuals, and organized data. Features include user authentication, search, and detailed
                  restaurant reviews.`,
    link: "https://github.com/Kianmhz/restaurant-finder",
    alt: "DineD logo",
    canvasImage: "" // Set a unique canvas image
  },
  {
    title: "Instagram Bot",
    description: `Utilizing Python Playwright library, this bot is designed to streamline various Instagram tasks. With
                  capabilities like logging in, posting photos and videos, as well as managing follow/unfollow
                  actions, it's built to run in a continuous loop, ensuring sustained activity and automation.`,
    link: "https://github.com/Kianmhz/IG-bot",
    alt: "ig logo",
    canvasImage: "data:image/png;base64,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" // Set a unique canvas image
  },
  {
    title: "X / Twitter Bot",
    description: `Engineered with Python Playwright library, Twitter Bot is equipped to handle tasks like
                  logging in, posting multimedia content, and following or
                  unfollowing users. Designed for long-term operations, it runs in an infinite loop, ensuring
                  consistent and reliable automation.`,
    link: "https://github.com/Kianmhz/X-bot",
    alt: "X logo",
    canvasImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAbAPOEwlO++If8zWj7Ye/tClg2JZ8QDFfUecAAAhKSURBVHjazZ3teqM4DEYTJwTyAYEkJPd/pzu7z+xMKoHQK9uy/be0xWDOsWQjdrePuT3PO+/WsNM9TL9/NB3sPXkF536EuSWn0L3//PB0MXfk8nDuyIOea/91BmGIGFyTaz9OPfn/7f77x8e7vSe3xrEf7472YwjyAUDb+z0f/Gl+0cu4b80d6a5eHTmzgTMeaV+b0X5L7keffhzZOd4X6D897T0ZfATy0oHmYR9c/cnjARkEgfw48GW/JQcHwbOnePXynWsWfGACuezVsunWG7067cNdILNw7QZy6Hm1Dc6Cvz43BSIIXhAEnwqMjatAbjLyr52sm9Uj8wpeJxAJDTMCkXeBCGSVDeR3BEHwv55L8M1gmRQRwQuC4BO4IQ+D9QKRAhdhks7CsUsWwbNIShnLEcELguDhWA7BnyCBCIKHGJw+yOICGdT/492bGZxc8PxBBK5VmD9mBicOss5jFBqJfyAGjykZfMQFIg6Z9Wc4sBlzOyec8fJI6hqHboTB6QS/kIqD+U6GDMTgZIK3CkQSPMTgREHWRipO/WcuZgYnEXzg02vbDIg+aAPA4BRBVpRApFgGYnC84BWpOH2U3GvnUZzBsUEWF8g9Yho3ay9zoAxuIwXfxAtEEDzE4CjBi2s5pplnZ2dwjOD3yQMdkkVFGBwheCQVZ4z6EQabgyy+VDPHG5bwCGFwaxT8hKXi1BnXi5nBtmVSJpA2TWBAeYTMgy2CN6TilB0hPIIYjAueC+SQLKdMBI8wGBY8vxZdwvTl/DEzGBR8MKbitLd7tDMYe1CTRFISEDv7PBgQfHibU3FGwSMMBsbGNYtARJYgDFYLnq9g3tJn98k/gRisFHw2gYgXGmGw6oENzS2fQKQLjTBYI3h+I5+ZNrjQC40wWCH4OatApMk1xOBNwecWiHShIQZf0VTcnK8f7EIjDJazqAtrOTk3hAQS8QjxJ390pTNLl4ozToUgBp9cUnHGLCrC4NVHamEtJ/+WKfoUIwxeEXziVJwxUQPlIh4uqThtGz5mBneTRiC908Zu+hQjDF7YB5VoLSdBFrUFGMwt9+5cBSI+xQiD6fBXbKt2FDzC4J+CLyAQMaWJMPh75DhFUnrBXwAGfx2r3VbtKHiEwX+OVW+r9hQ8wuD/j2VrOS670uUsaivBf1gUfMiwlpMiiwox+LpDt1XnFPxoZ/CvYx1ScUbBIwxu5+nukIozCh5gcNsfSgtEOj2EwT6pOK1Mzk87g0u9a6Y6PYTB5QXyfUvoNB3aF1HwFdnt9Af0jkZpgQiCF6Oi1dc1h2ZXQZs/5nlweYH8OL0xksHjeVdHo2MfZHBRgZAgq41g8PNaTT/Y2JcYPHq/uhgVZN31DG5foaae0LEPMPhS1S2hghdmHOFWOt0AZVERBt+amnpCBQ8wuN3X1BE69hEGd9eanhIqeITB92NNt4RmUQEGO5WLMAoeYXDpuIqMrpf67Ng8+HCuqScUrAiD6xY8wuCqBE/BijC4bsEjDB7rEnxnnwdXLXiIwe+K+sG2JV6AeXDdgkcYPFTF4AfA4N6jXEQqwSMMrlvwCINfVQdZCIPriuBn/UNMp8xdXYIf7fngugRPRwzA4Ky7feMFDzC4KsFDmZKhYsHzzQAIg+sR/FLpYIDB1Qj+vLjsCTC4kiDruLzChuyLqCKL2rzwwpqMwRUInm+rtjC4gizqY32rBsLgsTSD2a44K4MLC36jGDXA4LKC36w9DzC45P4tLpD70z4PLpdFXdpWTSddAIOLCX5xWzV7XQFgcCHBr7yXQ4eb9I7GXMUy6dq26ndvZnCJLKqwrXq2M7iA4IVt1c1oZ7C74KVt1WHq7Ax2FvxGtWp6nQEG+y6Tbr2Xw/Luega3nlnU7QoHLN4QcDQXE/xChYP3VlYFYLDfPihNiZww2BnsJXhdhQO2DxtgsI/gtdWq33YGuwheXa2aFWkStskyBucX/KQvkcMED8yDc2dRAxeIsK2aLpMiDM68DwoskcMWdfQMziv4BiyRw6pbAwzOKXi8WjWysE5vX0bBG0rkAAvrNHDOl0U1VTgYPmYG5xK8rVo1EzzA4DzLpNYSOcjmptlB8PYKB/sIBqfPokZUq25udgYnF3xMiZzAKuACDE68TBpZIodiG2Bw4ixqZLVqJniAwUkFH13hAHmD5NRnC7I2vzyq+BO9ncHJBJ+kWvVsX5NLlUVNU60aeYOEVlxKk0VNVSKHv0GiZnCSfVDpqlWzt/j0DE4g+IQlchrgLT7gfc2EqTgrNFqAwbFB1qNPWeEA2Zs2pxR86mrVTPAAg6OCrOQlcliQBcyDIwSfvlp1oIJHGGwOsrLUWJs/ZgYbBZ+pWjW7OgCDbYLPVa2aCR5gsEXw+T53QENAgMEWweerVs2GLMBgPMhaqFadLHZmMATmwajg81arZqVS9AwGx0XeatWsHhTCYEjw2YuNMsEDDAYuKUvFtclL5DDBA/si1IJ3qVa9/5gZrBW8S7VqVi4CYbAyyHL63MHU2efBKsG7Vat+tGYGa+YYftWqWZAFMHhb8I7Vqvm3kgEGbwnet1r1ak3g7RG/8dx6V6se7AwWBe9erXq5JrDuIgt3r8DnDt4RDF6/eyWqVe/tDF67ymWqVR9vdgav3L1C1arZ0gvA4MW7V6xaNZsRjfvVpqj2cS5WrTq8PubGBV/ycwebBaeFRkeN14fjlNNUfSPLpJpt1TnbbL8lP8tF5P3yqEHwQPveB+X64ThdFhUYXH+DrFMFnztYLTi93f5kUdXbqnO2tYLTmvZb8NOhlEBkwQPtP8FD26pdBa9v/wr+WFQgyQQ/7V4taV2xF7F/Cb41ts/tH8Ubdi/WiIhEAAAAAElFTkSuQmCC" // Set a unique canvas image
  }
]);

let worker;

// Check if we're in a browser environment
if (typeof window !== "undefined") {
  worker = new Worker(new URL("./particleWorker.js", import.meta.url), { type: "module" });
}

// Keep track of initialized canvases
const initializedCanvases = {};

const initOffscreenCanvas = (canvasId, canvasImageSrc) => {
  if (!worker) return; // If the worker is not defined, exit

  const canvas = document.getElementById(canvasId);
  if (!canvas || initializedCanvases[canvasId]) return;

  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ canvas: offscreen, imageSrc: canvasImageSrc }, [offscreen]);

  initializedCanvases[canvasId] = true;
};

// Initialize canvases for the current, next, and previous slides
const initializeCanvases = (activeIndex) => {
  nextTick(() => {
    // Initialize current slide
    initOffscreenCanvas(`canvas-${activeIndex}`, projects.value[activeIndex].canvasImage);

    // Preload next slide if available
    if (projects.value[activeIndex + 1]) {
      initOffscreenCanvas(`canvas-${activeIndex + 1}`, projects.value[activeIndex + 1].canvasImage);
    }

    // Preload previous slide if available
    if (projects.value[activeIndex - 1]) {
      initOffscreenCanvas(`canvas-${activeIndex - 1}`, projects.value[activeIndex - 1].canvasImage);
    }
  });
};

// Initialize the first slide on mount
onMounted(() => {
  initializeCanvases(0);
});
</script>

<template>
  <Swiper
    :modules="[Autoplay]"
    :pagination="{ dynamicBullets: true }"
    :slidesPerView="1"
    :loop="true"
    :autoplay="{ delay: 6000, disableOnInteraction: false }"
    :speed="500"
    @slideChangeTransitionEnd="({ activeIndex }) => initializeCanvases(activeIndex)"
  >
    <SwiperSlide v-for="(project, index) in projects" :key="index">
      <div class="my-20">
        <UContainer>
          <div class="grid grid-cols-1 justify-center items-center gap-10 sm:gap-20 text-center sm:grid-cols-2 sm:text-left">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold">{{ project.title }}</h1>
              <p class="text-md sm:text-lg my-5 text-[--secondary-text-color]">{{ project.description }}</p>
              <BaseButton icon="codicon:github" title="GitHub" :link="project.link" />
            </div>
            <div class="ml-auto">
              <canvas :id="`canvas-${index}`" width="400" height="400"></canvas>
            </div>
          </div>
        </UContainer>
      </div>
    </SwiperSlide>
  </Swiper>
</template>