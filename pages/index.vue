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
        '.container-title1',
        '.container-title2',
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
            <div class="grid grid-cols-2 gap-[50px] opacity-[0] transform translate-y-[40px]" id="skills-grid" :class="{ 'animate-skills': inViewSkills }">
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
            <div class="opacity-[0] translate-y-[40px]" :class="{ 'fade-in':inViewLanguages }">
                <h1 class="text-[3rem] font-[700]">Languages</h1>
                <Logos />
            </div>
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
            <button id="back" class="mx-[100px]" @click="goBack"><font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl"/></button>
            <div class="dots">
                <div :class="{ active: currentProjectIndex === 0 }" @click="setProjectIndex(0)"></div>
                <div :class="{ active: currentProjectIndex === 1 }" @click="setProjectIndex(1)"></div>
                <div :class="{ active: currentProjectIndex === 2 }" @click="setProjectIndex(2)"></div>
            </div>
            <button id="forward" class="mx-[100px]" @click="goForward"><font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl"/></button>
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

#skills-grid.animate-skills {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1s ease-in, transform 1s ease-in;
}

.languages {
    @apply flex justify-center py-[50px];
}

.fade-in {
    transform: translateX(0);
    transition: transform 0.5s 0.5s, opacity 0.5s 0.5s ease-in;
    opacity: 1;
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
    transition: opacity 0.5s 0.5s ease-in, transform 0.5s 0.5s ease-in;
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
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.5s, transform 0.5s;
}

.project-buttons {
    @apply flex justify-center;
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
    background: linear-gradient(to bottom, #00FFFF, #00DC82, #00FFA6);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
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