<script setup>
// Reactive references and states.
const scroll = reactive({
    home: null,
    title: null,
    whatIDo: null,
    projects: null,
    resume: null,
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

let rafId = null;

const calculateRate = (element, startOffset = 0, endOffset = 0, invert = false) => {
    if (!element) return 0;
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
        if (elements.leftIntroTitle) elements.leftIntroTitle.style.transform = `translateX(-${sectionOneRate * 25}%)`;
        if (elements.rightIntroTitle) elements.rightIntroTitle.style.transform = `translateX(${sectionOneRate * 25}%)`;

        if (elements.leftIntroSectionTwoTitle) elements.leftIntroSectionTwoTitle.style.transform = `translateX(-${sectionTwoRate * 25}%)`;
        if (elements.rightIntroSectionTwoTitle) elements.rightIntroSectionTwoTitle.style.transform = `translateX(${sectionTwoRate * 25}%)`;

        if (elements.firstTextSectionThree) elements.firstTextSectionThree.style.opacity = sectionThreeRate >= 0.2 ? 1 : 0;
        if (elements.secondTextSectionThree) elements.secondTextSectionThree.style.opacity = sectionThreeRate >= 0.4 ? 1 : 0;
        if (elements.thirdTextSectionThree) elements.thirdTextSectionThree.style.opacity = sectionThreeRate >= 0.6 ? 1 : 0;
    });
};

// Smooth scroll to section.
const scrollTo = (refName) => {
    const sectionRef = scroll[refName];
    if (sectionRef) {
        sectionRef.scrollIntoView({ behavior: 'smooth' });
    }
};

// Resize handler
let windowWidth = 0;
let windowHeight = 0;

function handleResize() {
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;

    // Check if the width has changed to determine if it's a genuine resize event
    if (newWidth !== windowWidth) {
        updateElementPositionsOnScroll();
        windowWidth = newWidth;
        windowHeight = newHeight;
    }
}

onMounted(() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    window.addEventListener('scroll', updateElementPositionsOnScroll);
    window.addEventListener('resize', handleResize);
    updateElementPositionsOnScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateElementPositionsOnScroll);
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <BaseNavbar :scroll="scroll" :scrollTo="scrollTo"/>
    
    <UContainer>
        <div class="intro flex flex-col text-center justify-center items-center min-h-dvh sm:flex-row sm:text-left">
            <div class="w-full sm:w-1/2">
                <h2 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true"  
                    class="text-3xl sm:text-4xl font-bold">Hello, I'm
                </h2>
                <div 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="150"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true" >
                    <h1 class="text-6xl sm:text-8xl py-5 font-bold ">Kianmehr<span class="intro-dot">.</span></h1>
                    <p class="text-md sm:text-lg text-[--secondary-text-color]">
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
                    data-aos-once="true"
                    @click="scrollTo('title')" id="intro-button"
                    icon="line-md:coffee-loop"
                    title="EXPLORE"
                    class="mt-4"
                />
            </div>
            <div class="w-full sm:w-1/2">
                <NuxtImg
                    data-aos="fade"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true" 
                    class="ml-auto max-sm:mx-auto w-3/4" loading="eager" src="/img/me.webp" alt="Kianmehr's Image" />
            </div>
        </div>
    </UContainer>    

    <div class="relative">
        <Slider />
        <UContainer>
            <div class="flex justify-center items-center" :ref="el => { scroll.title = el }">
                <div class="will-change-transform absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <h1 class="title1" :ref="el => { elements.leftIntroTitle = el }">A Peek Into My</h1>
                    <h1 class="title2" :ref="el => { elements.rightIntroTitle = el }">Software Skills</h1>
                </div>
            </div>
        </UContainer>
    </div>

    <UContainer>
        <div class="flex flex-col justify-center items-center gap-32 min-h-dvh" :ref="el => { skillsRef = el; scroll.whatIDo = el }">
            <div class="grid grid-cols-1 text-center gap-y-12 lg:grid-cols-2 lg:gap-x-14 sm:text-left">
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true"
                    class="flex flex-col justify-center">
                    <h1 class="text-3xl sm:text-4xl mb-4 font-bold">What I Do</h1>
                    <p class="text-md sm:text-lg text-[--secondary-text-color]">
                    Creating digital experiences through a fusion of sleek design and seamless functionality. From the
                    first click to the lasting impression, I blend aesthetics with performance, making every interaction
                    matter.
                    </p>
                </div>
                <div 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true">
                    <Skillset />
                </div>
            </div>
            <logos />
        </div>
    </UContainer>      

    <div class="relative">
        <Slider />
        <UContainer>
            <div class="flex justify-center items-center">
                <div class="will-change-transform absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <h1 class="title1" :ref="el => { elements.leftIntroSectionTwoTitle = el }">Discover My</h1>
                    <h1 class="title2" :ref="el => { elements.rightIntroSectionTwoTitle = el }">Recent Projects</h1>
                </div>
            </div>
        </UContainer>
    </div>

    <div class="" :ref="el => { projectsRef = el; scroll.projects = el }">
        <Projects />
        <Cards />
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
    @apply text-4xl md:text-7xl mb-5 font-bold whitespace-nowrap text-transparent;
    animation: gradient 20s linear infinite alternate;
    background: var(--gradient-color);
    background-size: 1000% 100%;
    background-clip: text;
    -webkit-background-clip: text;
}

.title2 {
    @apply text-4xl md:text-7xl font-bold whitespace-nowrap text-transparent;
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
}

/* Wrap section styles */
.wrap div p {
    @apply text-4xl md:text-8xl font-bold whitespace-nowrap text-transparent;
    animation: gradient 20s linear infinite alternate;
    background: var(--gradient-color);
    background-size: 1000% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    transition: opacity 0.5s ease-in-out;
}
</style>