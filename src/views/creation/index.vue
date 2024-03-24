<template>
    <div class="creation">
        <div class="input-box">
            <el-input
                v-model="input3"
                style="max-width: 600px"
                placeholder="请选择你想创作的文本内容类型"
                class="input-with-select"
            >
                <template #append>
                    <el-button type="primary" style="color: #4096ef">下一步</el-button>
                </template>
            </el-input>
        </div>
        <div
            ref="swiperSelect"
            class="swiper-select"
        >
            <el-carousel
                :interval="4000"
                :autoplay="false"
                height="540px"
                type="card"
                @change="swiperChange"
            >
                <el-carousel-item
                    v-for="item in scriptTypeList"
                    :key="item.type"
                >
                    <video
                        :id="`video-${item.type}`"
                        class="fill-background"
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
const scriptType = ref('电影');
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

const swiperSelect = ref();

function swiperChange(e) {
    console.log(e);
}

function initDomeOnSize() {
    const whPercent = 960 / 540;

    const swiperWidth = swiperSelect.value.clientHeight * whPercent;
    const swiperHeight = (swiperSelect.value.clientWidth * 0.5) / whPercent;
    console.log(
        swiperWidth,
        swiperHeight,
        swiperSelect.value.clientHeight,
        swiperSelect.value.clientWidth
    );
}

onMounted(() => {
    window.onresize = initDomeOnSize;
});
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.creation {
    position: relative;
    width: 100%;
    height: calc(100vh - @HeaderHeight);
    padding: 20px 25px;
    .input-box {
        width: 100%;
        height: 40px;
    }
    .swiper-select {
        margin-top: 20px;
        width: 100%;
        height: calc(95% - 70px);
    }
}
</style>
