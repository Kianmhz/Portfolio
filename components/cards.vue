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
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background: linear-gradient(to right, rgb(24, 24, 24), rgb(0, 0, 0));
    transition: 0.3s ease;
    box-shadow: -30px 0px 30px rgba(0, 0, 0, 0.7);
    padding: 40px;
}

.resume-card p {
    @apply text-[2rem] leading-[1.5];
}

.resume-card h1 {
    @apply absolute top-[350px] text-[#909090] text-[2rem] mb-[20px];
}

/* Card-specific styles for positioning and hover effect */
#card1 {
    z-index: 3;
    transform: translateX(10%);
    border-left: 2px solid #00FFFF;
}

#card2 {
    z-index: 2;
    border-left: 2px solid #00FFA6;
}

#card3 {
    z-index: 1;
    transform: translateX(-10%);
    border-left: 2px solid #00DC82;
}

#card2 {
    filter: brightness(0.6);
}

#card3 {
    filter: brightness(0.6);
}

#card2:hover {
    @apply filter brightness-[1];
}

#card3:hover {
    @apply filter brightness-[1];
}

#card3:hover~#card1 {
    @apply transform translate-x-[100%] filter brightness-[0.6];
}

#card3:hover~#card2 {
    @apply transform translate-x-[90%] filter brightness-[0.6];
}

#card2:hover~#card1 {
    @apply transform translate-x-[100%] filter brightness-[0.6];
}
</style>