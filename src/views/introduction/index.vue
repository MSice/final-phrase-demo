<!--
 * @Author: 777
 * @Date: 2024-03-27 19:01:35
 * @LastEditTime: 2024-04-14 21:03:19
 * @LastEditors: 777
 * @FilePath: /final-phrase-demo/src/views/introduction/index.vue
 * @Description: 文件描述
-->
<template>
    <div class="introduction">
        <h1>Final Phrase</h1>
        <p>
            Final Phrase是一款为专业及各类文本创作需求者而搭建的软件，基于领先的AI文本模型及互影通文化科技数年研发的算法而诞生，致力于通过AI将科技转换为生产力并赋能文化产业。
        </p>
        <h2>为什么选择GPT而非中文更精通的国内模型？</h2>
        <p>
            1. 在测试多款模型后，我们从中文语言输出，token限制量，及提示性价比等多方面维度进行对比后，发现GPT依旧是目前为止最为贴合文本内容及高质量输出的选择。
        </p>
        <p>
            2. 考虑后续引向海外市场，GPT所适配的应用及信息更加广泛。
        </p>
        <h2>什么是DXX算法？</h2>
        <p>
            DXX算法由互影通文化科技研发，起初作为研究项目制作公式化剧本，在研发出公式化剧本后，因其的负责程度导致无法普及，后在2022年年底因偶然的一次gpt3.5测试发现，此算法由ai撰写出来的效果极高，于是开始了布局。

        </p>
        <h2>
            Final Phrase为什么现在只有电影剧本功能？
        </h2>
        <p>互影通本着将最佳的文本内容输出形态展现给用户，基于各不同类别的文本内容的创作形态大不相同，研发团队致力于将每一个文本形态都开发独立算法再与GPT进行嫁接，进而完成最佳的文本输出形态。Final
            Phrase团队目前已完成对于电影剧本的算法研发，后续会对短剧，电视剧，短视频脚本等方面依次进行研发，敬请期待。
        </p>
        <h2>
            Final Phrase项目目前处于什么阶段？
        </h2>
        <p>
            该项目处于天使轮融资阶段，目前上线的版本为MVP测试版，因未获得融资的情况下研发经费过于有限，功能极少，也希望也更多的投资者看到我们的潜力。
        </p>
        <h2></h2>
        联系方式：18610010610（微信、电话），郝焱冰

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
</script>

<style lang="less" scoped>
.introduction {
    width: 980px;
    margin: 0 auto;
    h1,
    h2 {
        margin: 20px 0 10px;
    }
}
</style>
