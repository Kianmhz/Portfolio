<script setup>
// Reactive references and states.
const scroll = reactive({
    home: null,
    title: null,
    whatIDo: null,
    projects: null,
    resume: null,
});
const state = reactive({
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
    if (index > currentProjectIndex.value) {
        for (let i = currentProjectIndex.value; i < index; i++) {
            goForward();
        }
    }
    else if (index < currentProjectIndex.value) {
        for (let i = currentProjectIndex.value; i > index; i--) {
            goBack();
        }
    }
};

let rafId = null;

const calculateRate = (element, startOffset = 0, endOffset = 0, invert = false) => {
    const elementStart = element.getBoundingClientRect().top + window.scrollY - window.innerHeight + startOffset;
    const elementEnd = element.getBoundingClientRect().top + window.scrollY + element.offsetHeight + endOffset;
    const scrollRange = elementEnd - elementStart;

    let rate = (window.scrollY - elementStart) / scrollRange;

    // Invert the rate if necessary
    if (invert) {
        rate = 1 - rate;
    }

    // Clamp the rate between 0 and 1 to ensure it doesn't go beyond these values
    return Math.min(Math.max(rate, 0), 1);
};

const updateElementPositionsOnScroll = () => {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
        // Calculate rates for each section
        const sectionOneRate = calculateRate(elements.leftIntroTitle);
        const sectionTwoRate = calculateRate(elements.leftIntroSectionTwoTitle);
        const sectionThreeRate = calculateRate(elements.firstTextSectionThree, 0, -200, true);

        // Apply the rates to the animations
        elements.leftIntroTitle.style.transform = `translateX(-${sectionOneRate * 30}%)`;
        elements.rightIntroTitle.style.transform = `translateX(${sectionOneRate * 30}%)`;

        elements.leftIntroSectionTwoTitle.style.transform = `translateX(-${sectionTwoRate * 20}%)`;
        elements.rightIntroSectionTwoTitle.style.transform = `translateX(${sectionTwoRate * 20}%)`;

        elements.firstTextSectionThree.style.transform = `translateX(${sectionThreeRate * 30}%)`;
        elements.secondTextSectionThree.style.transform = `translateX(${sectionThreeRate * 50}%)`;
        elements.thirdTextSectionThree.style.transform = `translateX(${sectionThreeRate * 70}%)`;
    });
};

// Scroll direction detection logic.
const SCROLL_THRESHOLD = 100;
const maximumScrollPosition = ref(0);
const isScrollingUp = ref(true);
const scrollDetector = () => {
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

// attach scroll handler
let lastScrollTime = Date.now();
const scrollHandler = () => {
    updateElementPositionsOnScroll();

    const now = Date.now();
    if (now - lastScrollTime > 100) { // throttle scroll handler to 100ms
        scrollDetector();
        lastScrollTime = now;
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

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', updateElementPositionsOnScroll);
});

onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', updateElementPositionsOnScroll);
});
</script>

