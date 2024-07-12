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
    inViewProjects: false,
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

        elements.firstTextSectionThree.style.opacity = sectionThreeRate >= 0.2 ? 1 : 0;
        elements.secondTextSectionThree.style.opacity = sectionThreeRate >= 0.4 ? 1 : 0;
        elements.thirdTextSectionThree.style.opacity = sectionThreeRate >= 0.6 ? 1 : 0;
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

const reactiveProjectHeight = () => {
    var projects = projectsRef.value;
    projects.style.height = 0;
    projects.style.height = projects.scrollHeight + 'px';
};

// Resize handler
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

function handleResize() {
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;

    // Check if the width has changed to determine if it's a genuine resize event
    if (newWidth !== windowWidth) {
        updateElementPositionsOnScroll();
        reactiveProjectHeight();
        windowWidth = newWidth;
        windowHeight = newHeight;
    }
}

const introRef = ref(null);
const skillsRef = ref(null);
const projectsRef = ref(null);

onMounted(() => {
    // Initialize Intersection Observer.
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const targetRef = entry.target.__vue_ref;
            if (targetRef && entry.isIntersecting) {
                state[targetRef] = true;
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });

    const refsToObserve = [skillsRef, introRef, projectsRef];
    refsToObserve.forEach(ref => {
        if (ref.value) {
            observer.observe(ref.value);
            // Attach a custom property to link the observed element to its state
            ref.value.__vue_ref = 'inView' + ref.value.className.charAt(0).toUpperCase() + ref.value.className.slice(1);
        }
    });

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', handleResize);

    setTimeout(() => { reactiveProjectHeight(); }, 1000);

});

onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', updateElementPositionsOnScroll);
});
</script>

