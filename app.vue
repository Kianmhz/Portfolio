<template>
  <div>
    <NuxtLoadingIndicator/>
    <NuxtLayout>
      <NuxtPage/>
      <BaseFooter />
    </NuxtLayout>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --main-bg-color: #000000;
  --main-text-color: #EEEEEE;
  --secondary-text-color: #A1A1A1;

  --main-color: #332FD0;
  --secondary-color: #9254C8;
  --tertiary-color: #E15FED;
  --quaternary-color: #6EDCD9;

  --gradient-color: linear-gradient(45deg,
          var(--main-color) 0%,
          var(--secondary-color) 10%,
          var(--tertiary-color) 20%,
          var(--quaternary-color) 30%,
          var(--main-color) 40%,
          var(--secondary-color) 50%,
          var(--tertiary-color) 60%,
          var(--quaternary-color) 70%,
          var(--main-color) 80%,
          var(--secondary-color) 90%,
          var(--tertiary-color) 100%);
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #44444489;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

body {
  font-family: 'Oxygen';
  background: var(--main-bg-color);
  color: var(--main-text-color);
  overflow-x: hidden;
}

/* Animations */
/* For Resume header to change text */
@keyframes change {

  0%,
  25% {
      transform: translate3d(0, 0, 0);
  }

  25%,
  50% {
      transform: translate3d(0, -50%, 0);
  }

  50%,
  75% {
      transform: translate3d(0, -50%, 0);
  }

  75%,
  100% {
      transform: translate3d(0, 0, 0);
  }
}

/* For header on load animation */
@keyframes slideInFromLeft {
  0% {
      transform: translateX(-100%);
      opacity: 0;
  }

  100% {
      transform: translateX(0);
      opacity: 1;
  }
}

/* For dynamic gradient */
@keyframes gradient {

  /* Start at the top-left corner */
  0% {
      background-position: 0% 0%
  }

  /* End at the bottom-right corner */
  100% {
      background-position: 100% 100%
  }
}
</style>