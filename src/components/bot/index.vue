<!--
 * @Author: 777
 * @Date: 2024-03-29 15:41:44
 * @LastEditTime: 2024-05-19 10:43:07
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
                    @mousedown.stop
                    @touchstart.stop
                    @click.stop
                >
                    <div class="robot-dialog-title">
                        Final Phrase
                        <span
                            class="close-btn"
                            @click.stop="showRobotDialog = false"
                        >×</span>
                    </div>
                    <div
                        ref="robotDialogContent"
                        id="robot-dialog-content"
                        class="robot-dialog-content"
                    >
                        <div class="content-warp">
                            <div class="content-avatar">
                                <img
                                    src="./Animation-bot.png"
                                    alt=""
                                />
                            </div>
                            <div class="dialogue-content">
                                你好，我是Final Phrase
                                智能助理，我将根据您输入的问题，自动生成回答。
                            </div>
                        </div>
                        <template
                            v-for="(item, index) in localStorageHistoryList"
                            :key="index"
                        >
                            <div class="content-warp content-reverse-warp">
                                <div class="dialogue-content">
                                    {{ item.question }}
                                </div>
                                <div class="content-avatar">
                                    <img
                                        :src="userImageUrl"
                                        alt=""
                                    >
                                </div>
                            </div>
                            <div class="content-warp">
                                <div class="content-avatar">
                                    <img
                                        src="./Animation-bot.png"
                                        alt=""
                                    >
                                </div>
                                <div class="dialogue-content">
                                    {{ item.aiAnswer }}
                                </div>
                            </div>
                        </template>
                        <div id="scroll-to-bottom"></div>
                    </div>
                    <div class="robot-dialog-buble">
                        <div class="buble-btn buble-help">
                            <el-icon>
                                <Warning />
                            </el-icon>
                            <span style="margin-left: 3px"> 帮助 </span>
                        </div>
                    </div>
                    <div class="robot-dialog-footer">
                        <el-input
                            v-model="inputText"
                            style="width: 100%; height: 100%"
                            type="textarea"
                            resize="none"
                            placeholder="请输入你的问题"
                            @keydown.enter="sendQuestion"
                        />
                    </div>
                </div>
            </transition>
            <img
                src="./Animation-bot.gif"
                alt=""
                @click="clickHandle"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';
const userImageUrl = require('./userImg.png');
const move = ref(false);
const longClickTimer = ref();
const bottom = ref(60);
const right = ref(40);
const appDom = document.querySelector('#app');

const inputText = ref('');
const aiAnswer = ref('');
const sendAble = ref();
let historyList = reactive([]);
let localStorageHistoryList = reactive([]);
const nowDia = reactive({
    question: '',
    aiAnswer: ''
});
function aiAnswerList(val: any) {
    switch (true) {
        case val.includes('你好'):
            return getRandomElement([
                '你好, 我是Final Phrase 智能助理, 有什么可以帮助你的吗?',
                '你好, 我是Final Phrase 智能助理, 请问有什么我可以帮助你的吗?',
                '你好, 我是Final Phrase 智能助理, 请问有什么我可以回答你的问题吗?'
            ]);
        case val.includes('你是谁'):
            return getRandomElement([
                '我是Final Phrase 智能助理, 有什么我可以帮助你的吗?',
                '我是Final Phrase 智能助理, 请问有什么我可以回答你的问题吗?'
            ]);
        case val.includes('你是机器人吗'):
            return getRandomElement([
                '是的, 咋啦, 撒事~',
                '我是一个机器人, 有什么我可以帮助你的吗?'
            ]);
        case val.includes('你是怎么工作的'):
            return getRandomElement([
                '核心秘密不能瞎说',
                '我是通过Final Phrase 智能助理平台进行训练的!'
            ]);
        case val.includes('你有什么功能'):
            return getRandomElement([
                '我可以回答你的问题, 还可以提供一些帮助信息!'
            ]);
        case val.includes('你有什么特点'):
            return getRandomElement([
                '我是一个智能机器人, 拥有强大的智能算法, 能够回答你的问题!'
            ]);
        default:
            return getRandomElement([
                '你问的挺难啊,俺回答不了',
                '这个问题我暂时回答不了, 你可以再问我其他问题!'
            ]);
    }
}

