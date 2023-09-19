<template>
    <div class="nav-bar">
        <a href="#" class="nav">Home</a>
        <a href="#" class="nav">What I do</a>
        <a href="#" class="nav">Projects</a>
        <a href="#" class="nav">Resume</a>
    </div>
</template>

<style scoped>
.nav-bar {
	@apply flex fixed flex-row flex-wrap justify-between w-full z-[100];
    background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0));
}
.nav {
	@apply flex-1 p-4 text-center text-white no-underline transition-all duration-200;
}
.nav:hover {
    @apply text-[#00DC82] font-bold;
}
</style>