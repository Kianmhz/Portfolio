<script setup>
// Reactive references and states.
const isPageLoaded = ref(false);
const currentProjectIndex = ref(0);
const scroll = reactive({
  home: null,
  title: null,
  whatIDo: null,
  projects: null,
  resume: null,
});
const state = reactive({
    inViewTitle1: false,
    inViewTitle2: false,
    inViewSkills: false,
    inViewIntro: false,
    inViewProject: false,
    inViewLanguages: false,
});
const elements = reactive({
    leftIntroTitle: null,
    rightIntroTitle: null,
    leftIntroSectionTwoTitle: null,
    rightIntroSectionTwoTitle: null,
    firstTextSectionThree: null,
    secondTextSectionThree: null,
    thirdTextSectionThree: null
});

// Navigation functions for project viewing.
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

// Helper functions for scroll-based animations.
let sectionOffsets, sectionHeights;
const calculateSectionData = () => {
  if (
    elements.leftIntroTitle &&
    elements.leftIntroSectionTwoTitle &&
    elements.firstTextSectionThree
  ) {
    sectionOffsets = [
      elements.leftIntroTitle.offsetTop,
      elements.leftIntroSectionTwoTitle.offsetTop,
      elements.firstTextSectionThree.offsetTop,
    ];
    sectionHeights = [
      elements.leftIntroTitle.offsetHeight,
      elements.leftIntroSectionTwoTitle.offsetHeight,
      elements.firstTextSectionThree.offsetHeight,
    ];
  }
};
const updateElementPositionsOnScroll = () => {
  const totalScreenHeight = document.documentElement.scrollHeight - window.innerHeight;

  // logic for calculating scroll rate.
  const calculateRate = (startPosition, multiplier, maxRate, offset = 0) => {
    let rate = ((window.scrollY - startPosition + offset) / (totalScreenHeight - startPosition)) * multiplier;
    if (rate > maxRate) {
      rate = maxRate;
    }
    return rate;
  };
  
  // Animate elements based on scroll position.
  const sectionOneStartPosition = elements.leftIntroTitle.offsetTop - window.innerHeight * 1.6;
  const sectionOneRate = calculateRate(sectionOneStartPosition, 500, 120);
  elements.leftIntroTitle.style.right = `${sectionOneRate}%`;
  elements.rightIntroTitle.style.left = `${sectionOneRate}%`;
  
  const sectionTwoStartPosition = elements.leftIntroSectionTwoTitle.offsetTop - window.innerHeight * 1.6;
  const sectionTwoRate = calculateRate(sectionTwoStartPosition, 340, 120);
  elements.leftIntroSectionTwoTitle.style.right = `${sectionTwoRate}%`;
  elements.rightIntroSectionTwoTitle.style.left = `${sectionTwoRate}%`;
  
  const sectionThreeStartPosition = elements.firstTextSectionThree.offsetTop;
  const sectionThreeRate = calculateRate(sectionThreeStartPosition, 200, 0);
  elements.firstTextSectionThree.style.right = `${sectionThreeRate * 0.1}%`;
  elements.secondTextSectionThree.style.right = `${sectionThreeRate * 0.2}%`;
  elements.thirdTextSectionThree.style.right = `${sectionThreeRate * 0.3}%`;
};

// Scroll direction detection logic.
const SCROLL_THRESHOLD = 100;
const maximumScrollPosition = ref(0);
const isScrollingUp = ref(true);
const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > maximumScrollPosition.value + SCROLL_THRESHOLD) {
        if (isScrollingUp.value) {
            isScrollingUp.value = false;
        }
        maximumScrollPosition.value = currentScrollPosition;
    } 
    else if (currentScrollPosition < maximumScrollPosition.value - SCROLL_THRESHOLD) {
        if (!isScrollingUp.value) {
            isScrollingUp.value = true;
        }
        maximumScrollPosition.value = currentScrollPosition;
    }
};

// Smooth scroll to section.
const scrollTo = (refName) => {
  const sectionRef = scroll[refName];
  if (sectionRef) {
    sectionRef.scrollIntoView({ behavior: 'smooth' });
  }
};

