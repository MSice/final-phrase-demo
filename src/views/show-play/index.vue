<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 17:18:43
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 18:02:32
 * @FilePath: /final-phrase-demo/src/views/show-play/index.vue
 * @Description: 
-->
<!--  -->
<template>
    <div>
        <div class="content">
            <div class="menu">
                <Menu
                    v-show="showMenu"
                    :menuItems="content"
                    @select="scrollToElement"
                    :isCollapsed="isCollapsed"
                    @set-collapsed="
                        value => {
                            isCollapsed = !isCollapsed;
                        }
                    "
                ></Menu>
            </div>
            <div class="text-content" :class="{ collapsed: isCollapsed }">
                <Title :initial-text="title"></Title>
                <div class="select-content">
                    <!-- <div
                        v-for="item in content"
                        :key="item.sessionTitle"
                        :id="`content-item-${item.sessionId}`"
                    >
                        <h2 class="text-content-title">
                            {{ item.sessionTitle }}
                        </h2>
                        <div v-html="item.text"></div>
                    </div> -->
                </div>
            </div>
        </div>
        <EditBtn v-show="showMenu"></EditBtn>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import Title from '@/components/title.vue';
import Menu from './menu.vue';
import EditBtn from './editBtn.vue';

const isCollapsed = ref(false);
const showMenu = ref(false);
const state = reactive({
    title: '《魔法遗迹》',
    content: [
        {
            sessionId: 1,
            sessionTitle: '场次1',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>（舞台背景中是一片神秘的古老森林，树木参天，阳光透过树叶洒下，笼罩着一片神秘的氛围。在森林的深处，是一个古老的遗迹，被藤蔓和树木覆盖，只露出一丝神秘的光芒。）</p><p>（主角艾莉亚，一名年轻而勇敢的女骑士，手持一把闪闪发光的长剑，穿越森林，来到了这个神秘的遗迹前。）</p><p><br></p><p>	艾莉亚：（激动）终于找到了，传说中的魔法遗迹！这里隐藏着古老的力量，我必须探寻其中的秘密！</p><p><br></p><p>（艾莉亚走近遗迹，突然，一阵神秘的光芒将她包围，遗迹开始散发出古老的魔法能量。）</p><p>（突然，一个黑暗的影子从遗迹中浮现出来，是一个邪恶的巫师，名叫玛洛斯。）</p><p><br></p><p>	玛洛斯：（阴冷地笑）你是谁，竟敢闯入我的领域？</p><p>	艾莉亚：我是艾莉亚，来自阿瓦隆的女骑士。我来寻找古老的魔法力量，为正义而战！</p><p>	玛洛斯：（嘲讽地笑）正义？愚蠢的女孩，你根本不知道你在与何物对抗！这里的力量只适合真正的统治者，而那就是我！</p><p><br></p><p>（玛洛斯释放出黑暗的魔法，与艾莉亚展开了激烈的战斗。）</p><p>（战斗中，艾莉亚不断使用她的剑术和勇气，与玛洛斯抗衡。）</p><p>（最终，艾莉亚利用自己的坚持和勇气，成功击败了玛洛斯，将他封印在遗迹中。）</p><p><br></p><p>	艾莉亚：（呼吸急促，但满怀胜利的喜悦）邪恶永远无法战胜正义！我将保护这份古老的力量，直到世界再次需要它！</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>'
        },
        {
            sessionId: 2,
            sessionTitle: '场次2',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>（舞台背景转移到阿瓦隆王国，一个充满活力和繁荣的国家，人们在街上欢呼庆祝胜利。）</p><p>（艾莉亚受到了人们的敬佩和赞扬，她站在城堡的高台上，面向人群，挥舞着手中的长剑。）</p><p>艾莉亚：（慷慨激昂）今天，我们战胜了邪恶，捍卫了正义！但这只是开始，我们将继续捍卫我们的国家，保护我们的人民，直到永远！</p><p>（人群欢呼雀跃，鼓掌致意。）</p><p>（艾莉亚的同伴们，包括一群勇敢的骑士和智慧的法师，围绕着她，表示敬意和支持。）</p><p>（舞台渐渐淡出，留下了一片充满希望和勇气的景象。）</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        },
        {
            sessionId: 3,
            sessionTitle: '场次3',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>（舞台背景是一个被冰雪覆盖的王国，寒风凛冽，冰雪皑皑。在王国的中心是一座宏伟的冰雪城堡，阳光反射在冰雪之上，闪耀着耀眼的光芒。）</p><p>（主角艾莉丝，一名年轻而富有魔法天赋的女巫，站在城堡的前方，凝视着远方。）</p><p>艾莉丝：（低声自语）冰雪之王，你的统治已经太久了。现在是时候结束这一切了。</p><p>（艾莉丝举起手中的法杖，释放出一道强大的魔法能量，向冰雪城堡发起攻击。）</p><p>（突然，一阵冰冷的气息从城堡中涌出，一位神秘的女王，名为艾娜，出现在城堡门前。）</p><p>艾娜：（冷漠地）你是谁？竟敢闯入我的领地？</p><p>艾莉丝：我是艾莉丝，来自自由之地的女巫。我来为人民夺回他们失去的自由，结束你的统治！</p><p>艾娜：（嘲讽地笑）你以为你有能力挑战我？我是冰雪之王，我掌控着冰雪的力量！</p><p>（艾娜释放出强大的冰雪魔法，与艾莉丝展开激烈的魔法对决。）</p><p>（在战斗中，艾莉丝展现出她惊人的魔法天赋，不断用她的智慧和勇气对抗艾娜的冰雪魔法。）</p><p>（最终，艾莉丝利用她的智慧和魔法，成功击败了艾娜，解除了她对王国的统治。）</p><p>艾莉丝：（喘息着，但眼中充满了胜利的喜悦）冰雪之王的统治结束了！现在，人民将重获自由！</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        }
    ],
    html: ''
});