<template>
    <div v-cloak>
        <transition name="navbar-fade">
            <div class="navbar-wrapper" v-show="isScrollingUp == true">
                <navbar :scroll="scroll" />
            </div>
        </transition>

        <div class="intro" :ref="el => { scroll.home = el }">
            <div class="container">
                <div>
                    <h2 class="text-[3rem] font-[700] transform translate-y-[40px] opacity-[0]"
                        :class="{ 'animate-intro': state.inViewIntro }">Hello, it's</h2>
                    <div class="transform translate-y-[80px] opacity-[0]" :class="{ 'animate-intro': state.inViewIntro }">
                        <h1 class="text-[7rem] font-[900]">Kianmehr<span class="intro-dot">.</span></h1>
                        <p class="text-[1.2rem] font-[400] mb-[20px] text-[var(--secondary-text-color)]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <button @click="scrollTo('title')" id="intro-button"
                        class="py-[20px] relative transition-transform duration-300 transition-box-shadow duration-300 overflow-hidden bg-transparent border-none opacity-0"
                        :class="{ 'animate-intro': state.inViewIntro }">
                        <span class="content">
                            <span>EXPLORE BELOW</span>
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
            <slider />
            <div class="container">
                <div class="will-change-transform">
                    <h1 :ref="el => { elements.leftIntroTitle = el }">A Peek Into My</h1>
                    <h1 :ref="el => { elements.rightIntroTitle = el }">Software Skills</h1>
                </div>
            </div>
        </div>

        <div class="skills" :ref="el => { scroll.whatIDo = el }">
            <div class="container">
                <div class="opacity-[0] transform translate-y-[40px]" :class="{ 'animate-skills': state.inViewSkills }">
                    <h1 class="text-[3rem] font-[900]">What I Do</h1>
                    <p id="skills-about">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et
                        dolore magna aliqua."
                    </p>
                </div>
                <div class="opacity-[0] transform translate-y-[40px]" id="skills-grid"
                    :class="{ 'animate-skills': state.inViewSkills }">
                    <skillset-factory />
                </div>
            </div>
            <div class="logos">
                <logos />
            </div>
        </div>

        <div class="title">
            <slider />
            <div class="container">
                <div class="will-change-transform">
                    <h1 :ref="el => { elements.leftIntroSectionTwoTitle = el }">Discover My</h1>
                    <h1 :ref="el => { elements.rightIntroSectionTwoTitle = el }">Recent Projects</h1>
                </div>
            </div>
        </div>

        <div class="projects" :ref="el => { scroll.projects = el }">
            <div class="container">
                <transition-group name="fade" tag="div" class="relative w-full h-[90vh]">
                    <div v-if="currentProjectIndex === 0" key="0" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProject }">
                            <h1>Project 1</h1>
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                            <button class="contact-button">
                                <div class="button-icon">
                                    <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                </div>
                                <div class="button-text">Github</div>
                            </button>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProject }">
                            <img src="~/assets/img/IMG_1042.JPG" />
                        </div>
                    </div>

                    <div v-if="currentProjectIndex === 1" key="1" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProject }">
                            <h1>Project 2</h1>
                            <p>"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                            <button class="contact-button">
                                <div class="button-icon">
                                    <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                </div>
                                <div class="button-text">Github</div>
                            </button>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProject }">
                            <img src="~/assets/img/IMG_1042.JPG" />
                        </div>
                    </div>

                    <div v-if="currentProjectIndex === 2" key="2" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProject }">
                            <h1>Project 3</h1>
                            <p>"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."</p>
                            <button class="contact-button">
                                <div class="button-icon">
                                    <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                </div>
                                <div class="button-text">Github</div>
                            </button>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProject }">
                            <img src="~/assets/img/IMG_1042.JPG" />
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="flex justify-center items-center gap-[5rem]" :ref="el => { scroll.resume = el }">
                <button id="back" class="" @click="goBack"><font-awesome-icon :icon="['fas', 'circle-chevron-left']"
                        size="xl" /></button>
                <div class="dots">
                    <div :class="{ active: currentProjectIndex === 0 }" @click="setProjectIndex(0)"></div>
                    <div :class="{ active: currentProjectIndex === 1 }" @click="setProjectIndex(1)"></div>
                    <div :class="{ active: currentProjectIndex === 2 }" @click="setProjectIndex(2)"></div>
                </div>
                <button id="forward" class="" @click="goForward"><font-awesome-icon :icon="['fas', 'circle-chevron-right']"
                        size="xl" /></button>
            </div>
        </div>

        <div class="resume">
            <resumeHeader />
            <div class="container">
                <card-factory />
            </div>
        </div>

        <div class="wrap">
            <div class="container">
                <div class="will-change-transform">
                    <p :ref="el => { elements.firstTextSectionThree = el }">And that's a wrap</p>
                    <p :ref="el => { elements.secondTextSectionThree = el }">What's next?</p>
                    <p :ref="el => { elements.thirdTextSectionThree = el }">Stay in touch!</p>
                </div>
            </div>
        </div>

        <div class="contacts">
            <div class="container">
                <contact-factory />
            </div>
        </div>

        <footer>
            <footer-content />
        </footer>
    </div>
</template>

<style>
/* Intro section styles */
.intro {
    @apply flex justify-center items-center h-screen;
}

.intro .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 50px;
}

