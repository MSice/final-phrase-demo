<!--
 * @Author: suqi04
 * @Date: 2024-03-29 15:41:44
 * @LastEditTime: 2024-03-29 18:38:52
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/components/bot/index.vue
 * @Description: 文件描述
-->
<template>
    <div
        class="bot-box"
        :style="{ bottom: bottom + 'px', right: right + 'px' }"
        @touchstart="dragStart"
        @mousedown="dragStart"
    >
        <div class="fp-robot-box">
            <transition name="robot-transition">
                <div
                    v-show="showRobotDialog"
                    :class="['robot-dialog', nowClass]"
                ></div>

            </transition>
            <img
                src="./Animation-bot.gif"
                alt=""
                @click="showRobotDialog = !showRobotDialog"
            >
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const move = ref(false);
const bottom = ref(60);
const right = ref(40);
const appDom = document.querySelector('#app');

const showRobotDialog = ref(false);
const moveType = ref(false);
const robotDiaBox = reactive({
    width: 400,
    height: 500
});
const nowClass = ref('top-left');

function mouseLeave() {
    moveType.value = true;
}

function dragStart(e: any) {
    moveType.value = false;
    switch (true) {
        case e.x >= 440 && e.y >= 540:
            nowClass.value = 'top-left';
            break;
        case e.x >= 440 && e.y < 540:
            nowClass.value = 'bottom-left';
            break;
        case e.x < 440 && e.y >= 540:
            nowClass.value = 'top-right';
            break;
        case e.x < 440 && e.y < 540:
            nowClass.value = 'bottom-right';
            break;
        default:
            nowClass.value = 'top-left';
            break;
    }

    console.log(e.x, e.y);
    setTimeout(() => {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });
}
function mouseMove(e: any) {
    showRobotDialog.value = false;
    let x = document.body.clientWidth - e.clientX;
    let y = document.body.clientHeight - e.clientY;
    console.log(x, y, document.body.clientWidth);

    if (x < 0) {
        x = 0;
        mouseUp(e);
    } else if (x > document.body.clientWidth - 90) {
        x = document.body.clientWidth - 90;
    }
    if (y < 0) {
        y = 0;
        mouseUp(e);
    } else if (y > document.body.clientHeight - 90) {
        x = document.body.clientHeight - 90;
    }
    right.value = x;
    bottom.value = y;
}
function mouseUp(e: any) {
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('mousemove', mouseMove);
}
</script>

<style>
.top-left {
    transform: translate(calc(-100% - 40px), calc(-100% - 40px));
}
.bottom-left {
    transform: translate(calc(-100% - 40px), 40px);
}

.top-right {
    transform: translate(40px, calc(-100% - 40px));
}
.bottom-right {
    transform: translate(40px, 40px);
}
</style>
<style lang="less" scoped>
.robot-transition {
    &-leave-to,
    &-enter {
        opacity: 0.4;
    }
    &-leave,
    &-enter-to {
        opacity: 1;
    }

    &-leave-active,
    &-enter-active {
        transition: opacity 0.2s;
    }
}
.bot-box {
    position: fixed;
    bottom: 60px;
    right: 40px;
    width: 80px;
    height: 80px;
    z-index: 999999;
    .fp-robot-box {
        position: relative;
        width: 100%;
        height: 100%;
        .robot-dialog {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 400px;
            height: 500px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0px 7px 1px #4101233b;
        }
    }
    img {
        width: 100%;
        cursor: pointer;
    }
}
</style>