function getRandomElement(arr: any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
let userDomStr = computed(
    () =>
        `<div class="content-warp content-reverse-warp">
                            <div class="dialogue-content">
                                ${inputText.value}
                            </div>
                            <div class="content-avatar">
                                <img
                                    src="${userImageUrl}"
                                    alt=""
                                >
                            </div>
                        </div>`
);
let messageIndex = ref(0);
let aiDomStr = computed(
    () => `<div class="content-warp">
                    <div class="content-avatar">
                        <img
                            src="/static/img/Animation-bot.png"
                            alt=""
                        >
                    </div>
                    <div id="dialogue-content-${messageIndex.value}" class="dialogue-content">
                        认真思考中
                        <div class="loading-point">
                            <div class="bounce-dot"></div>
                            <div class="bounce-dot"></div>
                            <div class="bounce-dot"></div>
                        </div>
                    </div>
                </div>`
);
function sendQuestion() {
    if (!inputText.value.trim()) {
        ElMessage.warning('请输入你要询问的问题');
        return;
    }
    if (!sendAble.value) {
        ElMessage.warning('上个问题回答中请稍后...');
        return;
    }
    sendAble.value = false;
    nowDia.question = inputText.value;
    const contentDom = document.querySelector('#robot-dialog-content');
    const inputValueCopy = inputText.value;
    if (contentDom) {
        contentDom.insertAdjacentHTML('beforeend', userDomStr.value);
        contentDom.insertAdjacentHTML('beforeend', aiDomStr.value);
    }
    setTimeout(() => {
        inputText.value = '';
    }, 100);
    const aiContentDom = document.querySelector(
        `#dialogue-content-${messageIndex.value}`
    );
    if (aiContentDom) {
        aiContentDom.scrollIntoView();
    }
    setTimeout(() => {
        if (aiContentDom) {
            aiContentDom.innerHTML = aiAnswerList(inputValueCopy);
            sendAble.value = true;
            nowDia.aiAnswer = aiAnswerList(inputValueCopy);
            historyList.push(JSON.stringify(nowDia));
            localStorage.setItem('HISTORY_LIST', historyList.join('「,」'));

            setTimeout(() => {
                aiContentDom.scrollIntoView();
            });
            messageIndex.value++;
        }
    }, 2000);
}

function initHistory() {
    try {
        const localStorageHistoryValue = localStorage
            .getItem('HISTORY_LIST')
            ?.split('「,」');
        localStorageHistoryList = localStorageHistoryValue.map(item => {
            return JSON.parse(item);
        });
        historyList = JSON.parse(JSON.stringify(localStorageHistoryValue));
    } catch (e) {
        localStorageHistoryList = [];
    }
}
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
    // const bodyWidth = document.body.clientWidth;
    longClickTimer.value = setTimeout(() => {
        // moveType.value = true;
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }, 1000);
}

function mouseMove(e: any) {
    if (!moveType.value) return;
    showRobotDialog.value = false;
    const bodyHeight = document.body.clientHeight;
    const bodyWidth = document.body.clientWidth;
    let y = bodyHeight - e.clientY;
    let x = bodyWidth - e.clientX;
    if (y < 0) {
        y = 0;
    } else if (y > document.body.clientHeight - 90) {
        y = document.body.clientHeight - 90;
    }

    if (x < 0) {
        x = 0;
    } else if (x > bodyWidth) {
        x = bodyWidth - 40;
    }
    let yClass = 'top';
    let xClass = 'left';
    switch (true) {
        case e.y >= 540:
            yClass = 'top';
            break;
        case bodyHeight - e.y > 540:
            yClass = 'bottom';
            break;
    }
    switch (true) {
        case e.x >= 500:
            xClass = 'left';
            break;
        case bodyWidth - e.x > 500:
            xClass = 'right';
            break;
    }

    nowClass.value = `${yClass}-${xClass}`;
    right.value = x;
    bottom.value = y;
}
function mouseUp(e: any) {
    clearTimeout(longClickTimer.value);
    moveType.value = false;
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('mousemove', mouseMove);
}

function clickHandle() {
    setTimeout(() => {
        showRobotDialog.value = !showRobotDialog.value;
        setTimeout(() => {
            document.querySelector('#scroll-to-bottom')?.scrollIntoView();
        });
    }, 100);
}
onBeforeMount(() => {
    initHistory();
});
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

