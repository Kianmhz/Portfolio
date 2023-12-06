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

// Touch event handlers for project viewing.
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (event) => {
    touchStartX.value = event.touches[0].clientX;
};

const handleTouchEnd = (event) => {
    touchEndX.value = event.changedTouches[0].clientX;
    handleGesture();
};

const handleGesture = () => {
    const threshold = 50; // Adjust this threshold as needed
    if (touchEndX.value < touchStartX.value - threshold) {
        goForward();
    } else if (touchEndX.value > touchStartX.value + threshold) {
        goBack();
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
        const sectionThreeRate = calculateRate(elements.firstTextSectionThree, 0, -200);

        // Apply the rates to the animations
        elements.leftIntroTitle.style.transform = `translateX(-${sectionOneRate * 25}%)`;
        elements.rightIntroTitle.style.transform = `translateX(${sectionOneRate * 25}%)`;

        elements.leftIntroSectionTwoTitle.style.transform = `translateX(-${sectionTwoRate * 25}%)`;
        elements.rightIntroSectionTwoTitle.style.transform = `translateX(${sectionTwoRate * 25}%)`;

        elements.firstTextSectionThree.style.opacity = sectionThreeRate >= 0.1 ? 1 : 0;
        elements.secondTextSectionThree.style.opacity = sectionThreeRate >= 0.3 ? 1 : 0;
        elements.thirdTextSectionThree.style.opacity = sectionThreeRate >= 0.5 ? 1 : 0;
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
                    <h2 class="text-[3rem] font-[700] transform translate-y-[40px] opacity-[0] max-lg:text-[2.5rem] max-sm:text-[1.5rem]"
                        :class="{ 'animate-intro': state.inViewIntro }">Hello, I'm</h2>
                    <div class="transform translate-y-[80px] opacity-[0]" :class="{ 'animate-intro': state.inViewIntro }">
                        <h1 class="text-[7rem] font-[900] max-lg:text-[5rem] max-sm:text-[4rem]">Kianmehr<span
                                class="intro-dot">.</span></h1>
                        <p class="text-[1.2rem] font-[400] mb-[20px] text-[var(--secondary-text-color)]">
                            A dedicated Software Developer driven by creativity, innovation and a continuous quest for
                            proficiency. Every
                            project I pursue is a journey of exploration, dedication, and a drive for excellence.
                        </p>
                    </div>
                    <button @click="scrollTo('title')" id="intro-button"
                        class="py-[20px] relative transition-transform duration-300 transition-box-shadow duration-300 overflow-hidden bg-transparent border-none opacity-0 max-sm:hidden"
                        :class="{ 'animate-intro': state.inViewIntro }">
                        <span class="content">
                            <span>EXPLORE BELOW</span>
                        </span>
                        <div class="arrow"></div>
                    </button>
                </div>
                <div class="opacity-[0]" :class="{ 'animate-intro': state.inViewIntro }">
                    <img src="~/assets/img/me.png" alt="Kianmehr's Image" />
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
                    <h1 class="text-[3rem] font-[900] max-lg:text-[2.5rem]">What I Do</h1>
                    <p id="skills-about">
                        Creating digital experiences through a fusion of sleek design and seamless functionality. From the
                        first click to the lasting impression, I blend aesthetics with performance, making every interaction
                        matter.
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

        <div class="projects" @touchstart="handleTouchStart" @touchend="handleTouchEnd" :ref="el => { scroll.projects = el }">
            <div class="container">
                <transition-group name="project-fade" tag="div" class="relative flex justify-center items-center">
                    <div v-show="currentProjectIndex === 0" key="0" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProject }">
                            <h1>Dine Discover</h1>
                            <p>Developed with Vanilla JS and Django, Dine Discover is a conceptual platform for exploring
                                restaurants. While the platform is not operational, its design emphasizes a user-friendly
                                interface, clean
                                visuals, and organized data. Features include user authentication, search, and detailed
                                restaurant reviews.</p>
                            <a href="https://github.com/Kianmhz/Restaurant-finder" target="_blank" rel="noopener noreferrer">
                                <button class="contact-button">
                                    <div class="button-icon">
                                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                    </div>
                                    <div class="button-text">Github</div>
                                </button>
                            </a>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProject }">
                            <img src="~/assets/img/DineDiscover.png" />
                        </div>
                    </div>

                    <div v-show="currentProjectIndex === 1" key="1" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProject }">
                            <h1>Instagram Bot</h1>
                            <p>Utilizing Python Playwright library, this bot is designed to streamline various Instagram
                                tasks. With
                                capabilities like logging in, posting photos and videos, as well as managing follow/unfollow
                                actions, it's built to run in a continuous loop, ensuring sustained activity and
                                automation.</p>
                            <a href="https://github.com/Kianmhz/IG-bot" target="_blank" rel="noopener noreferrer">
                                <button class="contact-button">
                                    <div class="button-icon">
                                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                    </div>
                                    <div class="button-text">Github</div>
                                </button>
                            </a>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProject }">
                            <img src="~/assets/img/ig.png" />
                        </div>
                    </div>

                    <div v-show="currentProjectIndex === 2" key="2" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProject }">
                            <h1>X / Twitter Bot</h1>
                            <p>Engineered with Python Playwright library, Twitter Bot is equipped to handle tasks like
                                logging in, posting multimedia content, and following or
                                unfollowing users. Designed for long-term operations, it runs in an infinite loop, ensuring
                                consistent and reliable automation.</p>
                            <a href="https://github.com/Kianmhz/X-bot" target="_blank" rel="noopener noreferrer">
                                <button class="contact-button">
                                    <div class="button-icon">
                                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                    </div>
                                    <div class="button-text">Github</div>
                                </button>
                            </a>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProject }">
                            <img src="~/assets/img/x.jpeg" />
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="flex justify-center items-center gap-[80px]" :ref="el => { scroll.resume = el }">
                <button id="back" @click="goBack"><font-awesome-icon :icon="['fas', 'circle-chevron-left']"
                        size="xl" /></button>
                <div class="dots">
                    <div :class="{ active: currentProjectIndex === 0 }" @click="setProjectIndex(0)"></div>
                    <div :class="{ active: currentProjectIndex === 1 }" @click="setProjectIndex(1)"></div>
                    <div :class="{ active: currentProjectIndex === 2 }" @click="setProjectIndex(2)"></div>
                </div>
                <button id="forward" @click="goForward"><font-awesome-icon :icon="['fas', 'circle-chevron-right']"
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
    @apply flex justify-center items-center mt-[20px] h-screen max-lg:mt-[80px] max-sm:mt-[20px];
}

