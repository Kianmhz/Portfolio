<script setup>
const currentProjectIndex = ref(0);

const goBack = () => {
    if (currentProjectIndex.value > 0) {
        currentProjectIndex.value--;

        document.documentElement.style.setProperty('--translate-x-leave', '100%');
        document.documentElement.style.setProperty('--translate-x-enter', '-100%');
    }
};

const goForward = () => {
    if (currentProjectIndex.value < 2) {
        currentProjectIndex.value++;

        document.documentElement.style.setProperty('--translate-x-leave', '-100%');
        document.documentElement.style.setProperty('--translate-x-enter', '100%');
    }
};

const setProjectIndex = (index) => {
    currentProjectIndex.value = index;
};

const inView1 = ref(false);
const inView2 = ref(false);
const inViewSkills = ref(false);
const inViewIntro = ref(false);
const inViewProject = ref(false);
const inViewLanguages = ref(false);

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.classList.contains('container-title1')) {
                inView1.value = entry.isIntersecting;
            } else if (entry.target.classList.contains('container-title2')) {
                inView2.value = entry.isIntersecting;
            } else if (entry.target.classList.contains('skills')) {
                inViewSkills.value = entry.isIntersecting;
            } else if (entry.target.classList.contains('intro')) {
                inViewIntro.value = entry.isIntersecting;
            } else if (entry.target.classList.contains('projects')) {
                inViewProject.value = entry.isIntersecting;
            } else if (entry.target.classList.contains('languages')) {
                inViewLanguages.value = entry.isIntersecting;
            }
        });
    },
        {
            threshold: 0.1,
        });

    const elementsToObserve = [
        '.skills',
        '.intro',
        '.projects',
        '.languages'
    ];

    elementsToObserve.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });
});

const leftIntroTitleElement = ref(null);
const rightIntroTitleElement = ref(null);
const leftIntroSectionTwoTitleElement = ref(null);
const rightIntroSectionTwoTitleElement = ref(null);
const firstTextSectionThreeElement = ref(null);
const secondTextSectionThreeElement = ref(null);
const thirdTextSectionThreeElement = ref(null);

let sectionOffsets, sectionHeights;

const calculateSectionData = () => {
  sectionOffsets = [
    leftIntroTitleElement.value.offsetTop,
    leftIntroSectionTwoTitleElement.value.offsetTop,
    firstTextSectionThreeElement.value.offsetTop,
  ];

  sectionHeights = [
    leftIntroTitleElement.value.offsetHeight,
    leftIntroSectionTwoTitleElement.value.offsetHeight,
    firstTextSectionThreeElement.value.offsetHeight,
  ];
};

const updateElementPositionsOnScroll = () => {
  const totalScreenHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Common logic for calculating rate
  const calculateRate = (startPosition, multiplier, maxRate, offset = 0) => {
    let rate = ((window.scrollY - startPosition + offset) / (totalScreenHeight - startPosition)) * multiplier;
    if (rate > maxRate) {
      rate = maxRate;
    }
    return rate;
  };

  // Section 1
  const sectionOneStartPosition = leftIntroTitleElement.value.offsetTop - window.innerHeight * 1.9; // Adjust this value to start the animation earlier or later
  const sectionOneRate = calculateRate(sectionOneStartPosition, 500, 120);
  leftIntroTitleElement.value.style.right = `${sectionOneRate}%`;
  rightIntroTitleElement.value.style.left = `${sectionOneRate}%`;

  // Section 2
  const sectionTwoStartPosition = leftIntroSectionTwoTitleElement.value.offsetTop - window.innerHeight * 1.9;
  const sectionTwoRate = calculateRate(sectionTwoStartPosition, 340, 120);
  leftIntroSectionTwoTitleElement.value.style.right = `${sectionTwoRate}%`;
  rightIntroSectionTwoTitleElement.value.style.left = `${sectionTwoRate}%`;

  // Section 3
  const sectionThreeStartPosition = firstTextSectionThreeElement.value.offsetTop;
  const sectionThreeRate = calculateRate(sectionThreeStartPosition, 200, 0);
  firstTextSectionThreeElement.value.style.right = `${sectionThreeRate * 0.1}%`;
  secondTextSectionThreeElement.value.style.right = `${sectionThreeRate * 0.2}%`;
  thirdTextSectionThreeElement.value.style.right = `${sectionThreeRate * 0.3}%`;
};

onMounted(() => {
  calculateSectionData();
  window.addEventListener('scroll', updateElementPositionsOnScroll);

  // Recalculate offsets and heights whenever the window is resized
  window.addEventListener('resize', calculateSectionData);
});

const isScrollingUp = ref(true);
let maximumScrollPosition = 0;

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  
  if (currentScrollPosition > maximumScrollPosition + 100) {
    maximumScrollPosition = currentScrollPosition;
    isScrollingUp.value = false;
  } else if (currentScrollPosition < maximumScrollPosition - 100) {
    maximumScrollPosition = currentScrollPosition;
    isScrollingUp.value = true;
  }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
</script>