onMounted(() => {
    function showNextItem(index: number) {
        if (index < state.content.length) {
            const item = state.content[index];
            // 创建一个虚拟容器
            const container = document.createElement('div');
            container.innerHTML = item.text;

            // 获取所有 <p> 标签
            const paragraphs = container.querySelectorAll('p');
            const realDom = document.querySelector('.select-content');
            let container1: any = document.createElement('div');
            container1.id = `content-item-${item.sessionId}`;
            realDom?.appendChild(container1);
            const h2 = document.createElement('h2');
            h2.innerHTML = `<h3 class="text-content-title" style="margin:20px 0 10px 20px">${item.sessionTitle}</h3>`;
            container1?.appendChild(h2);

            // 插入计数器
            let counter = 0;

            // 每隔 50ms 插入一个 <p> 标签
            // eslint-disable-next-line no-inner-declarations
            function showNextLine() {
                if (counter < paragraphs.length) {
                    container1.appendChild(paragraphs[counter].cloneNode(true));
                    counter++;
                    setTimeout(showNextLine, 100); // 控制每行显示的时间间隔，单位为毫秒
                } else {
                    container1 = null;
                    showNextItem(index + 1); // 执行下一个项
                }
            }

            showNextLine();
        } else {
            showMenu.value = true;
        }
    }

    showNextItem(0); // 开始执行第一个项
});

