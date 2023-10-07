<template>
    <div class="footer-content">
        <div class="line"></div>
        <span class="author-text">Designed by <span class="author-name">Kianmhz</span></span>
        <div class="line"></div>
    </div>
</template>

<style>
.footer-content {
    padding: 20px 0;
    width: 100%;
    text-align: center;
    color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.author-name {
    animation: gradient 20s linear infinite alternate;
    
    background: var(--gradient-color);
    background-size: 1000% 100%;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
}

.line {
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0), var(--secondary-text-color), rgba(255,255,255,0));
    flex-grow: 1;
}
</style>