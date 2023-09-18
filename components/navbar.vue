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
    background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0));
	display: flex;
    position: fixed;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
    z-index: 100;
}
.nav {
	flex: 1;
	padding: 15px;
	color: #fff;
	text-align: center;
	text-decoration: none;
	transition: 0.2s;
}
.nav:hover {
	color: #00DC82;
	font-weight: bold;
}
</style>