const scrollToElement = (data: any) => {
    const targetElement = document.getElementById(
        `content-item-${data.sessionId}`
    );
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const { title, content } = toRefs(state);
</script>
<style lang="less" scoped>
.content {
    display: flex;
    .menu {
        max-width: 200px;
    }
    .text-content {
        margin-left: 200px;
        flex: 1;
        .text-content-title {
            margin-left: 40px;
        }
        &.collapsed {
            margin-left: 50px;
        }
    }
    .select-content {
        padding: 20px;
    }
}
</style>
<style lang="less">
.ql-container {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    height: 100%;
    margin: 0px;
    position: relative;
}
.ql-container.ql-disabled .ql-tooltip {
    visibility: hidden;
}
.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
    pointer-events: none;
}
.ql-clipboard {
    left: -100000px;
    height: 1px;
    overflow-y: hidden;
    position: absolute;
    top: 50%;
}
.ql-clipboard p {
    margin: 0;
    padding: 0;
}
.ql-editor {
    box-sizing: border-box;
    line-height: 1.42;
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 12px 15px;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
}
.ql-editor > * {
    cursor: text;
}
.ql-editor p,
.ql-editor ol,
.ql-editor ul,
.ql-editor pre,
.ql-editor blockquote,
.ql-editor h1,
.ql-editor h2,
.ql-editor h3,
.ql-editor h4,
.ql-editor h5,
.ql-editor h6 {
    margin: 0;
    padding: 0;
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
        list-9;
}
.ql-editor ol,
.ql-editor ul {
    padding-left: 1.5em;
}
.ql-editor ol > li,
.ql-editor ul > li {
    list-style-type: none;
}
.ql-editor ul > li::before {
    content: '\2022';
}
.ql-editor ul[data-checked='true'],
.ql-editor ul[data-checked='false'] {
    pointer-events: none;
}
.ql-editor ul[data-checked='true'] > li *,
.ql-editor ul[data-checked='false'] > li * {
    pointer-events: all;
}
.ql-editor ul[data-checked='true'] > li::before,
.ql-editor ul[data-checked='false'] > li::before {
    color: #777;
    cursor: pointer;
    pointer-events: all;
}
.ql-editor ul[data-checked='true'] > li::before {
    content: '\2611';
}
.ql-editor ul[data-checked='false'] > li::before {
    content: '\2610';
}
.ql-editor li::before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2em;
}
.ql-editor li:not(.ql-direction-rtl)::before {
    margin-left: -1.5em;
    margin-right: 0.3em;
    text-align: right;
}
.ql-editor li.ql-direction-rtl::before {
    margin-left: 0.3em;
    margin-right: -1.5em;
}
.ql-editor ol li:not(.ql-direction-rtl),
.ql-editor ul li:not(.ql-direction-rtl) {
    padding-left: 1.5em;
}
.ql-editor ol li.ql-direction-rtl,
.ql-editor ul li.ql-direction-rtl {
    padding-right: 1.5em;
}
.ql-editor ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
        list-9;
    counter-increment: list-0;
}
.ql-editor ol li:before {
    content: counter(list-0, decimal) '. ';
}
.ql-editor ol li.ql-indent-1 {
    counter-increment: list-1;
}
.ql-editor ol li.ql-indent-1:before {
    content: counter(list-1, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-1 {
    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-2 {
    counter-increment: list-2;
}
.ql-editor ol li.ql-indent-2:before {
    content: counter(list-2, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-2 {
    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-3 {
    counter-increment: list-3;
}
.ql-editor ol li.ql-indent-3:before {
    content: counter(list-3, decimal) '. ';
}
.ql-editor ol li.ql-indent-3 {
    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-4 {
    counter-increment: list-4;
}
.ql-editor ol li.ql-indent-4:before {
    content: counter(list-4, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-4 {
    counter-reset: list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-5 {
    counter-increment: list-5;
}
.ql-editor ol li.ql-indent-5:before {
    content: counter(list-5, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-5 {
    counter-reset: list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-6 {
    counter-increment: list-6;
}
.ql-editor ol li.ql-indent-6:before {
    content: counter(list-6, decimal) '. ';
}
.ql-editor ol li.ql-indent-6 {
    counter-reset: list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-7 {
    counter-increment: list-7;
}
.ql-editor ol li.ql-indent-7:before {
    content: counter(list-7, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-7 {
    counter-reset: list-8 list-9;
}
.ql-editor ol li.ql-indent-8 {
    counter-increment: list-8;
}
.ql-editor ol li.ql-indent-8:before {
    content: counter(list-8, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-8 {
    counter-reset: list-9;
}
.ql-editor ol li.ql-indent-9 {
    counter-increment: list-9;
}
.ql-editor ol li.ql-indent-9:before {
    content: counter(list-9, decimal) '. ';
}
.ql-editor .ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 3em;
}
.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 4.5em;
}
.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
    padding-right: 3em;
}
.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
    padding-right: 4.5em;
}
.ql-editor .ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 6em;
}
.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 7.5em;
}
.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
    padding-right: 6em;
}
.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
    padding-right: 7.5em;
}
.ql-editor .ql-indent-3:not(.ql-direction-rtl) {
    padding-left: 9em;
}
.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
    padding-left: 10.5em;
}
.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
    padding-right: 9em;
}
.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
    padding-right: 10.5em;
}
.ql-editor .ql-indent-4:not(.ql-direction-rtl) {
    padding-left: 12em;
}
.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
    padding-left: 13.5em;
}
.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
    padding-right: 12em;
}
.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
    padding-right: 13.5em;
}
.ql-editor .ql-indent-5:not(.ql-direction-rtl) {
    padding-left: 15em;
}
.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
    padding-left: 16.5em;
}
.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
    padding-right: 15em;
}
.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
    padding-right: 16.5em;
}
.ql-editor .ql-indent-6:not(.ql-direction-rtl) {
    padding-left: 18em;
}
.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
    padding-left: 19.5em;
}
.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
    padding-right: 18em;
}
.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
    padding-right: 19.5em;
}
.ql-editor .ql-indent-7:not(.ql-direction-rtl) {
    padding-left: 21em;
}
.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
    padding-left: 22.5em;
}
.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
    padding-right: 21em;
}
.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
    padding-right: 22.5em;
}
.ql-editor .ql-indent-8:not(.ql-direction-rtl) {
    padding-left: 24em;
}
.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
    padding-left: 25.5em;
}
.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
    padding-right: 24em;
}
.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
    padding-right: 25.5em;
}
.ql-editor .ql-indent-9:not(.ql-direction-rtl) {
    padding-left: 27em;
}
.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
    padding-left: 28.5em;
}
.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
    padding-right: 27em;
}
.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
    padding-right: 28.5em;
}
.ql-editor .ql-video {
    display: block;
    max-width: 100%;
}
.ql-editor .ql-video.ql-align-center {
    margin: 0 auto;
}
.ql-editor .ql-video.ql-align-right {
    margin: 0 0 0 auto;
}
.ql-editor .ql-bg-black {
    background-color: #000;
}
.ql-editor .ql-bg-red {
    background-color: #e60000;
}
.ql-editor .ql-bg-orange {
    background-color: #f90;
}
.ql-editor .ql-bg-yellow {
    background-color: #ff0;
}
.ql-editor .ql-bg-green {
    background-color: #008a00;
}
.ql-editor .ql-bg-blue {
    background-color: #06c;
}
.ql-editor .ql-bg-purple {
    background-color: #93f;
}
.ql-editor .ql-color-white {
    color: #fff;
}
.ql-editor .ql-color-red {
    color: #e60000;
}
.ql-editor .ql-color-orange {
    color: #f90;
}
.ql-editor .ql-color-yellow {
    color: #ff0;
}
.ql-editor .ql-color-green {
    color: #008a00;
}
.ql-editor .ql-color-blue {
    color: #06c;
}
.ql-editor .ql-color-purple {
    color: #93f;
}
.ql-editor .ql-font-serif {
    font-family: Georgia, Times New Roman, serif;
}
.ql-editor .ql-font-monospace {
    font-family: Monaco, Courier New, monospace;
}
.ql-editor .ql-size-small {
    font-size: 0.75em;
}
.ql-editor .ql-size-large {
    font-size: 1.5em;
}
.ql-editor .ql-size-huge {
    font-size: 2.5em;
}
.ql-editor .ql-direction-rtl {
    direction: rtl;
    text-align: inherit;
}
.ql-editor .ql-align-center {
    text-align: center;
}
.ql-editor .ql-align-justify {
    text-align: justify;
}
.ql-editor .ql-align-right {
    text-align: right;
}
.ql-editor.ql-blank::before {
    color: rgba(0, 0, 0, 0.6);
    content: attr(data-placeholder);
    font-style: italic;
    left: 15px;
    pointer-events: none;
    position: absolute;
    right: 15px;
}
.text-content.ql-toolbar:after,
.text-content .ql-toolbar:after {
    clear: both;
    content: '';
    display: table;
}
.text-content.ql-toolbar button,
.text-content .ql-toolbar button {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    float: left;
    height: 24px;
    padding: 3px 5px;
    width: 28px;
    margin-left: 1px;
    margin-right: 1px;
}
.text-content.ql-toolbar button svg,
.text-content .ql-toolbar button svg {
    float: left;
    height: 100%;
}
.text-content.ql-toolbar button:active:hover,
.text-content .ql-toolbar button:active:hover {
    outline: none;
}
.text-content.ql-toolbar input.ql-image[type='file'],
.text-content .ql-toolbar input.ql-image[type='file'] {
    display: none;
}
.text-content.ql-toolbar button:hover,
.text-content .ql-toolbar button:hover,
.text-content.ql-toolbar button:focus,
.text-content .ql-toolbar button:focus,
.text-content.ql-toolbar .ql-picker-label:hover,
.text-content .ql-toolbar .ql-picker-label:hover,
.text-content.ql-toolbar .ql-picker-item:hover,
.text-content .ql-toolbar .ql-picker-item:hover {
    background-color: #f3f4f6;
}
.text-content.ql-toolbar button.ql-active,
.text-content .ql-toolbar button.ql-active,
.text-content.ql-toolbar .ql-picker-label.ql-active,
.text-content .ql-toolbar .ql-picker-label.ql-active,
.text-content.ql-toolbar .ql-picker-item.ql-selected,
.text-content .ql-toolbar .ql-picker-item.ql-selected {
    background-color: #dbeafe;
    color: #2563eb;
}
.text-content.ql-toolbar button.ql-active .ql-fill,
.text-content .ql-toolbar button.ql-active .ql-fill,
.text-content.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.text-content .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.text-content.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.text-content .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.text-content.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.text-content .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.text-content.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.text-content .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.text-content.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.text-content .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: #2563eb;
}
.text-content.ql-toolbar button.ql-active .ql-stroke,
.text-content .ql-toolbar button.ql-active .ql-stroke,
.text-content.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.text-content .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.text-content.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.text-content .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.text-content.ql-toolbar button.ql-active .ql-stroke-miter,
.text-content .ql-toolbar button.ql-active .ql-stroke-miter,
.text-content.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.text-content .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.text-content.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.text-content .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: #2563eb;
}
@media (pointer: coarse) {
    .text-content.ql-toolbar button:hover:not(.ql-active),
    .text-content .ql-toolbar button:hover:not(.ql-active) {
        color: #4b5563;
    }
    .text-content.ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .text-content .ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .text-content.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
    .text-content .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
        fill: #4b5563;
    }
    .text-content.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .text-content .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .text-content.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
    .text-content .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
        stroke: #4b5563;
    }
}
.text-content {
    box-sizing: border-box;
}
.text-content * {
    box-sizing: border-box;
}
.text-content .ql-hidden {
    display: none;
}
.text-content .ql-out-bottom,
.text-content .ql-out-top {
    visibility: hidden;
}
.text-content .ql-tooltip {
    position: absolute;
    transform: translateY(10px);
}
.text-content .ql-tooltip a {
    cursor: pointer;
    text-decoration: none;
}
.text-content .ql-tooltip.ql-flip {
    transform: translateY(-10px);
}
.text-content .ql-formats {
    display: inline-block;
    vertical-align: middle;
}
.text-content .ql-formats:after {
    clear: both;
    content: '';
    display: table;
}
.text-content .ql-stroke {
    fill: none;
    stroke: #4b5563;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
}
.text-content .ql-stroke-miter {
    fill: none;
    stroke: #4b5563;
    stroke-miterlimit: 10;
    stroke-width: 2;
}
.text-content .ql-fill,
.text-content .ql-stroke.ql-fill {
    fill: #4b5563;
}
.text-content .ql-empty {
    fill: none;
}
.text-content .ql-even {
    fill-rule: evenodd;
}
.text-content .ql-thin,
.text-content .ql-stroke.ql-thin {
    stroke-width: 1;
}
.text-content .ql-transparent {
    opacity: 0.4;
}
.text-content .ql-direction svg:last-child {
    display: none;
}
.text-content .ql-direction.ql-active svg:last-child {
    display: inline;
}
.text-content .ql-direction.ql-active svg:first-child {
    display: none;
}
.text-content .ql-editor h1 {
    font-size: 2em;
}
.text-content .ql-editor h2 {
    font-size: 1.5em;
}
.text-content .ql-editor h3 {
    font-size: 1.17em;
}
.text-content .ql-editor h4 {
    font-size: 1em;
}
.text-content .ql-editor h5 {
    font-size: 0.83em;
}
.text-content .ql-editor h6 {
    font-size: 0.67em;
}
.text-content .ql-editor a {
    text-decoration: underline;
}
.text-content .ql-editor blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
}
.text-content .ql-editor code,
.text-content .ql-editor pre {
    background-color: #f0f0f0;
    border-radius: 3px;
}
.text-content .ql-editor pre {
    white-space: pre-wrap;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px 10px;
}
.text-content .ql-editor code {
    font-size: 85%;
    padding: 2px 4px;
}
.text-content .ql-editor pre.ql-syntax {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
}
.text-content .ql-editor img {
    max-width: 100%;
}
.text-content .ql-picker {
    color: #4b5563;
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    position: relative;
    vertical-align: middle;
    margin-right: 1px;
    margin-left: 1px;
}
.text-content .ql-picker-label {
    cursor: pointer;
    display: flex;
    height: 100%;
    padding-left: 8px;
    padding-right: 2px;
    position: relative;
    width: 100%;
}
.text-content .ql-picker-label::before {
    display: inline-block;
    line-height: 22px;
}
.text-content .ql-picker-options {
    background-color: #fff;
    display: none;
    min-width: 100%;
    position: absolute;
    white-space: nowrap;
}
.text-content .ql-picker-options .ql-picker-item {
    cursor: pointer;
    display: block;
    padding: 5px 8px;
}
.text-content .ql-picker.ql-expanded .ql-picker-label {
    color: #d1d5db;
    z-index: 2;
}
.text-content .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: #d1d5db;
}
.text-content .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: #d1d5db;
}
.text-content .ql-picker.ql-expanded .ql-picker-options {
    display: block;
    margin-top: -1px;
    top: 100%;
    z-index: 1;
}
.text-content .ql-color-picker,
.text-content .ql-icon-picker {
    width: 28px;
}
.text-content .ql-color-picker .ql-picker-label,
.text-content .ql-icon-picker .ql-picker-label {
    padding: 2px 4px;
}
.text-content .ql-color-picker .ql-picker-label svg,
.text-content .ql-icon-picker .ql-picker-label svg {
    right: 4px;
}
.text-content .ql-icon-picker .ql-picker-options {
    padding: 3px;
}
.text-content .ql-icon-picker .ql-picker-item {
    height: 24px;
    width: 24px;
    padding: 2px 4px;
    margin: 2px;
}
.text-content .ql-color-picker .ql-picker-options {
    padding: 3px 5px;
    width: 152px;
}
.text-content .ql-color-picker .ql-picker-item {
    border: 1px solid transparent;
    float: left;
    height: 16px;
    margin: 2px;
    padding: 0px;
    width: 16px;
}
.text-content .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    position: absolute;
    margin-top: -9px;
    right: 0;
    top: 50%;
    width: 18px;
}
.text-content
    .ql-picker.ql-header
    .ql-picker-label[data-label]:not([data-label=''])::before,
