<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 14:20:27
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-28 19:29:23
 * @FilePath: /final-phrase-demo/src/components/RichText/index.vue
 * @Description:
-->
<!--  -->
<template>
    <div class="rich-text">
        <quill-editor
            ref="myQuillEditor"
            content-type="html"
            :content="state.text"
            :options="editorOption"
            @text-change="change"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    reactive,
    toRefs,
    onMounted,
    ref,
    defineProps,
    defineEmits,
    toRaw
} from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { downLoadWordDoc } from '@/utils';
import { useRouter } from 'vue-router';
import PlayInfo from '@/store/palyInfo';
const { nowTitle } = PlayInfo();

const router = useRouter();
//@ts-ignore
// import * as  from 'quill';
const props = defineProps({
    content: {
        type: String,
        default: ''
    }
});

const state = reactive({
    text: props.content
});

const emit = defineEmits(['saveRich']);
const downSvg = '<svg t="1711624986970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2888"><path d="M811.323077 590.769231v220.553846H212.676923v-220.553846H118.153846v315.076923h787.692308v-315.076923z" fill="#333333" p-id="2889"></path><path d="M512 712.861538l118.153846-122.092307h-70.892308V118.153846h-94.523076v472.615385h-70.892308z" fill="#333333" p-id="2890"></path></svg>'
const saveSvg =
    '<svg t="1711618157084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1732"><path d="M338.1 341.4h229.1c20.7 0 37.7-17 37.7-37.7V129.5c0-20.7-17-37.7-37.7-37.7H338.1c-20.7 0-37.7 17-37.7 37.7v174.1c0 20.8 17 37.8 37.7 37.8z" fill="#6D6E70" p-id="1733"></path><path d="M772 68.2h-82.5v292.1c0 12.3-10 22.3-22.3 22.3H232.4c-12.3 0-22.3-10-22.3-22.4l1.8-292h-69.2c-33.4 0-60.5 27.1-60.5 60.5V892c0 33.4 27.1 60.5 60.5 60.5h737.7c33.4 0 60.5-27.1 60.5-60.5V258.8L772 68.2z m57 765.5c0 17.7-14.5 32.3-32.3 32.3H240.3c-17.7 0-32.3-14.5-32.3-32.3V501.4c0-17.7 14.5-32.3 32.3-32.3h556.4c17.7 0 32.3 14.5 32.3 32.3v332.3z" fill="#6D6E70" p-id="1734"></path><path d="M723.7 585.7H302.5c-16 0-29.1 13.1-29.1 29.1s13.1 29.1 29.1 29.1h421.2c16 0 29.1-13.1 29.1-29.1s-13.1-29.1-29.1-29.1zM723.7 737H302.5c-16 0-29.1 13.1-29.1 29.1s13.1 29.1 29.1 29.1h421.2c16 0 29.1-13.1 29.1-29.1S739.7 737 723.7 737z" fill="#6D6E70" p-id="1735"></path></svg>';
const myQuillEditor = ref();
let editorOption = {
    modules: {
        toolbar: {
            container: [
                ['finalPhraseSave'],
                [
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    { color: [] },
                    { background: [] } // 字体颜色、字体背景颜色
                ], // 加粗 斜体 下划线 删除线
                [{ align: [] }], // 对齐方式
                [{ size: ['small', 'large', 'huge'] }], // 字体大小
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                // [{ direction: 'ltl' }], // 文本方向
                // [{ direction: 'rtl' }], // 文本方向
                [{ indent: '-1' }, { indent: '+1' }], // 缩进
                // [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                // ['blockquote', 'code-block'], // 引用  代码块
                ['clean'] // 清除文本格式
                // ['link', 'image', 'video'] // 链接、图片、视频
            ],
            handlers: {
                shadeBox: null,
                that: this,
                finalPhraseSave: function () {
                    const htmlDom = `<h2>${nowTitle.value}</h2>${toRaw(myQuillEditor.value).getHTML()}`

                    downLoadWordDoc(htmlDom, nowTitle.value);
                }
            }
        }
        // toolbar: false
    }
};

function change(val: any) {
    // console.log(toRaw(myQuillEditor.value).getHTML());
    // console.log(state.text);
    emit('saveRich', toRaw(myQuillEditor.value).getHTML());
}

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
onMounted(() => {
    const quillSaveBtnDom = document.querySelector('.ql-finalPhraseSave');
    // @ts-ignore
    quillSaveBtnDom.innerHTML = downSvg;
});
</script>
<style lang="less">
.rich-text {
    width: 100%;
    height: calc(100% - 102px);
}
</style>
<style lang="less">
.ql-editor p {
    font-size: 14px;
}
.editor {
    line-height: normal !important;
    height: 500px !important;
    width: 100vw;
}

.ql-container {
    min-height: 500px !important;
}

.ql-snow .ql-tooltip[data-mode='link']::before {
    content: '请输入链接地址:' !important;
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px !important;
    content: '保存' !important;
    padding-right: 0px !important;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
    content: '请输入视频地址:' !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: '10px' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: '18px' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: '32px' !important;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: '标题1' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: '标题2' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: '标题3' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: '标题4' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: '标题5' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: '标题6' !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: '衬线字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: '等宽字体' !important;
}
</style>
