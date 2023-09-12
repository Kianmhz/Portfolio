<script setup>
import { ref, onMounted } from 'vue';
import Logos from '~/components/logos.vue';
import Slider from '~/components/slider.vue';
import Cards from '~/components/cards.vue';

const currentProjectIndex = ref(0);

const goBack = () => {
    if (currentProjectIndex.value > 0) {
        currentProjectIndex.value--;
    }
};

const goForward = () => {
    if (currentProjectIndex.value < 2) {
        currentProjectIndex.value++;
    }
};


const inView1 = ref(false);
const inView2 = ref(false);
const inViewSkills = ref(false);
const inViewIntro = ref(false);
const inViewProject = ref(false);

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
            }
        });
    },
        {
            threshold: 0.1,
        });

    const elementsToObserve = [
        '.container-title1',
        '.container-title2',
        '.skills',
        '.intro',
        '.projects'
    ];

    elementsToObserve.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });
});
</script>

<template>
    <div class="intro">
        <div class="container">
            <!-- Text Content -->
            <div>
                <h2 class="text-[2rem] font-[700] transform translate-y-[40px] opacity-[0]"
                    :class="{ 'animate-intro': inViewIntro }">Hello, it's</h2>
                <div class="transform translate-y-[80px] opacity-[0]" :class="{ 'animate-intro': inViewIntro }">
                    <h1 class="text-[5rem] font-[700]">Kianmehr<span class="text-[#00DC82]">.</span></h1>
                    <p class="text-[1.1rem] font-[400] mb-[20px] text-[#909090]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et
                        dolore magna aliqua.
                    </p>
                </div>
                <button :class="{ 'animate-intro': inViewIntro }">
                    <span class="content">
                        <span>SCROLL FOR MORE</span>
                    </span>
                    <div class="arrow"></div>
                </button>
            </div>
            <!-- Image Content -->
            <div class="opacity-[0]" :class="{ 'animate-intro': inViewIntro }">
                <img src="~/assets/img/IMG_1042.JPG" alt="Kianmehr's Image" />
            </div>
        </div>
    </div>

    <div class="title">
        <Slider />
        <div class="container container-title1">
            <div class="text-[3rem] font-[700] mb-[20px]">
                <h1 :class="{ 'from-right': !inView1, 'in-view': inView1 }">A Peek Into My</h1>
                <h1 :class="{ 'from-left': !inView1, 'in-view': inView1 }">Software Skills</h1>
            </div>
        </div>
    </div>

    <div class="skills">
        <div class="container">
            <div class="opacity-[0] transform translate-y-[40px]" :class="{ 'animate-skills': inViewSkills }">
                <h1 class="text-[3rem] font-[700] mb-[20px]">What I Do</h1>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua."
                </p>
            </div>
            <div class="grid grid-cols-2 gap-[50px] opacity-[0] transform translate-y-[40px]" id="skills-grind" :class="{ 'animate-skills': inViewSkills }">
                <div>
                    <h2>title</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua."</p>
                </div>
                <div>
                    <h2>title</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua."</p>
                </div>
                <div>
                    <h2>title</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua."</p>
                </div>
                <div>
                    <h2>title</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua."</p>
                </div>
            </div>
        </div>
    </div>

    <div class="languages">
        <div class="container">
            <div>
                <h1 class="text-[3rem] font-[700]">Languages</h1>
            </div>
            <Logos />
        </div>
    </div>

    <div class="title">
        <Slider />
        <div class="container container-title2">
            <div>
                <h1 :class="{ 'from-right': !inView2, 'in-view': inView2 }">Discover My</h1>
                <h1 :class="{ 'from-left': !inView2, 'in-view': inView2 }">Recent Projects</h1>
            </div>
        </div>
    </div>

    <div class="projects">
        <div class="container">
            <transition-group name="fade" tag="div" class="relative w-full h-[1000px]" mode="out-in" @before-enter="beforeEnter">
                <div v-if="currentProjectIndex === 0" key="0" class="project-item">
                    <div class="project-info" :class="{ 'animate-in': inViewProject }">
                        <h1>Project 1</h1>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                        <button class="github-button">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg"/>
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
                            <font-awesome-icon :icon="['fab', 'github']" size="lg"/>
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
                        <button class="github-button">
                            <font-awesome-icon :icon="['fab', 'github']" size="lg"/>
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

    <div class="project-buttons">
        <div class="container">
            <button class="back" @click="goBack">B</button>
            <button class="forward" @click="goForward">F</button>
        </div>
    </div>

    <div class="resume-header">
        <div class="container">
            <div>
                <h1 class="text-[3rem] font-[700] text-[#00DC82]">Resume and Certifications</h1>
            </div>
        </div>
    </div>

    <div class="resume">
        <div class="container">
            <Cards />
        </div>
    </div>

    <div class="wrap">
        <div class="container">
            <div>
                <p>And that's a wrap,<br>What's next? <br>Stay in touch!</p>
            </div>
        </div>
    </div>

    <div class="about">
        <div class="linkedin-pic">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#0288D1"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z">
                </path>
                <path fill="#FFF"
                    d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z">
                </path>
            </svg>
        </div>
        <div class="container">
            <div>
                <h1>linkedin</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
                <button class="linkedin-button">
                    <font-awesome-icon :icon="['fab', 'linkedin']" size="lg"/>
                    <span class="button-text">LinkedIn</span>
                </button>
            </div>
            <div>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua."</p>
            </div>
        </div>
    </div>

    <div class="about">
        <div class="gmail-pic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66">
                <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
                <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
                <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
                <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
                <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
            </svg>
        </div>
        <div class="container">
            <div>
                <h1>Email</h1>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
                <button class="email-button">
                    <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
                    <span class="button-text">Email</span>
                </button>
            </div>
            <div>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua."</p>
            </div>
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
    transform: translateY(0);
    transition: transform 1s, opacity 1s;
    opacity: 1;
}