.intro .container {
    @apply grid grid-cols-2 gap-x-[50px] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:text-center;
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
    @apply flex justify-center items-center;
}

.title .container {
    @apply absolute;
}

.title .container h1:nth-child(1) {
    @apply text-[7rem] font-[900] whitespace-nowrap text-transparent max-lg:text-[4rem] max-sm:text-[2.4rem];
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title .container h1:nth-child(2) {
    @apply text-[7rem] font-[900] whitespace-nowrap text-transparent max-lg:text-[4rem] max-sm:text-[2.4rem];
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
    @apply flex justify-center items-center flex-col h-screen max-lg:h-full max-sm:h-full;
}

.skills .container {
    @apply grid grid-cols-2 gap-x-[50px] mb-[10%] max-lg:grid-cols-1 max-lg:gap-y-[100px] max-sm:text-center;
}

.skills .container div p {
    @apply text-[1.2rem] font-[400] text-[var(--secondary-text-color)];
}

.logos {
    @apply relative overflow-hidden w-4/5 max-sm:hidden;
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
    @apply flex flex-col justify-center items-center mt-[50px] gap-[60px] max-lg:overflow-hidden max-sm:overflow-hidden;
}

.projects .container div h1 {
    @apply text-[3rem] font-[900] mb-[20px] max-lg:text-[2.5rem];
}

.projects .container div p {
    @apply text-[1.2rem] font-[400] mb-[20px] text-[var(--secondary-text-color)];
}

.project-item {
    @apply grid grid-cols-2 justify-center items-center gap-[50px] max-sm:grid-cols-1 max-sm:text-center;
}

.project-info {
    @apply opacity-0 transform translate-y-[50px];
}

.project-info button {
    @apply max-sm:flex max-sm:justify-center;
}

.project-image {
    @apply opacity-0 transform translate-x-[50px];
}

.project-image img {
    aspect-ratio: 4/4;
}

/* Projects buttons styles */
#back:not(:active) {
    @apply max-sm:hidden;
    animation: bounce-x 0.8s;
}

#forward:not(:active) {
    @apply max-sm:hidden;
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
    @apply flex flex-col justify-center items-center max-lg:overflow-hidden max-sm:hidden;
}

/* Wrap section styles */
.wrap {
    @apply flex justify-center my-[50px] max-lg:overflow-hidden max-sm:overflow-hidden;
}

.wrap .container {
    @apply justify-start whitespace-nowrap;
}

.wrap .container div p {
    @apply text-[7rem] max-lg:text-[5rem] max-sm:text-[3rem];
    font-weight: 700;
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: opacity 0.5s ease-in-out;
}

/* Contacts section styles */
.contacts {
    display: flex;
    justify-content: center;
    margin: 100px 0;
}

/* In view transitions */

/* Intro in view transitions */
.animate-intro {
    @apply opacity-100 transform translate-y-0;
    transition: transform 1s, opacity 1s ease;
}

#intro-button.animate-intro {
    @apply opacity-100;
    transition: opacity 0.5s 2s ease;
}

/* Skills in view transitions */
.animate-skills {
    @apply opacity-100 transform translate-y-0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    transition-delay: 0.1s;
}

#skills-grid.animate-skills {
    @apply opacity-100 transform translate-y-0;
    transition: opacity 1s ease-in-out, transform 1s ease-in-out;
    transition-delay: 0.1s;
}

/* Projects in view transitions */
.project-info.animate-projects,
.project-image.animate-projects {
    @apply opacity-100 transform translate-y-0 translate-x-0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    transition-delay: 0.1s;
}

.project-fade-leave-active {
    position: absolute;
    top: 0;
    left: 0;
}

.project-fade-leave-active,
.project-fade-enter-active {
    transition: opacity 0.5s, transform 0.5s;
}

.project-fade-leave-to {
    opacity: 0;
    transform: translateX(var(--translate-x-leave));
}

.project-fade-enter-from {
    opacity: 0;
    transform: translateX(var(--translate-x-enter));
}

.project-fade-enter-to {
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
}
</style>