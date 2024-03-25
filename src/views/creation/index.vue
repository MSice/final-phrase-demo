<template>
    <div class="creation">
        <div class="input-box">
            <el-select
                v-model="swiperSelectValue"
                clearable
                filterable
                placeholder="请选择你想创作的文本内容类型"
                style="width: 30%;height: 100%"
                @change="swiperSelectValueChange"
            >
                <el-option
                    v-for="(item, index) in scriptTypeList"
                    :key="item.type"
                    :label="item.name"
                    :value="index"
                    :disabled="item.disablea"
                />
            </el-select>
            <div
                class="next-btn"
                style="color: #4096ef"
                @click="nextPath"
            >下一步</div>
            <!-- <el-button
                class="next-btn"
                style="color: #4096ef"
            >下一步</el-button> -->
            <!-- <el-input
                v-model="input3"
                style="max-width: 600px"
                placeholder="请选择你想创作的文本内容类型"
                class="input-with-select"
            >
            </el-input> -->
        </div>
        <div
            ref="swiperSelect"
            class="swiper-select"
        >
            <el-carousel
                ref="elSwiper"
                :interval="4000"
                :autoplay="false"
                :height="domeHeight"
                type="card"
                @change="swiperChange"
            >
                <el-carousel-item
                    v-for="item in scriptTypeList"
                    :key="item.type"
                    :initial-index="item.type"
                >
                    <div class="type-text">
                        {{ item.name }}
                    </div>
                    <video
                        :id="`video-${item.type}`"
                        class="fill-background"
                        :style="{
                            height: domeHeight
                        }"
                        muted
                        playsinline
                        controls
                    >
                        <source
                            :src="item.src"
                            type="video/mp4"
                        >
                    </video>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import paramsStore from '@/store/paramsStore';
import { ElMessage } from 'element-plus'
const router = useRouter()

const { creationFormParams } = paramsStore();

const swiperSelectValue = ref('');
const elSwiper = ref(null);

function swiperSelectValueChange(val: Number) {
    const i = parseInt(val, 10);
    creationFormParams.scriptType = scriptTypeList[i].name;
    elSwiper.value.setActiveItem(i);
}

const scriptTypeList = reactive([
    {
        type: 'movie',
        name: '电影',
        disablea: false,
        src: require('./assets/电影.mp4')
    },
    {
        type: 'TVPlay',
        name: '电视剧',
        disablea: true,
        src: require('./assets/电视剧.mp4')
    },
    {
        type: 'ShortPlay',
        name: '短剧',
        disablea: true,
        src: require('./assets/短剧.mp4')
    },
    {
        type: 'ShortVideo',
        name: '短视频',
        disablea: true,
        src: require('./assets/短视频.mp4')
    },
    {
        type: 'OnlineArticles',
        name: '网络文章',
        disablea: true,
        src: require('./assets/网络文章.mp4')
    },
    {
        type: 'OnlineNovels',
        name: '网络小说',
        disablea: true,
        src: require('./assets/网络小说.mp4')
    }
]);

function nextPath() {
    if (creationFormParams.scriptType) {
        creationFormParams.agruements = {};
        router.push({
            path: '/creation/form'
        })
    } else {
        ElMessage({
            message: '请选择电影类型!',
            type: 'warning'
        });
    }
}

const swiperSelect = ref();
const domeHeight = ref('275px');
let setTimeoutTimer = null;

function swiperChange(index: String) {
    const i = parseInt(index, 10);
    const nowDomeVideo = document.querySelector(
        `#video-${scriptTypeList[i].type}`
    );
    scriptTypeList.forEach((item, index) => {
        console.log(document.querySelector(`#video-${item.type}`));
        const domeVideo = document.querySelector(`#video-${item.type}`);
        if (domeVideo) {
            domeVideo.currentTime = 0;
            domeVideo.pause();
        }
    });
    setTimeoutTimer = setTimeout(() => {
        if (nowDomeVideo) {
            nowDomeVideo.play();
        }
    });
}

function initDomeOnSize() {
    const whPercent = 960 / 540;
    const clientHeight = swiperSelect.value.clientHeight;
    const swiperWidth = swiperSelect.value.clientHeight * whPercent;
    const swiperHeight = (swiperSelect.value.clientWidth * 0.5) / whPercent;
    domeHeight.value = `${
        clientHeight > swiperHeight ? swiperHeight : clientHeight
    }px`;
    const dom = document.querySelectorAll(
        '.swiper-select .el-carousel__container'
    );
    if (dom && dom.length > 0) {
        dom[0].style.height = `${
            clientHeight > swiperHeight ? swiperHeight : clientHeight
        }px`;
    }

    console.log(clientHeight, swiperHeight, dom);
}

onMounted(() => {
    initDomeOnSize();
    window.onresize = initDomeOnSize;
});
</script>

<style lang="less">
.creation {
    .el-select__wrapper {
        width: 100%;
        height: 100%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
}
</style>
<style lang="less" scoped>
@import '../../style/index.less';
.creation {
    position: relative;
    width: 100%;
    height: calc(100vh - @HeaderHeight);
    padding: 20px 25px;
    .input-box {
        display: flex;
        width: 100%;
        height: 40px;
        align-items: center;
        justify-content: flex-start;
        line-height: 38px;
        .el-select {
            width: 30%;
            min-width: 500px;
            height: 100%;
        }
        .next-btn {
            user-select: none;
            cursor: pointer;
            height: 100%;
            border: 1px solid #dddfe6;
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            padding: 0 15px;
            // border-style: none;
            margin-left: -1px;
            background-color: #ffffff80;
        }
    }
    .swiper-select {
        margin-top: 50px;
        width: 100%;
        height: calc(95% - 70px);
        .type-text {
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 18px;
            letter-spacing: 2px;
            font-weight: 500;
        }
        video {
            height: calc(100% - 30px);
        }
    }
}
</style>