.text-content
    .ql-picker.ql-font
    .ql-picker-label[data-label]:not([data-label=''])::before,
.text-content
    .ql-picker.ql-size
    .ql-picker-label[data-label]:not([data-label=''])::before,
.text-content
    .ql-picker.ql-header
    .ql-picker-item[data-label]:not([data-label=''])::before,
.text-content
    .ql-picker.ql-font
    .ql-picker-item[data-label]:not([data-label=''])::before,
.text-content
    .ql-picker.ql-size
    .ql-picker-item[data-label]:not([data-label=''])::before {
    content: attr(data-label);
}
.text-content .ql-picker.ql-header {
    width: 98px;
}
.text-content .ql-picker.ql-header .ql-picker-label::before,
.text-content .ql-picker.ql-header .ql-picker-item::before {
    content: 'Normal';
}
.text-content .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.text-content .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: 'Heading 1';
}
.text-content .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.text-content .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: 'Heading 2';
}
.text-content .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.text-content .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: 'Heading 3';
}
.text-content .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.text-content .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: 'Heading 4';
}
.text-content .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.text-content .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: 'Heading 5';
}
.text-content .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.text-content .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: 'Heading 6';
}
.text-content .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    font-size: 2em;
}
.text-content .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    font-size: 1.5em;
}
.text-content .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    font-size: 1.17em;
}
.text-content .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    font-size: 1em;
}
.text-content .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    font-size: 0.83em;
}
.text-content .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    font-size: 0.67em;
}
.text-content .ql-picker.ql-font {
    width: 108px;
}
.text-content .ql-picker.ql-font .ql-picker-label::before,
.text-content .ql-picker.ql-font .ql-picker-item::before {
    content: 'Sans Serif';
}
.text-content .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.text-content .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: 'Serif';
}
.text-content
    .ql-picker.ql-font
    .ql-picker-label[data-value='monospace']::before,