<template>
    <div v-if="isScrollingUp==true">
        <Navbar/>
    </div>
    <div class="intro">
        <div class="container">
            <div>
                <h2 class="text-[2rem] font-[700] transform translate-y-[40px] opacity-[0]"
                    :class="{ 'animate-intro': inViewIntro }">Hello, it's</h2>
                <div class="transform translate-y-[80px] opacity-[0]" :class="{ 'animate-intro': inViewIntro }">
                    <h1 class="text-[5rem] font-[700]">Kianmehr<span class="text-[#00DC82]">.</span></h1>
                    <p class="text-[1.1rem] font-[400] mb-[20px] text-[#909090]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et
                        dolore magna aliqua.
                    </p>
                </div>
                <button id="intro-button" class="py-[15px] relative transition-transform duration-300 transition-box-shadow duration-300 overflow-hidden bg-transparent border-none opacity-0" :class="{ 'animate-intro': inViewIntro }">
                    <span class="content">
                        <span>SCROLL FOR MORE</span>
                    </span>
                    <div class="arrow"></div>
                </button>
            </div>
            <div class="opacity-[0]" :class="{ 'animate-intro': inViewIntro }">
                <img src="~/assets/img/IMG_1042.JPG" alt="Kianmehr's Image" />
            </div>
        </div>
    </div>

    <div class="title">
        <Slider />
        <div class="container container-title1">
            <div class="text-[3rem] font-[700] mb-[20px]">
                <h1 style="transform: translateX(100%);" ref="leftIntroTitleElement">A Peek Into My</h1>
                <h1 style="transform: translateX(-100%);" ref="rightIntroTitleElement">Software Skills</h1>
            </div>
        </div>
    </div>

    <div class="skills">
        <div class="container">
            <div class="opacity-[0] transform translate-y-[40px]" :class="{ 'animate-skills': inViewSkills }">
                <h1 class="text-[3rem] font-[700] mb-[20px]">What I Do</h1>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua."
                </p>
            </div>
            <div class="grid grid-cols-2 gap-[50px] opacity-[0] transform translate-y-[40px]" id="skills-grid"
                :class="{ 'animate-skills': inViewSkills }">
                <Skillsets />
            </div>
        </div>
    </div>

    <div class="languages">
        <div class="container">
            <div class="opacity-[0] translate-y-[80px]" :class="{ 'fade-in': inViewLanguages }">
                <h1 class="text-[3rem] font-[700]">Languages</h1>
                <Logos />
            </div>
        </div>
    </div>

    <div class="title">
        <Slider />
        <div class="container container-title2">
            <div>
                <h1 style="transform: translateX(100%);" ref="leftIntroSectionTwoTitleElement">Discover My</h1>
                <h1 style="transform: translateX(-100%);" ref="rightIntroSectionTwoTitleElement">Recent Projects</h1>
            </div>
        </div>
    </div>

    <div class="projects">
        <div class="container">
            <transition-group name="fade" tag="div" class="relative w-full h-[1000px]">
                <div v-if="currentProjectIndex === 0" key="0" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': inViewProject }">
                        <h1>Project 1</h1>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                        <button class="github-button">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                            <span class="button-text">Github</span>
                        </button>
                    </div>
                    <div class="project-image" :class="{ 'animate-in': inViewProject }">
                        <img src="~/assets/img/IMG_1042.JPG" />
                    </div>
                </div>

                <div v-if="currentProjectIndex === 1" key="1" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': inViewProject }">
                        <h1>Project 2</h1>
                        <p>"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                        <button class="github-button">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                            <span class="button-text">Github</span>
                        </button>
                    </div>
                    <div class="project-image" :class="{ 'animate-in': inViewProject }">
                        <img src="~/assets/img/IMG_1042.JPG" />
                    </div>
                </div>

                <div v-if="currentProjectIndex === 2" key="2" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': inViewProject }">
                        <h1>Project 3</h1>
                        <p>"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."</p>
                        <button class="github-button hover:w-[92.2px];">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                            <span class="button-text">Github</span>
                        </button>
                    </div>
                    <div class="project-image" :class="{ 'animate-in': inViewProject }">
                        <img src="~/assets/img/IMG_1042.JPG" />
                    </div>
                </div>
            </transition-group>
        </div>
    </div>

    <div class="flex justify-center">
        <div class="container">
            <button id="back" class="mx-[100px]" @click="goBack"><font-awesome-icon
                    :icon="['fas', 'circle-chevron-left']" size="xl" /></button>
            <div class="dots">
                <div :class="{ active: currentProjectIndex === 0 }" @click="setProjectIndex(0)"></div>
                <div :class="{ active: currentProjectIndex === 1 }" @click="setProjectIndex(1)"></div>
                <div :class="{ active: currentProjectIndex === 2 }" @click="setProjectIndex(2)"></div>
            </div>
            <button id="forward" class="mx-[100px]" @click="goForward"><font-awesome-icon
                    :icon="['fas', 'circle-chevron-right']" size="xl" /></button>
        </div>
    </div>

    <div class="flex justify-center items-center">
        <div class="container">
            <Cards />
        </div>
    </div>

    <div class="wrap">
        <div class="container">
            <div>
                <p ref="firstTextSectionThreeElement">And that's a wrap</p>
                <p ref="secondTextSectionThreeElement">What's next?</p>
                <p ref="thirdTextSectionThreeElement">Stay in touch!</p>
            </div>
        </div>
    </div>

    <div class="flex justify-center py-[50px] relative">
        <div class="container">
            <Contact />
        </div>
    </div>
