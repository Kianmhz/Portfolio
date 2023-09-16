<script setup>
const initScrollingText = (container) => {
  // Your initialization logic here, converting jQuery to vanilla JS

  const scrollingText = container.querySelector('.scrolling-text');
  const scrollingTextContent = scrollingText.querySelector('.scrolling-text-content');
  let scrollingTextWidth = scrollingText.offsetWidth;

  scrollingTextWidth = scrollingText.offsetWidth;
  
  let transformAmount = 0;
  let transformSpeed = parseInt(container.getAttribute('speed'), 10);
  let transformDirection = container.classList.contains('left-to-right') ? -1 : 1;



  // More initialization logic here (e.g., creating the scrolling-text-copy and setting its CSS properties)

  const handleWheel = (e) => {
    // Your wheel event handling logic here, converting jQuery to vanilla JS
    // ... 
    if (e.deltaY > 0) {
      transformAmount += transformSpeed * transformDirection;
    } else {
      transformAmount -= transformSpeed * transformDirection;
    }
    
    setTimeout(() => {
      scrollingText.style.transform = `translate3d(${transformAmount * -1}px, 0, 0)`;
    }, 10);
    // Boundary logic goes here...
  };

  window.addEventListener('wheel', handleWheel);
};

onMounted(() => {
  const containers = document.querySelectorAll('.container');
  containers.forEach(container => {
    initScrollingText(container);
  });
});
</script>

<template>
        <div class="container" :speed="70">
            <div class='scrolling-text'>
                <h2 class="scrolling-text-content">
                    Discover My
                </h2>
            </div>
        </div>
        <div class="container left-to-right" :speed="70">
            <div class='scrolling-text'>
                <h2 class="scrolling-text-content">
                    Recent Projects
                </h2>
            </div>
        </div>
</template>

<style scoped>

body,
html {
  overflow: hidden;
}

body {
  background: #000;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
.scrolling-text {
  display: inline-block;
  transition: transform 0.5s cubic-bezier(0.23, 0.36, 0.28, 0.83);
}

.scrolling-text .scrolling-text-content {
  font-size: 120px;
  white-space: nowrap;
  transition: transform 0.5s cubic-bezier(0.23, 0.36, 0.28, 0.83);
  line-height: 1em;
  margin: 50px 0;
}
</style>