.text-content
    .ql-picker.ql-font
    .ql-picker-item[data-value='monospace']::before {
    content: 'Monospace';
}
.text-content .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    font-family: Georgia, Times New Roman, serif;
}
.text-content
    .ql-picker.ql-font
    .ql-picker-item[data-value='monospace']::before {
    font-family: Monaco, Courier New, monospace;
}
.text-content .ql-picker.ql-size {
    width: 98px;
}
.text-content .ql-picker.ql-size .ql-picker-label::before,
.text-content .ql-picker.ql-size .ql-picker-item::before {
    content: 'Normal';
}
.text-content .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.text-content .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: 'Small';
}
.text-content .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.text-content .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: 'Large';
}
.text-content .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.text-content .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: 'Huge';
}
.text-content .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    font-size: 10px;
}
.text-content .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    font-size: 18px;
}
.text-content .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    font-size: 32px;
}
.text-content .ql-color-picker.ql-background .ql-picker-item {
    background-color: #fff;
}
.text-content .ql-color-picker.ql-color .ql-picker-item {
    background-color: #000;
}
.ql-toolbar.text-content {
    border: 1px solid #d1d5db;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}
.ql-toolbar.text-content .ql-formats {
    margin-right: 15px;
}
.ql-toolbar.text-content .ql-picker-label {
    border: 1px solid transparent;
}
.ql-toolbar.text-content .ql-picker-options {
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
}
.ql-toolbar.text-content .ql-picker.ql-expanded .ql-picker-label {
    border-color: #d1d5db;
}
.ql-toolbar.text-content .ql-picker.ql-expanded .ql-picker-options {
    border-color: #d1d5db;
}
.ql-toolbar.text-content .ql-color-picker .ql-picker-item.ql-selected,
.ql-toolbar.text-content .ql-color-picker .ql-picker-item:hover {
    border-color: #000;
}
.ql-toolbar.text-content + .ql-container.text-content {
    border-top: 0px;
}
.text-content .ql-tooltip {
    background-color: #fff;
    border: 1px solid #d1d5db;
    box-shadow: 0px 0px 5px #d1d5db;
    color: #4b5563;
    padding: 5px 12px;
    white-space: nowrap;
}
.text-content .ql-tooltip::before {
    content: 'Visit URL:';
    line-height: 26px;
    margin-right: 8px;
}
.text-content .ql-tooltip input[type='text'] {
    display: none;
    border: 1px solid #d1d5db;
    font-size: 13px;
    height: 26px;
    margin: 0px;
    padding: 3px 5px;
    width: 170px;
}
.text-content .ql-tooltip a.ql-preview {
    display: inline-block;
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
}
.text-content .ql-tooltip a.ql-action::after {
    border-right: 1px solid #d1d5db;
    content: 'Edit';
    margin-left: 16px;
    padding-right: 8px;
}
.text-content .ql-tooltip a.ql-remove::before {
    content: 'Remove';
    margin-left: 8px;
}
.text-content .ql-tooltip a {
    line-height: 26px;
}
.text-content .ql-tooltip.ql-editing a.ql-preview,
.text-content .ql-tooltip.ql-editing a.ql-remove {
    display: none;
}
.text-content .ql-tooltip.ql-editing input[type='text'] {
    display: inline-block;
}
.text-content .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: 'Save';
    padding-right: 0px;
}
.text-content .ql-tooltip[data-mode='link']::before {
    content: 'Enter link:';
}
.text-content .ql-tooltip[data-mode='formula']::before {
    content: 'Enter formula:';
}
.text-content .ql-tooltip[data-mode='video']::before {
    content: 'Enter video:';
}
.text-content a {
    color: #2563eb;
}
.ql-container.text-content {
    border: 1px solid #d1d5db;
}
</style>
