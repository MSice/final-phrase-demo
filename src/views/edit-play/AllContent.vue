<!--
 * @Author: huangwensong
 * @Date: 2024-03-25 19:43:23
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-28 19:26:54
 * @FilePath: /final-phrase-demo/src/views/edit-play/AllContent.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="content">
        <Title :initial-text="title"></Title>
        <RichText
            :key="text"
            :content="text"
            @saveRich="saveInfo"
        ></RichText>
        <!-- <div class="btn-group">
            <el-button
                type="primary"
                @click="nextHandle"
                link
            >完成</el-button>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted } from 'vue';
import RichText from '@/components/RichText/index.vue';
import PlayInfo from '../../store/palyInfo';
import Title from '@/components/title.vue';
import { textHandle } from '@/utils/index';
import { useRouter } from 'vue-router';

const router = useRouter();

const { state, nowTitle } = PlayInfo();

const { title, content }: any = toRefs(state);

nowTitle.value = title.value;
const text = ref('');

onMounted(() => {
    console.log(content.value);
    content.value.map((item: any) => {
        text.value += `<h3>${item.sessionTitle}</h3>${textHandle(item.text)}`;
    });
});

const saveInfo = (text: any) => {
    console.log((text));
    
    // 使用正则表达式分割字符串
    const htmlString = textHandle(text);
    let regex = /<h3>(.*?)<\/h3>/g;
    let groups = htmlString.split(regex).filter(str => str.trim() !== '');

    let processedData = [];
    for (let i = 0; i < groups.length; i += 2) {
        processedData.push({
            title: groups[i],
            text: '<div>' + groups[i + 1] + '</div>'
        });
    }

    for (let i = 0; i < groups.length; i++) {
        if (processedData[i]) {
            content.value[i].sessionTitle = processedData[i].title;
            content.value[i].text = processedData[i].text;
        }
    }
};

const nextHandle = () => {
    setTimeout(() => {
        router.push({
            path: '/showPlay',
            query: {
                showScript: 'read'
            }
        });
    }, 100);
};
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