let observer;

onMounted(() => {
    // Initialize Intersection Observer.
    const classToStateMap = {
        'skills': 'inViewSkills',
        'intro': 'inViewIntro',
        'projects': 'inViewProject',
        'languages': 'inViewLanguages',
    };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const stateProperty = classToStateMap[entry.target.className];
            if (stateProperty) {
                state[stateProperty] = entry.isIntersecting;
            }
        });
    };

    observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    Object.keys(classToStateMap).forEach(className => {
        const element = document.querySelector(`.${className}`);
        if (element) {
            observer.observe(element);
        }
    });

    // Initialize sections data and attach scroll handlers.
    calculateSectionData();
    window.addEventListener('scroll', updateElementPositionsOnScroll);
    window.addEventListener('resize', calculateSectionData);
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    observer.disconnect();

    window.removeEventListener('scroll', updateElementPositionsOnScroll);
    window.removeEventListener('resize', calculateSectionData);
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
<div v-cloak>
    <transition name="navbar-fade">
        <div class="navbar-wrapper" v-show="isScrollingUp==true">
            <Navbar :scroll="scroll"/>
        </div>
    </transition>
    <div class="intro" :ref="el => { scroll.home = el }">
        <div class="container">
            <div>
                <h2 class="text-[2rem] font-[700] transform translate-y-[40px] opacity-[0]"
                    :class="{ 'animate-intro': state.inViewIntro }">Hello, it's</h2>
                <div class="transform translate-y-[80px] opacity-[0]" :class="{ 'animate-intro': state.inViewIntro }">
                    <h1 class="text-[5rem] font-[700]">Kianmehr<span class="text-[#00DC82]">.</span></h1>
                    <p class="text-[1.1rem] font-[400] mb-[20px] text-[#909090]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et
                        dolore magna aliqua.
                    </p>
                </div>
                <button @click="scrollTo('title')" id="intro-button" class="py-[15px] relative transition-transform duration-300 transition-box-shadow duration-300 overflow-hidden bg-transparent border-none opacity-0" :class="{ 'animate-intro': state.inViewIntro }">
                    <span class="content">
                        <span>SCROLL FOR MORE</span>
                    </span>
                    <div class="arrow"></div>
                </button>
            </div>
            <div class="opacity-[0]" :class="{ 'animate-intro': state.inViewIntro }">
                <img src="~/assets/img/IMG_1042.JPG" alt="Kianmehr's Image" />
            </div>
        </div>
    </div>

    <div class="title" :ref="el => { scroll.title = el }">
        <Slider />
        <div class="container">
            <div class="text-[3rem] font-[700] mb-[20px]">
                <h1 style="transform: translateX(100%);" :ref="el => { elements.leftIntroTitle = el }">A Peek Into My</h1>
                <h1 style="transform: translateX(-100%);" :ref="el => { elements.rightIntroTitle = el }">Software Skills</h1>
            </div>
        </div>
    </div>

    <div class="skills" :ref="el => { scroll.whatIDo = el }">
        <div class="container">
            <div class="opacity-[0] transform translate-y-[40px]" :class="{ 'animate-skills': state.inViewSkills }">
                <h1 class="text-[3rem] font-[700] mb-[20px]">What I Do</h1>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua."
                </p>
            </div>
            <div class="grid grid-cols-2 gap-[50px] opacity-[0] transform translate-y-[40px]" id="skills-grid"
                :class="{ 'animate-skills': state.inViewSkills }">
                <Skillsets />
            </div>
        </div>
    </div>

    <div class="languages">
        <div class="container">
            <div class="opacity-[0] translate-y-[80px]" :class="{ 'fade-in': state.inViewLanguages }">
                <h1 class="text-[3rem] font-[700]">Languages</h1>
                <Logos />
            </div>
        </div>
    </div>

    <div class="title">
        <Slider />
        <div class="container">
            <div>
                <h1 style="transform: translateX(100%);" :ref="el => { elements.leftIntroSectionTwoTitle = el }">Discover My</h1>
                <h1 style="transform: translateX(-100%);" :ref="el => { elements.rightIntroSectionTwoTitle = el }">Recent Projects</h1>
            </div>
        </div>
    </div>

    <div class="projects" :ref="el => { scroll.projects = el }">
        <div class="container">
            <transition-group name="fade" tag="div" class="relative w-full h-[1000px]">
                <div v-if="currentProjectIndex === 0" key="0" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': state.inViewProject }">
                        <h1>Project 1</h1>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                        <button class="github-button">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                            <span class="button-text">Github</span>
                        </button>
                    </div>
                    <div class="project-image" :class="{ 'animate-in': state.inViewProject }">
                        <img src="~/assets/img/IMG_1042.JPG" />
                    </div>
                </div>

                <div v-if="currentProjectIndex === 1" key="1" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': state.inViewProject }">
                        <h1>Project 2</h1>
                        <p>"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                        <button class="github-button">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                            <span class="button-text">Github</span>
                        </button>
                    </div>
                    <div class="project-image" :class="{ 'animate-in': state.inViewProject }">
                        <img src="~/assets/img/IMG_1042.JPG" />
                    </div>
                </div>

                <div v-if="currentProjectIndex === 2" key="2" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': state.inViewProject }">
                        <h1>Project 3</h1>
                        <p>"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."</p>
                        <button class="github-button hover:w-[92.2px];">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                            <span class="button-text">Github</span>
                        </button>
                    </div>
                    <div class="project-image" :class="{ 'animate-in': state.inViewProject }">
                        <img src="~/assets/img/IMG_1042.JPG" />
                    </div>
                </div>
            </transition-group>
        </div>
    </div>

    <div class="flex justify-center" :ref="el => { scroll.resume = el }">
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

    <ResumeHeader />
    <div class="flex justify-center items-center">
        <div class="container">
            <Cards />
        </div>
    </div>

    <div class="wrap">
        <div class="container">
            <div>
                <p :ref="el => { elements.firstTextSectionThree = el }">And that's a wrap</p>
                <p :ref="el => { elements.secondTextSectionThree = el }">What's next?</p>
                <p :ref="el => { elements.thirdTextSectionThree = el }">Stay in touch!</p>
            </div>
        </div>
    </div>

    <div class="flex justify-center py-[50px] relative">
        <div class="container">
            <Contact />
        </div>
    </div>
