<!--
 * @Author: suqi04
 * @Date: 2024-03-20 19:27:42
 * @LastEditTime: 2024-03-23 18:12:03
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/views/home-page/index.vue
 * @Description: 文件描述
-->
<template>
    <div class="home-page">
        <video
            autoplay
            loop
            muted
            playsinline
            class="fill-background"
        >
            <source
                src="./homePageVideo.mp4"
                type="video/mp4"
            >
            Your browser does not support the video tag.
        </video>
        <div class="home-page-box">
            <div class="home-page-header">
                <el-button
                    type="primary"
                    class="start-create-btn login-btn"
                >登陆 | 注册</el-button>
            </div>
            <div class="home-page-name">
                <span>Final</span>
                <span>Perase</span>
            </div>
            <p class="home-page-alrent">
                {{ text[0] }}
                <span style="color: #d96868">
                    {{ text[1] }}
                </span>
                {{ text[2] }}
            </p>
            <div class="home-page-control">
                <span>
                    <el-button
                        type="primary"
                        class="start-create-btn"
                    >开始创作</el-button>
                    <el-button
                        type="primary"
                        class="start-create-btn margin-btn"
                    >了解更多</el-button>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const $route = useRoute();
console.log($route.path);

const alrentText = [
    ['「', '我', '们', '不', '能', '创', '造'],
    ['100', '分'],
    [
        '的',
        '脚',
        '本',
        ',',
        '因',
        '为',
        '我',
        '们',
        '需',
        '要',
        '你',
        '的',
        '画',
        '龙',
        '点',
        '睛',
        '」'
    ]
];
let text = reactive([
    '「我们不能创造',
    '100分',
    '的脚本,因为我们需要你的画龙点睛」'
]);

// function inputAlrent() {
//     let firstText = alrentText[0];
//     let j = 0;
//     let i = 0;
//     let timer = setInterval(() => {
//         console.log(i, alrentText[j].length);

//         if (i === alrentText[j].length) {
//             j++;
//             i = 0;
//         } else if (i < alrentText[j].length) {
//             text[j] += alrentText[j][i];
//             i++;
//         }
//         if (j >= alrentText.length) {
//             clearInterval(timer);
//         }
//     }, 100);
// }

onMounted(() => {
    // inputAlrent();
});
</script>

<style scoped>
.home-page {
    min-height: max(100vh, 735px);
}
.home-page .home-page-name {
    font-size: min(150px, max(10vw, 110px));
}
.home-page .home-page-alrent {
    font-size: min(30px, max(2.5vw, 25px));
    letter-spacing: 2px;
}
.home-page-name span:last-child {
    /* margin-left: min(50px, max(35px, 5vw)); */
}
.margin-btn {
    margin-left: min(200px, max(13vw, 150px))!important;
}
.start-create-btn {
    font-size: min(20px, max(1.5vw, 17px));
    width: min(200px, max(13vw, 150px));
}
</style>

<style lang="less" scoped>
@import '../../style/index.less';
.home-page {
    width: 100%;
    height: 100%;
    min-width: @ScreenMinWidth;
    position: relative;
    box-sizing: border-box;
    // background: linear-gradient(to bottom, #f2f3f7, #9cc6fcd8);
    background: linear-gradient(to bottom, #f2f3f7, #549fffd8);
    position: relative; /* 相对定位 */
    width: 100%; /* 视频宽度 */
    height: 100vh; /* 视频高度 */
    overflow: hidden; /* 隐藏溢出的视频部分 */
    color: @TextColor;
    // background-image: url('./test.jpg');
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-position: center;

    .start-create-btn {
        height: 50px;
        // width: 200px;
        color: #fff;
        border-radius: 20px;
        font-weight: bold;
        letter-spacing: 2px;
        // font-size: 20px;
        background-image: radial-gradient(#0066fff0, transparent);
    }

    .home-page-box {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }
    .fill-background {
        width: 100%; /* 视频宽度 */
        height: 100%; /* 视频高度 */
        object-fit: cover; /* 视频填充 */
        position: absolute; /* 绝对定位 */
        top: 0;
        left: 0;
        // z-index: -1;
    }
    &-header {
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        line-height: 50px;
        padding: 0 20px;
        text-align: right;
        // background-color: #fff;
        .login-btn {
            height: 30px;
            width: 120px;
            font-size: 14px;
        }
    }
    &-name {
        font-weight: 600;
        height: 40vh;
        min-height: 210px;
        line-height: 40vh;
        text-align: center;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            display: block;
            transform: scale(0.8, 1.4);
            text-shadow: 0px 18px 16px #00000040;
        }
    }
    &-alrent {
        font-family: 'Noto Sans SC';
        font-weight: 1000;
        text-align: center;
        font-size: 35px;
        color: #666;
    }
    &-control {
        position: relative;
        box-sizing: border-box;
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .start-create-btn:last-child {
            background-image: none;
            background-color: transparent;
            border: 3px solid #0084ff8e;
            color: #666;
            background-color: #ffffff6b;
        }
        .start-create-btn:hover {
            box-shadow: 0px 3px 8px 0px #fc4d6d43;
        }
    }
}
</style>
 