/* Default button styles */
.intro .container div button {
    padding: 15px 0px;
    position: relative;
    transition: transform 0.3s, box-shadow 0.3s ease;
    overflow: hidden;
    background: transparent;
    border: none;
    opacity: 0;
}

.intro .container div button.animate-intro {
    transition: opacity 0.5s 2s;
    opacity: 1;
}

.content {
    display: inline-block;
    position: relative;
    transition: transform 0.4s, opacity 0.4s ease-in-out;
}

.content::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #00DC82;
}

/* Hover effect to slightly scale and fade out the content (text and underline) */
.intro .container div button:hover .content {
    @apply transform scale-[0.5] opacity-[0];
}

.arrow {
    position: absolute;
    left: 50%;
    bottom: 10%;
    width: 20px;
    height: 20px;
    border-left: 3px solid #00DC82;
    border-bottom: 3px solid #00DC82;
    transform: translate(-50%, 100%) rotate(-45deg);
    opacity: 0;
    transition: transform 0.5s 0.1s, opacity 0.5s ease-in-out 0.1s;
}

/* When button is hovered, arrow becomes visible and moves into view */
.intro .container div button:hover .arrow {
    opacity: 1;
    animation: bounce 0.8s infinite;
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
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}

#skills-grind.animate-skills {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1s ease-in, transform 1s ease-in;
}

.languages {
    @apply flex justify-center py-[50px];
}

.languages .container div {
    flex: 1 100%;
    padding: 50px 0px;
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
    opacity: 1;
    transform: translate(0);
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}

.fade-leave-active {
    position: absolute;
    transition: opacity 0.5s, transform 0.5s;
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.fade-enter-active {
    transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.project-buttons {
    @apply flex justify-center;
}

.back:hover {
    animation: bouncex 0.8s infinite;
}

.forward:hover {
    animation: bouncenx 0.8s infinite;
}

.resume-header {
    @apply p-[50px] flex justify-center;
}

.resume {
    @apply flex justify-center items-center;
}

.wrap {
    @apply flex justify-center py-[50px];
}

.wrap .container {
    @apply justify-start;
}

.wrap .container div p {
    font-size: 7rem;
    font-weight: 400;
    padding: 50px 0px;
    background: linear-gradient(to bottom, #00FFFF, #00DC82, #FFFF00);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.linkedin-pic {
    @apply absolute top-[-10px] left-0 w-[15%] z-[1000];
}

.linkedin-pic svg {
    width: 100%;
    /* this will take the width of the .gmail-pic */
    height: auto;
    filter: brightness(0.6);
    -webkit-mask-image: linear-gradient(to left, black 0%, transparent 100%);
    mask-image: linear-gradient(to left, black 0%, transparent 100%);
}

.gmail-pic {
    @apply absolute top-0 right-0 w-[15%] z-[1000];
}

.gmail-pic svg {
    width: 100%;
    /* this will take the width of the .gmail-pic */
    height: auto;
    filter: brightness(0.6);
    -webkit-mask-image: linear-gradient(to right, black 0%, transparent 100%);
    mask-image: linear-gradient(to right, black 0%, transparent 100%);
}

.about {
    @apply flex justify-center py-[50px] relative;
}

.about .container div {
    flex: 1 1 50%;
}

.about .container div h1 {
    @apply text-[1rem] font-[700] text-[#00DC82];
}

.about .container div h2 {
    @apply text-[2rem] font-[700];
}

.about .container div p {
    @apply text-[1.1rem] font-[400] text-[#909090];
}

.github-button {
    display: flex;
    align-items: center;
    border: none;
    width: 39.4px;
    font-weight: 400;
    padding: 10px;
    border-bottom: 1px solid #00DC82;
    transition: width 0.3s ease;
}

.github-button:hover {
    width: 92.2px;
}

.linkedin-button {
    display: flex;
    align-items: center;
    border: none;
    width: 37.5px;
    font-weight: 400;
    padding: 10px;
    border-bottom: 1px solid #00DC82;
    transition: width 0.3s ease;
}

.linkedin-button:hover {
    width: 102px;
}

.email-button {
    display: flex;
    align-items: center;
    border: none;
    width: 40px;
    font-weight: 400;
    padding: 10px;
    border-bottom: 1px solid #00DC82;
    transition: width 0.3s ease;
}

.email-button:hover {
    width: 82.8px;
}

.button-text {
    display: inline-block;
    margin-left: 5px;
    color: #fff;
    opacity: 0;
    transform: translateX(-20px);
    transition: transform 0.3s ease, opacity 0.3s ease;
    white-space: nowrap; /* This prevents the text from wrapping to the next line */
}

.linkedin-button:hover .button-text,
.email-button:hover .button-text,
.github-button:hover .button-text {
    transform: translateX(0);
    opacity: 1;
}
</style>