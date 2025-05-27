<template>
  <div class="main">
    <div class="white_circle"></div>
    <div class="fla fla_one">
      <div class="squ squ_one"></div>
      <div class="tri tri_one"></div>
    </div>
    <div class="fla fla_two">
      <div class="squ squ_two"></div>
      <div class="tri tri_two"></div>
    </div>
    <div class="fla fla_three">
      <div class="squ squ_three"></div>
      <div class="tri tri_three"></div>
    </div>
    <div class="fla fla_four">
      <div class="squ squ_four"></div>
      <div class="tri tri_four"></div>
    </div>
  </div>

  <div class="container">
    <div class="case">
      <div class="one">
        <div class="leaf"></div>
        <div class="square"></div>
      </div>
      <div class="two">
        <div class="leaf"></div>
        <div class="square"></div>
      </div>
      <div class="three">
        <div class="leaf"></div>
        <div class="square"></div>
      </div>
      <div class="four">
        <div class="leaf"></div>
        <div class="square"></div>
      </div>
      <div class="dot"></div>
    </div>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}
.main {
  width: 804px;
  height: 804px;
  animation: roll 3000ms linear infinite;
}
@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.white_circle {
  z-index: 99;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: white;
  margin: 377px 0 0 377px;
}
.fla {
  position: absolute;
  width: 402px;
  height: 180px;
}
.fla_one {
  transform: rotate(270deg);
  margin: 108px 0px 0px 121px;
}
.fla_two {
  transform: rotate(180deg);
  margin-top: 389px;
}
.fla_three {
  transform: rotate(90deg);
  margin: 511px 0 0 280px;
}
.fla_four {
  transform: rotate(360deg);
  margin: 230px 0 0 402px;
}
.tri {
  width: 0;
  height: 0;
  border-width: 142px;
  border-style: solid;
  border-top-left-radius: 109px 122px;
  position: absolute;
  transform: rotate(45deg);
  top: 28px;
  left: 56px;
}
.tri_one {
  border-color: #f1c40f transparent transparent #f1c40f;
}
.tri_two {
  border-color: #ea4c3c transparent transparent #ea4c3c;
}
.tri_three {
  border-color: #2ecc71 transparent transparent #2ecc71;
}
.tri_four {
  border-color: #1abc9c transparent transparent #1abc9c;
}
.squ {
  position: absolute;
  width: 271px;
  height: 170px;
  border-top-right-radius: 98px 68px;
}
.squ_one {
  background-color: #f39c12;
}
.squ_two {
  background-color: #c0392b;
}
.squ_three {
  background-color: #27ae60;
}
.squ_four {
  background-color: #16a085;
}

* {
  margin: 0;
  padding: 0;
}
:root {
  --color1: #fa8073;
  --color2: #34cb32;
  --color3: #e0c27c;
  --color4: #36b6f7;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.case {
  width: 80px;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: rotateC 1.8s linear 0s infinite reverse forwards;
}
@keyframes rotateC {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.dot {
  width: calc(100% / 10);
  height: calc(100% / 10);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: white;
  border-radius: 50%;
  z-index: 1;
}
.one,
.two,
.three,
.four {
  width: 50%;
  height: 50%;
}
.one {
  position: absolute;
  left: 0;
  top: 0;
}
.two {
  position: absolute;
  right: 0;
  top: 0;
}
.three {
  position: absolute;
  left: 0;
  bottom: 0;
}
.four {
  position: absolute;
  right: 0;
  bottom: 0;
}
/* 111111111111111 */
.one .leaf {
  width: calc(50% - 2px);
  height: calc(100% - 2px);
  border: 1px solid black;
  border-top-left-radius: 120px;
  border-bottom-left-radius: 120px;
  background: var(--color1);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.one .square {
  width: calc(50% - 2px);
  height: 50%;
  border: 1px solid black;
  border-bottom-color: transparent;
  background: var(--color1);
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
}
/* 2222222222222 */
.two .leaf {
  width: calc(100% - 2px);
  height: calc(50% - 2px);
  border: 1px solid black;
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
  background: var(--color2);
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.two .square {
  width: 50%;
  height: calc(50% - 2px);
  border: 1px solid black;
  border-left-color: transparent;
  background: var(--color2);
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 0;
}
/* 3333333333333 */
.three .leaf {
  width: calc(100% - 2px);
  height: calc(50% - 2px);
  border: 1px solid black;
  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
  background: var(--color3);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.three .square {
  width: 50%;
  height: calc(50% - 2px);
  border: 1px solid black;
  border-right-color: transparent;
  background: var(--color3);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
}
/* 4444444444444 */
.four .leaf {
  width: calc(50% - 2px);
  height: calc(100% - 2px);
  border: 1px solid black;
  border-top-right-radius: 120px;
  border-bottom-right-radius: 120px;
  background: var(--color4);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.four .square {
  width: calc(50% - 2px);
  height: 50%;
  border: 1px solid black;
  border-top-color: transparent;
  background: var(--color4);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