</div>
</template>

<style>
.intro {
    @apply flex justify-around items-center h-screen;
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

.project-item {
    @apply absolute w-full top-0 left-0 flex justify-center items-center;
}

.project-info {
    @apply opacity-0 transform translate-y-[50px];
}

.project-image {
    @apply opacity-0 transform translate-x-[50px];
}

.project-image img{
    aspect-ratio: 4/5;
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

.github-button{
    @apply flex items-center border-0 w-[39.4px] font-normal p-2.5;
    border-bottom: 2px solid #00DC82;
    transition: width 0.3s ease;
}

.linkedin-button:hover .button-text,
.email-button:hover .button-text,
.github-button:hover .button-text {
    @apply opacity-100 transform translate-x-0;
}

/* navbar animation */
.navbar-wrapper {
    @apply fixed top-0 left-0 right-0 z-[100];
  }

.navbar-fade-enter-from, .navbar-fade-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}

.navbar-fade-enter-to, .navbar-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.navbar-fade-enter-active, .navbar-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

/* For Tablets */
@media (max-width: 1024px) {
    .title .container h1 {
        @apply text-[4.5rem];
    }
    
    .projects .container div h1 {
        @apply text-[3rem];
    }

    .projects .container div p {
        @apply text-[1.5rem];
    }

    .wrap .container div p {
        @apply text-[5rem];
    }
}

/* For Mobile Devices */
@media (max-width: 768px) {
    .container {
        @apply w-full px-4;
    }

    .title .container h1 {
        @apply text-[4rem];
    }

    .skills .container div,
    .projects .container div {
        @apply flex-1 w-full;
    }

    .languages .container div {
        @apply pt-40;
    }

    .wrap .container div p {
        @apply text-[3.5rem];
    }

    .github-button:hover,
    .linkedin-button:hover,
    .email-button:hover {
        @apply w-auto;
    }
}
</style>