.robot-dialog-footer .el-textarea__inner {
    height: 100%;
    border-style: none;
    box-shadow: none;
}
</style>
<style lang="less">
.robot-dialog-content {
    margin-top: 35px;
    width: 100%;
    height: 310px;
    padding: 15px 10px 10px;
    overflow-y: scroll;
    .content-reverse-warp {
        margin: 0 0 20px 65px !important;
        justify-content: flex-end;
        .content-avatar {
            margin-left: 15px !important;
            margin-right: 0 !important;
            padding: 0 !important;
        }
    }
    .content-warp {
        width: calc(100% - 65px);
        margin: 0 65px 20px 0;
        line-height: 20px;
        display: flex;
        .content-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            flex-shrink: 0;
            padding: 2px 0 0;
            margin-right: 15px;
            border: 1px solid #0000001f;
            overflow: hidden;
            padding-top: 5px;
            img {
                width: 100%;
            }
        }
        .dialogue-content {
            margin-top: 10px;
            padding: 10px;
            border-radius: 10px;
            font-size: 12px;
            box-shadow: 0px 0 4px #00000057;
        }
    }
    .loading-point {
        display: flex;
        justify-content: center;
        align-items: baseline;
        height: 100%;
        display: inline-block;
    }
    .bounce-dot {
        width: 3px;
        height: 3px;
        margin: 0 2px;
        background-color: #333;
        border-radius: 50%;
        display: inline-block;
        animation: bounce 1s infinite alternate;
    }

    .bounce-dot:nth-child(2) {
        animation-delay: 0.25s; /* 让第二个点稍微迟于开始 */
    }

    .bounce-dot:nth-child(3) {
        animation-delay: 0.5s; /* 让第三个点稍微迟于开始 */
    }
}
/* 回答 loading 动画 */
@keyframes bounce {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
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
            height: 450px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0px 7px 1px #4101233b;
            overflow: hidden;
            &-title {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 40px;
                padding: 10px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                background: #fff;
                box-shadow: 0 2px 4px 0px #0000000d;
                .close-btn {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    font-size: 18px;
                    user-select: none;
                    cursor: pointer;
                    font-weight: normal;
                    color: #505050;
                    transform: translate(-20px, -50%);
                }
            }
            &-content {
                margin-top: 35px;
                width: 100%;
                height: 310px;
                padding: 15px 10px 10px;
                overflow-y: scroll;
                .content-reverse-warp {
                    margin: 0 0 20px 65px !important;
                    .content-avatar {
                        margin-left: 15px !important;
                        margin-right: 0 !important;
                    }
                }
                .content-warp {
                    width: calc(100% - 65px);
                    margin: 0 65px 20px 0;
                    line-height: 20px;
                    display: flex;
                    .content-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        flex-shrink: 0;
                        padding: 2px 0 0;
                        margin-right: 15px;
                        border: 1px solid #0000001f;
                        overflow: hidden;
                        padding-top: 5px;
                        img {
                            width: 100%;
                        }
                    }
                    .dialogue-content {
                        margin-top: 10px;
                        padding: 10px;
                        border-radius: 10px;
                        font-size: 12px;
                        box-shadow: 0px 0 4px #00000057;
                    }
                }
            }
            &-buble::-webkit-scrollbar,
            &-content::-webkit-scrollbar {
                display: none;
            }
            &-buble {
                width: 100%;
                height: 35px;
                overflow-x: scroll;
                padding: 5px 10px;
                font-size: 12px;
                .buble-btn {
                    height: 100%;
                    display: inline-flex;
                    align-items: center;
                    padding: 0 5px;
                    justify-content: center;
                    cursor: pointer;
                    border-radius: 5px;
                    box-shadow: 0 0 #f00;
                    background: #f2f7ff;
                    color: #3a5bfd;
                    letter-spacing: 1px;
                    &:hover {
                        background-color: #f5f5f5;
                    }
                }
            }
            &-footer {
                position: absolute;
                bottom: 0;
                left: 0;
                box-sizing: border-box;
                width: 100%;
                height: 70px;
                padding: 5px 5px 10px;
                box-shadow: 0 -2px 4px 0px #0000000d;
            }
        }
    }
    img {
        width: 100%;
        cursor: pointer;
    }
}
</style>
