<template>
<div class="resume-header text-[3rem] font-[700] text-[var(--main-color)]">
    <span class="my-text">My</span>
    <div class="wrapper">
        <ul class="list">
            <li class="item">Resume &</li>
            <li class="item">Certificates</li>
        </ul>
    </div>
</div>
</template>

<style scoped>
.resume-header {
    @apply flex justify-center items-center my-[50px];
}

.wrapper {
    @apply overflow-hidden h-[60px] pl-5;
}

.list {
    @apply text-left list-none leading-[60px];
    animation: change 3s infinite;
}
</style>