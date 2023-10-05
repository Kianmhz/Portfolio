<template>
    <div class="relative w-[100vh] h-[50vh]">
        <div class="resume-card" id="card3">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua."</p>
            <h1 class="resume-title">Python</h1>
        </div>
        <div class="resume-card" id="card2">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua."</p>
            <h1 class="resume-title">C++</h1>
        </div>
        <div class="resume-card" id="card1">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua."</p>
            <h1>Resume</h1>
        </div>
    </div>
</template>

<style scoped>
.resume-card {
    @apply absolute w-[100%] h-[100%] p-10;
    background: linear-gradient(to right, rgb(24, 24, 24), rgb(0, 0, 0));
    transition: 0.3s ease;
    box-shadow: -30px 0px 30px rgba(0, 0, 0, 0.7);
}

.resume-card p {
    @apply text-[2rem];
}

.resume-card h1 {
    @apply absolute top-[80%] text-[var(--secondary-text-color)] text-[2rem];
}

/* Card-specific styles for positioning and hover effect */
#card1 {
    @apply z-[3] translate-x-[15%];
    border-left: 2px solid var(--main-color);
}

#card2 {
    @apply z-[2];
    border-left: 2px solid var(--secondary-color);
}

#card3 {
    @apply z-[1] translate-x-[-15%];
    border-left: 2px solid var(--quaternary-color);
}

#card2 {
    @apply filter brightness-[0.5];
}

#card3 {
    @apply filter brightness-[0.5];
}

#card2:hover {
    @apply filter brightness-[1];
}

#card3:hover {
    @apply filter brightness-[1];
}

#card3:hover~#card1 {
    @apply transform translate-x-[100%] filter brightness-[0.5];
}

#card3:hover~#card2 {
    @apply transform translate-x-[85%] filter brightness-[0.5];
}

#card2:hover~#card1 {
    @apply transform translate-x-[100%] filter brightness-[0.5];
}
</style>