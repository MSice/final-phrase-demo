<!--
 * @Author: huangwensong
 * @Date: 2024-03-25 19:43:48
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 20:56:38
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
        <div class="btn-group">
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
                >上一场</el-button
            >
            <el-button type="primary" @click="nextHandle" link>{{
                index === content.length - 1 ? '完成' : '下一场'
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, computed } from 'vue';
import RichText from '@/components/RichText/index.vue';
import Title from '@/components/title.vue';
import PlayInfo from '../../store/palyInfo';
import { useRouter } from 'vue-router';

const router = useRouter();

const { state } = PlayInfo();

const { content }: any = toRefs(state);

const index = ref(0);

const myComputedValue = computed(() => content.value[index.value]);

const textHandle = htmlString => {
    // 使用正则表达式去除最外层 <div> 标签
    let regex = /<div[^>]*>(.*?)<\/div>/;
    let match = htmlString.match(regex);
    if (match && match.length >= 2) {
        htmlString = match[1];
    }
    return htmlString;
};

const nextHandle = () => {
    if (index.value === content.value.length - 1) {
        router.push('/showPlay');
    } else {
        index.value = index.value + 1;
        console.log(index);
    }
};

console.log(myComputedValue, 'myComputedValue');
</script>
<style lang="less" scoped>
.content {
    padding-bottom: 120px;
}
.btn-group {
    background-color: #dceadf;
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
