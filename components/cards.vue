<template>
    <div class="relative w-[1000px] h-[500px]">
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
    @apply absolute w-[calc(100%-40px)] h-[calc(100%-40px)] p-10;
    background: linear-gradient(to right, rgb(24, 24, 24), rgb(0, 0, 0));
    transition: 0.3s ease;
    box-shadow: -30px 0px 30px rgba(0, 0, 0, 0.7);
}

.resume-card p {
    @apply text-[2rem];
}

.resume-card h1 {
    @apply absolute top-[350px] text-[#909090] text-[2rem] mb-[20px];
}

/* Card-specific styles for positioning and hover effect */
#card1 {
    @apply z-[3] translate-x-[10%];
    border-left: 2px solid #00FFFF;
}

#card2 {
    @apply z-[2];
    border-left: 2px solid #00FFA6;
}

#card3 {
    @apply z-[1] translate-x-[-10%];
    border-left: 2px solid #00DC82;
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
    @apply transform translate-x-[90%] filter brightness-[0.5];
}

#card2:hover~#card1 {
    @apply transform translate-x-[100%] filter brightness-[0.5];
}
</style>