.intro-dot {
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.content {
    @apply inline-block relative text-[1rem];
    transition: transform 0.4s, opacity 0.4s ease-in-out;
}

.content::after {
    @apply absolute bottom-[-10px] left-0 w-full h-[2px] bg-[var(--main-color)];
    content: '';
}

#intro-button:hover .content {
    @apply transform scale-[0.5] opacity-0;
}

.arrow {
    @apply absolute left-1/2 bottom-[10%] w-5 h-5 opacity-0;
    border-left: 3px solid var(--main-color);
    border-bottom: 3px solid var(--main-color);
    transform: translate(-50%, 100%) rotate(-45deg);
    transition: transform 0.5s 0.1s, opacity 0.5s ease-in-out 0.1s;
}

#intro-button:hover .arrow {
    @apply opacity-100;
    animation: bounce 0.8s infinite;
}

/* Title section styles */
.title {
    @apply flex justify-center items-center h-[70vh];
}

.title .container h1:nth-child(1) {
    @apply text-[7rem] font-[900] relative whitespace-nowrap text-transparent;
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title .container h1:nth-child(2) {
    @apply text-[7rem] font-[900] relative whitespace-nowrap text-transparent;
    animation: gradient 20s linear infinite alternate;

    background: linear-gradient(-45deg,
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
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Skills section styles */
.skills {
    @apply flex justify-center items-center flex-col h-screen;
}

.skills .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 50px;
    margin-bottom: 10%;
}

.skills .container div p {
    @apply text-[1.2rem] font-[400] text-[var(--secondary-text-color)];
}

.logos {
    @apply relative overflow-hidden w-4/5;
}

.logos::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 1;
}

.logos::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 1;
}

/* Projects section styles */
.projects {
    @apply flex flex-col justify-center items-center relative h-[100vh];
}

.projects .container div h1 {
    @apply text-[3rem] font-[900] mb-[20px];
}

.projects .container div p {
    @apply text-[1.2rem] font-[400] mb-[20px] text-[var(--secondary-text-color)];
}

.project-item {
    @apply grid grid-cols-2 justify-center items-center gap-[50px];
}

.project-info {
    @apply opacity-0 transform translate-y-[50px];
}

.project-image {
    @apply opacity-0 transform translate-x-[50px];
}

.project-image img {
    aspect-ratio: 4/4;
}

/* Projects buttons styles */
#back:not(:active) {
    animation: bounce-x 0.8s;
}

#forward:not(:active) {
    animation: bouncex 0.8s;
}

.dots {
    @apply flex gap-4 justify-center items-center;
}

.dots div {
    @apply w-3 h-3 rounded-full bg-[var(--secondary-text-color)] cursor-pointer;
}

.dots div.active {
    @apply w-4 h-4 bg-[var(--main-color)];
}

/* Resume section styles */
.resume {
    @apply flex flex-col justify-center items-center;
}

/* Wrap section styles */
.wrap {
    @apply flex justify-center py-[50px];
}

.wrap .container {
    @apply justify-start whitespace-nowrap;
}

.wrap .container div p {
    @apply text-[7rem] font-normal;
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Contacts section styles */
.contacts {
    display: flex;
    justify-content: center;
}

/* In view transitions */

/* Intro in view transitions */
.animate-intro {
    @apply opacity-100 transform translate-y-0;
    transition: transform 1s, opacity 1s;
}

#intro-button.animate-intro {
    @apply opacity-100;
    transition: opacity 0.5s 2s;
}

/* Skills in view transitions */
.animate-skills {
    @apply opacity-100 transform translate-y-0;
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}

#skills-grid.animate-skills {
    @apply opacity-100 transform translate-y-0;
    transition: opacity 1s ease-in, transform 1s ease-in;
}

/* Projects in view transitions */
.project-info.animate-projects,
.project-image.animate-projects {
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

/* navbar animation */
.navbar-wrapper {
    @apply fixed top-0 left-0 right-0 z-[100];
}

.navbar-fade-enter-from,
.navbar-fade-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}

.navbar-fade-enter-to,
.navbar-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.navbar-fade-enter-active,
.navbar-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}</style>