<template>
    <transition name="navbar-fade">
        <div class="navbar-wrapper" v-show="isScrollingUp == true">
            <BaseNavbar :scroll="scroll" />
        </div>
    </transition>
    <UContainer>    
        <div class="intro flex flex-col text-center justify-center items-center h-screen sm:flex-row sm:text-left">
            <div>
                <h2             
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="True"  
                class="text-5xl font-bold">Hello, I'm</h2>
                <div             
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="150"
                data-aos-easing="ease-in-out"
                data-aos-once="True" >
                    <h1 class="text-8xl leading-normal font-bold ">Kianmehr<span
                            class="intro-dot">.</span></h1>
                    <p class="text-xl mb-5 text-[--secondary-text-color]">
                        A dedicated Software Developer driven by creativity, innovation and a continuous quest for
                        proficiency. Every
                        project I pursue is a journey of exploration, dedication, and a drive for excellence.
                    </p>
                </div>
                <BaseButton
                data-aos="fade"
                data-aos-duration="1000"
                data-aos-delay="2000"
                data-aos-easing="ease-in-out"
                data-aos-once="True"
                @click="scrollTo('title')" id="intro-button"
                icon="line-md:coffee-loop"
                title="EXPLORE BELOW"
                />
            </div>
            <div>
                <img class="ml-auto w-1/2" loading="eager" src="~/assets/img/me.webp" alt="Kianmehr's Image" />
            </div>
        </div>
    </UContainer>

    <div class="relative">
        <slider />
        <UContainer>
            <div class="flex justify-center items-center" :ref="el => { scroll.title = el }">
                <div class="will-change-transform absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <h1 class="title1" :ref="el => { elements.leftIntroTitle = el }">A Peek Into My</h1>
                    <h1 class="title2" :ref="el => { elements.rightIntroTitle = el }">Software Skills</h1>
                </div>
            </div>
        </UContainer>
    </div>

    <div class="flex justify-center items-center flex-col h-screen" :ref="el => { skillsRef = el; scroll.whatIDo = el }">
        <UContainer>
            <div class="grid grid-cols-1 text-center gap-x-14 mb-28 lg:grid-cols-2 sm:text-left">
                <div class="flex flex-col justify-center">
                    <h1 class="text-5xl leading-normal font-bold">What I Do</h1>
                    <p class="text-lg text-[--secondary-text-color]">
                        Creating digital experiences through a fusion of sleek design and seamless functionality. From the
                        first click to the lasting impression, I blend aesthetics with performance, making every interaction
                        matter.
                    </p>
                </div>
                <div class="">
                    <Skillset />
                </div>
            </div>
            <logos />
        </UContainer>
    </div>

    <div class="relative">
        <slider />
        <UContainer>
            <div class="flex justify-center items-center">
                <div class="will-change-transform absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <h1 class="title1" :ref="el => { elements.leftIntroSectionTwoTitle = el }">Discover My</h1>
                    <h1 class="title2" :ref="el => { elements.rightIntroSectionTwoTitle = el }">Recent Projects</h1>
                </div>
            </div>
        </UContainer>
    </div>

    <div class="projects" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
        :ref="el => { projectsRef = el; scroll.projects = el }">
        <div class="flex flex-col justify-center items-center max-lg:overflow-hidden max-sm:overflow-hidden">
            <div class="container">
                <transition-group name="project-fade" tag="div" class="relative">
                    <div v-if="currentProjectIndex === 0" key="0" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProjects }">
                            <h1>Dine Discover</h1>
                            <p>Developed with Vanilla JS and Django, Dine Discover is a conceptual platform for
                                exploring
                                restaurants. While the platform is not operational, its design emphasizes a
                                user-friendly
                                interface, clean
                                visuals, and organized data. Features include user authentication, search, and detailed
                                restaurant reviews.</p>
                            <button>
                                <a class="contact-button" href="https://github.com/Kianmhz/restaurant-finder"
                                    target="_blank" rel="noopener noreferrer">
                                    <div class="button-icon">
                                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                    </div>
                                    <div class="button-text">Github</div>
                                </a>
                            </button>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProjects }">
                            <img src="~/assets/img/dine.webp" alt="DineD logo"/>
                        </div>
                    </div>

                    <div v-if="currentProjectIndex === 1" key="1" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProjects }">
                            <h1>Instagram Bot</h1>
                            <p>Utilizing Python Playwright library, this bot is designed to streamline various Instagram
                                tasks. With
                                capabilities like logging in, posting photos and videos, as well as managing
                                follow/unfollow
                                actions, it's built to run in a continuous loop, ensuring sustained activity and
                                automation.</p>
                            <button>
                                <a class="contact-button" href="https://github.com/Kianmhz/IG-bot" target="_blank"
                                    rel="noopener noreferrer">
                                    <div class="button-icon">
                                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                    </div>
                                    <div class="button-text">Github</div>
                                </a>
                            </button>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProjects }">
                            <img src="~/assets/img/ig.webp" alt="ig logo"/>
                        </div>
                    </div>

                    <div v-if="currentProjectIndex === 2" key="2" class="project-item">
                        <div class="project-info" :class="{ 'animate-projects': state.inViewProjects }">
                            <h1>X / Twitter Bot</h1>
                            <p>Engineered with Python Playwright library, Twitter Bot is equipped to handle tasks like
                                logging in, posting multimedia content, and following or
                                unfollowing users. Designed for long-term operations, it runs in an infinite loop,
                                ensuring
                                consistent and reliable automation.</p>
                            <button>
                                <a class="contact-button" href="https://github.com/Kianmhz/X-bot" target="_blank"
                                    rel="noopener noreferrer">
                                    <div class="button-icon">
                                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                                    </div>
                                    <div class="button-text">Github</div>
                                </a>
                            </button>
                        </div>
                        <div class="project-image" :class="{ 'animate-projects': state.inViewProjects }">
                            <img src="~/assets/img/x.webp" alt="X logo"/>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>

    <div class="flex justify-center items-center mt-[60px] gap-[80px]" :ref="el => { scroll.resume = el }">
        <button aria-label="Go backward" id="back" @click="goBack"><font-awesome-icon :icon="['fas', 'circle-chevron-left']"
                size="xl" /></button>
        <div class="dots">
            <div :class="{ active: currentProjectIndex === 0 }" @click="setProjectIndex(0)"></div>
            <div :class="{ active: currentProjectIndex === 1 }" @click="setProjectIndex(1)"></div>
            <div :class="{ active: currentProjectIndex === 2 }" @click="setProjectIndex(2)"></div>
        </div>
        <button aria-label="Go forward" id="forward" @click="goForward"><font-awesome-icon :icon="['fas', 'circle-chevron-right']"
                size="xl" /></button>
    </div>

    <div class="resume">
        <resumeHeader />
        <div class="container">
            <card-factory />
        </div>
    </div>

    <div class="wrap my-10 text-center sm:text-left">
        <UContainer>
            <div class="will-change-transform whitespace-nowrap">
                <p :ref="el => { elements.firstTextSectionThree = el }">And that's a wrap</p>
                <p :ref="el => { elements.secondTextSectionThree = el }">What's next?</p>
                <p :ref="el => { elements.thirdTextSectionThree = el }">Stay in touch!</p>
            </div>
        </UContainer>
    </div>
    <Contact />
</template>

<style>
/* Intro section styles */
.intro-dot {
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Title section styles */

.title1 {
    @apply text-[7rem] font-[900] whitespace-nowrap text-transparent max-lg:text-[4rem] max-sm:text-[2.4rem];
    animation: gradient 20s linear infinite alternate;

    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title2 {
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

/* Projects section styles */
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
    @apply opacity-0 transform translate-y-[60px];
}

.contact-button {
    @apply max-sm:flex max-sm:justify-center;
}

.project-image {
    @apply opacity-0 transform translate-x-[60px];
}

.project-image img {
    width: 550px;
    margin-left: auto;
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
.wrap div p {
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

/* In view transitions */

/* Projects in view transitions */
.project-info.animate-projects,
.project-image.animate-projects {
    @apply opacity-100 transform translate-y-0 translate-x-0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.project-fade-leave-active {
    position: absolute;
    top: 0;
    left: 0;
}

.project-fade-leave-active,
.project-fade-enter-active {
    transition: 0.5s all ease-in-out;
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
    transition: 0.5s all ease-in-out;
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