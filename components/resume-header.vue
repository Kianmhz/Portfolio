<template>
<div class="resume-header text-[3rem] font-[700] text-[#00DC82]">
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0px;
}
  .wrapper {
    overflow: hidden;
    height: 60px;
    padding-left: 20px;
}
  
.list {
    text-align: left;
    list-style: none;
    animation: change 3s infinite;
    line-height: 60px;
}
  
@keyframes change {
    0%, 25% {transform:translate3d(0,0,0);}
    25%, 50% {transform:translate3d(0,-50%,0);}
    50%, 75% {transform:translate3d(0,-50%,0);}
    75%, 100% {transform:translate3d(0,0,0);}
}
</style>