</template>

<style>
.intro {
    @apply flex justify-around items-center;
}

.intro .container div {
    @apply flex-[1];
}

.animate-intro {
    @apply opacity-100 transform translate-y-0;
    transition: transform 1s, opacity 1s;
}

#intro-button.animate-intro {
    @apply opacity-100;
    transition: opacity 0.5s 2s;
}

.content {
    @apply inline-block relative;
    transition: transform 0.4s, opacity 0.4s ease-in-out;
}

.content::after {
    @apply absolute bottom-[-10px] left-0 w-full h-[2px] bg-[#00DC82];
    content: '';
}

#intro-button:hover .content {
    @apply transform scale-[0.5] opacity-0;
}

.arrow {
    @apply absolute left-1/2 bottom-[10%] w-5 h-5 opacity-0;
    border-left: 3px solid #00DC82;
    border-bottom: 3px solid #00DC82;
    transform: translate(-50%, 100%) rotate(-45deg);
    transition: transform 0.5s 0.1s, opacity 0.5s ease-in-out 0.1s;
}

/* When button is hovered, arrow becomes visible and moves into view */
#intro-button:hover .arrow {
    @apply opacity-100;
    animation: bounce 0.8s infinite;
}

.title {
    @apply flex justify-center items-center h-screen;
}
  
.title .container h1 {
    @apply text-[7rem] font-extrabold relative whitespace-nowrap text-transparent;
    background: linear-gradient(to right, #00DC82, #00FFA6);
    -webkit-background-clip: text;
    background-clip: text;
}

.skills {
    @apply flex justify-center;
}

.skills .container div {
    flex: 1 1 50%;
}

.skills .container div p {
    @apply text-[1.1rem] font-[400] mb-[20px] text-[#909090];
}

.animate-skills {
    @apply opacity-100 transform translate-y-0;
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}

#skills-grid.animate-skills {
    @apply opacity-100 transform translate-y-0;
    transition: opacity 1s ease-in, transform 1s ease-in;
}

.languages {
    @apply flex justify-center;
}

.fade-in {
    @apply opacity-100 transform translate-y-0;
    transition: transform 0.5s 0.5s, opacity 0.5s 0.5s ease-in;
}

.languages .container div {
    flex: 1 100%;
    padding-top: 80px;
}

.projects {
    @apply flex justify-center relative;
}

.projects .container div {
    flex: 1 1 50%;
}

.projects .container div h1 {
    @apply text-[3rem] font-[700] mb-[20px];
}

.projects .container div p {
    @apply text-[2rem] font-[700] mb-[20px];
}

.projects .container div img {
    @apply w-full;
}

.project-item {
    @apply absolute w-full top-0 left-0 flex justify-center items-center;
}

.project-info {
    @apply opacity-0 transform translate-y-[50px];
}

.project-image {
    @apply opacity-0 transform translate-x-[50px];
}

.project-info.animate-in,
.project-image.animate-in {
    @apply opacity-100 transform translate-y-0 translate-x-0;
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}

.fade-leave-active {
    position: absolute;
    transition: opacity 0.5s, transform 0.5s;
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(var(--translate-x-leave));
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(var(--translate-x-enter));
}

.fade-enter-to {
    @apply opacity-100 transform translate-x-0;
    transition: opacity 0.5s, transform 0.5s;
}

#back:hover {
    animation: bounce-x 0.8s infinite;
}

#forward:hover {
    animation: bouncex 0.8s infinite;
}

.dots {
    @apply flex gap-4 justify-center items-center relative;
}

.dots div {
    @apply w-3 h-3 rounded-full bg-gray-500 cursor-pointer;
}

.dots div.active {
    @apply w-4 h-4 bg-[#00DC82];
}

.wrap {
    @apply flex justify-center py-[50px];
}

.wrap .container {
    @apply justify-start whitespace-nowrap;
}

.wrap .container div p {
    @apply relative text-[7rem] font-normal;
}

.wrap .container div p:nth-child(1) {
    background: linear-gradient(to right, #00FFFF, #00FFA6);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.wrap .container div p:nth-child(2) {
    background: linear-gradient(to right, #00FFA6, #00ff9d);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.wrap .container div p:nth-child(3) {
    background: linear-gradient(to right, #00ff9d, #00DC82);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.github-button:hover {
    width: 92.2px;
}

.button-text {
    @apply inline-block ml-1 text-white opacity-0 translate-x-[-20px] whitespace-nowrap;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.github-button,
.linkedin-button,
.email-button {
    @apply flex items-center border-0 w-[39.4px] font-normal p-2.5;
    border-bottom: 2px solid #00DC82;
    transition: width 0.3s ease;
}

.linkedin-button:hover .button-text,
.email-button:hover .button-text,
.github-button:hover .button-text {
    @apply opacity-100 transform translate-x-0;
}
</style>