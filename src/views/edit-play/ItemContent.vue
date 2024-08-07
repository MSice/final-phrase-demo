<!--
 * @Author: 777
 * @Date: 2024-03-25 19:43:48
 * @LastEditors: suqi suqi.777@bytedance.com
 * @LastEditTime: 2024-08-07 22:12:24
 * @FilePath: /final-phrase-demo/src/views/edit-play/ItemContent.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="content">
        <Title
            :key="index"
            :initial-text="myComputedValue.sessionTitle"
        ></Title>
        <RichText
            :key="index"
            :content="textHandle(myComputedValue.text)"
            @saveRich="
                text => {
                    content[index].text = text;
                }
            "
        ></RichText>
        <!-- <div class="btn-group">
            <el-button
                type="primary"
                :disabled="index === 0"
                @click="
                    () => {
                        if (index) {
                            index = index - 1;
                        }
                    }
                "
                link
            >上一场</el-button>
            <el-button
                type="primary"
                @click="nextHandle"
                link
            >{{
                index === content.length - 1 ? '完成' : '下一场'
            }}</el-button>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, computed, watch } from 'vue';
import RichText from '@/components/RichText/index.vue';
import Title from '@/components/title.vue';
import PlayInfo from '../../store/palyInfo';
import { useRouter, useRoute } from 'vue-router';
import { textHandle } from '@/utils/index';

const router = useRouter();
const $route = useRoute();


const index = ref(parseInt($route.query.index || 0, 10));
watch(
    $route,
    val => {
        index.value = parseInt(val.query.index || 0, 10);
    },
    {
        deep: true
    }
);
const { state, nowTitle } = PlayInfo();

const { content }: any = toRefs(state);

const myComputedValue = computed(() => content.value[index.value]);

watch(
    myComputedValue,
    val => {
        nowTitle.value = val.sessionTitle;
    },
    {
        deep: true
    }
);
</script>
<style lang="less" scoped>
.content {
    height: 100%;
}
.btn-group {
    background-color: #f5faf6;
    position: fixed;
    bottom: 0;
    padding: 30px 0;
    width: 100%;
    display: flex;
    height: 30px;
    line-height: 30px;
    align-items: center;
    justify-content: space-evenly;
    .el-button {
        font-size: 16px;
    }
}
</style>
