<!--
 * @Author: 777
 * @Date: 2024-03-24 14:20:27
 * @LastEditors: suqi04
 * @LastEditTime: 2024-04-28 10:32:47
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
            @selection-change="selection"
            @mouseup="mouseup"
            @click="showReloadBtn = false"
            @contextmenu.prevent="rightClick"
        />
        <div
            v-show="showReloadBtn"
            class="reload-text"
            :style="{
                top: `${mouseTopAndLeft.y}px`,
                left: `${mouseTopAndLeft.x}px`
            }"
            @contextmenu.prevent
            @click.stop
        >
            <div class="reload-text-content">
                <div
                    class="reload-text-content-line"
                    @click="reloadSelectText('oldRange')"
                >
                    <span>重新生成选中区域</span>
                </div>
                <div
                    class="reload-text-content-line"
                    @click="expansionSelectText('oldRange')"
                >
                    <span>扩写选中区域</span>
                </div>
                <div
                    class="reload-text-content-line"
                    @click="continuationSelectText('oldRange')"
                >
                    <span>续写选中区域</span>
                </div>
            </div>
        </div>
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
    toRaw,
    watch
} from 'vue';
import { ElLoading } from 'element-plus';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import { downLoadWordDoc } from '@/utils';
import { useRouter } from 'vue-router';
import PlayInfo from '@/store/palyInfo';
import { ElMessage } from 'element-plus';
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

const mouseTopAndLeft = reactive({
    x: 0,
    y: 0
});

const state = reactive({
    text: props.content
});
var Bold = Quill.import('formats/bold');
Bold.tagName = 'B'; // Quill uses <strong> by default
Quill.register(Bold, true);

const emit = defineEmits(['saveRich']);
const downSvg =
    '<svg t="1711624986970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2888"><path d="M811.323077 590.769231v220.553846H212.676923v-220.553846H118.153846v315.076923h787.692308v-315.076923z" fill="#333333" p-id="2889"></path><path d="M512 712.861538l118.153846-122.092307h-70.892308V118.153846h-94.523076v472.615385h-70.892308z" fill="#333333" p-id="2890"></path></svg>';
const saveSvg =
    '<svg t="1711618157084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1732"><path d="M338.1 341.4h229.1c20.7 0 37.7-17 37.7-37.7V129.5c0-20.7-17-37.7-37.7-37.7H338.1c-20.7 0-37.7 17-37.7 37.7v174.1c0 20.8 17 37.8 37.7 37.8z" fill="#6D6E70" p-id="1733"></path><path d="M772 68.2h-82.5v292.1c0 12.3-10 22.3-22.3 22.3H232.4c-12.3 0-22.3-10-22.3-22.4l1.8-292h-69.2c-33.4 0-60.5 27.1-60.5 60.5V892c0 33.4 27.1 60.5 60.5 60.5h737.7c33.4 0 60.5-27.1 60.5-60.5V258.8L772 68.2z m57 765.5c0 17.7-14.5 32.3-32.3 32.3H240.3c-17.7 0-32.3-14.5-32.3-32.3V501.4c0-17.7 14.5-32.3 32.3-32.3h556.4c17.7 0 32.3 14.5 32.3 32.3v332.3z" fill="#6D6E70" p-id="1734"></path><path d="M723.7 585.7H302.5c-16 0-29.1 13.1-29.1 29.1s13.1 29.1 29.1 29.1h421.2c16 0 29.1-13.1 29.1-29.1s-13.1-29.1-29.1-29.1zM723.7 737H302.5c-16 0-29.1 13.1-29.1 29.1s13.1 29.1 29.1 29.1h421.2c16 0 29.1-13.1 29.1-29.1S739.7 737 723.7 737z" fill="#6D6E70" p-id="1735"></path></svg>';
const reloadTextSvg =
    '<svg t="1713667293366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1542"><path d="M337.62183964 696.72936427h-34.23732268c-16.86315859 0-30.66029086 13.66938006-30.66029089 30.66028739 0 16.86315859 13.66938006 30.66029086 30.66029089 30.66029094h34.23732268c16.86315859 0 30.66029086-13.66938006 30.66029086-30.66029094s-13.79712884-30.66029086-30.66029086-30.66028739z m195.45934399-165.69331534H294.56968433c-12.00861458 0-21.84545481 13.66938006-21.84545826 30.66028748 0 16.86315859 9.70909146 30.66029086 21.84545826 30.66029087h238.5114993c12.00861458 0 21.84545481-13.66938006 21.84545826-30.66029087s-9.70909146-30.66029086-21.84545826-30.66028748z m104.88374263-159.56125923H303.38451696c-16.86315859 0-30.66029086 13.66938006-30.66029089 30.66029088 0 16.86315859 13.66938006 30.66029086 30.66029089 30.66029082H637.96492626c16.86315859 0 30.66029086-13.66938006 30.66028743-30.66029082s-13.66938006-30.66029086-30.66028743-30.66029088z" p-id="1543"></path><path d="M518.00654269 918.50545721H160.04766196c-4.98229623 0-8.94258482-4.0880374-8.94258481-8.94258481v-707.99718428c0-4.85454745 3.9602886-8.94258482 8.94258481-8.9425848h29.25502648c0.38325328 0 0.76650659 0.38325328 0.76650662 0.76650659v14.05263333c0 35.77033932 29.25502647 65.02536243 65.02536581 65.02536236H683.95535911c35.38708263 0 64.25885581-28.74402095 64.25885924-64.2588558v-14.81913989c0-0.38325328 0.38325328-0.76650659 0.76650657-0.76650659h29.2550265c4.85454745 0 8.94258482 4.0880374 8.94258485 8.9425848v290.5062429c0 16.86315859 13.66938006 30.53253866 30.53253866 30.53253865s30.53253866-13.66938006 30.53253514-30.53253865v-291.27275292c0.12775226-38.32536356-30.91579188-69.36890432-69.11339983-69.36890426h-30.14928532c-0.38325328 0-0.76650659-0.38325328-0.76650657-0.76650663-1.02201109-34.49282721-29.38277873-62.21483715-64.13110703-62.21483712h-54.5497644c-0.38325328 0-0.76650659-0.38325328-0.7665066-0.76650656 0-35.77033932-29.25502647-65.02536243-65.02536584-65.02536585H376.84145867c-35.13158157 0-63.87560247 28.36076769-64.25885584 63.49234927 0 0.38325328-0.38325328 0.76650659-0.76650662 0.76650661l-57.61579416 1.53301653c-34.74832825 0-63.2368482 27.72201333-64.25885578 62.21483712 0 0.38325328-0.38325328 0.76650659-0.76651004 0.76650663h-30.14928193c-38.19761133 0-69.36890432 31.04354414-69.36890773 69.36890426v708.7636943c0 38.58086462 31.55454971 70.13541089 70.13541432 70.13541092h358.2143818c16.86315859 0 30.53253866-13.66938006 30.53253861-30.5325352v-0.12775222c0-16.86315859-13.66938006-30.53253866-30.53253861-30.53253869z m-266.7445182-785.92542348h0.12775225c0-1.66076539 1.40526435-2.93827751 3.06602638-2.93827752h88.91483937c16.86315859 0 30.66029086-13.66938006 30.66029088-30.66028749v-32.06555516c0-1.66076539 1.40526435-2.93827751 2.93827753-2.93827757H563.86922675c2.0440187 0 3.70478412 1.66076539 3.70478407 3.70478754v31.29904519c0 16.86315859 13.66938006 30.66029086 30.66029089 30.66028749h85.08230303c2.0440187 0 3.70478412 1.66076539 3.70478414 3.70478748v74.86220611c0 1.66076539-1.40526435 2.93827751-2.93827756 2.9382775H254.32805429c-1.66076539 0-3.06602977-1.40526435-3.0660298-2.9382775v-75.62871607z" p-id="1544"></path><path d="M896.02236402 850.03081176c-19.80143615 59.02105856-73.96794726 101.56220832-138.86556423 104.50048585-87.38182623 3.9602886-161.34977349-66.30287456-161.60527451-153.68470071-0.25550102-85.33780747 69.11340327-154.83446063 154.32345848-154.8344641 49.43971594 0 95.04689899 23.25071917 124.04642096 62.59809047h-18.90718071c-13.03062227 0-24.14497805 10.09234471-24.65598021 23.12297039-0.51100549 13.66938006 10.47559799 25.03923685 24.01722583 25.0392368h73.84019842c13.28612673 0 24.14497805-10.73110247 24.14497804-24.14497803v-73.20144064c0-13.03062227-10.09234471-24.14497805-23.12297044-24.65598354-13.66938006-0.51100549-25.03923685 10.47559799-25.03923681 24.0172258v10.475598c-38.19761133-44.96842521-94.79139451-71.41292298-154.32345508-71.41292302-112.42106304 0-203.76317441 92.10862135-202.48566233 204.78518208 1.27751206 111.91005755 91.98086917 200.95264918 203.89092326 200.18614254 89.42584487-0.51100549 165.31006202-58.8933063 191.49905882-140.2708252 4.72679517-14.94689214-6.51531281-30.14928533-22.22870819-30.1492853-11.24210461 0.12775226-21.07894823 7.15406719-24.5282313 17.62966861z" p-id="1545"></path></svg>';
const expansionTextSvg =
    '<svg t="1713667293366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1542"><path d="M337.62183964 696.72936427h-34.23732268c-16.86315859 0-30.66029086 13.66938006-30.66029089 30.66028739 0 16.86315859 13.66938006 30.66029086 30.66029089 30.66029094h34.23732268c16.86315859 0 30.66029086-13.66938006 30.66029086-30.66029094s-13.79712884-30.66029086-30.66029086-30.66028739z m195.45934399-165.69331534H294.56968433c-12.00861458 0-21.84545481 13.66938006-21.84545826 30.66028748 0 16.86315859 9.70909146 30.66029086 21.84545826 30.66029087h238.5114993c12.00861458 0 21.84545481-13.66938006 21.84545826-30.66029087s-9.70909146-30.66029086-21.84545826-30.66028748z m104.88374263-159.56125923H303.38451696c-16.86315859 0-30.66029086 13.66938006-30.66029089 30.66029088 0 16.86315859 13.66938006 30.66029086 30.66029089 30.66029082H637.96492626c16.86315859 0 30.66029086-13.66938006 30.66028743-30.66029082s-13.66938006-30.66029086-30.66028743-30.66029088z" p-id="1543"></path><path d="M518.00654269 918.50545721H160.04766196c-4.98229623 0-8.94258482-4.0880374-8.94258481-8.94258481v-707.99718428c0-4.85454745 3.9602886-8.94258482 8.94258481-8.9425848h29.25502648c0.38325328 0 0.76650659 0.38325328 0.76650662 0.76650659v14.05263333c0 35.77033932 29.25502647 65.02536243 65.02536581 65.02536236H683.95535911c35.38708263 0 64.25885581-28.74402095 64.25885924-64.2588558v-14.81913989c0-0.38325328 0.38325328-0.76650659 0.76650657-0.76650659h29.2550265c4.85454745 0 8.94258482 4.0880374 8.94258485 8.9425848v290.5062429c0 16.86315859 13.66938006 30.53253866 30.53253866 30.53253865s30.53253866-13.66938006 30.53253514-30.53253865v-291.27275292c0.12775226-38.32536356-30.91579188-69.36890432-69.11339983-69.36890426h-30.14928532c-0.38325328 0-0.76650659-0.38325328-0.76650657-0.76650663-1.02201109-34.49282721-29.38277873-62.21483715-64.13110703-62.21483712h-54.5497644c-0.38325328 0-0.76650659-0.38325328-0.7665066-0.76650656 0-35.77033932-29.25502647-65.02536243-65.02536584-65.02536585H376.84145867c-35.13158157 0-63.87560247 28.36076769-64.25885584 63.49234927 0 0.38325328-0.38325328 0.76650659-0.76650662 0.76650661l-57.61579416 1.53301653c-34.74832825 0-63.2368482 27.72201333-64.25885578 62.21483712 0 0.38325328-0.38325328 0.76650659-0.76651004 0.76650663h-30.14928193c-38.19761133 0-69.36890432 31.04354414-69.36890773 69.36890426v708.7636943c0 38.58086462 31.55454971 70.13541089 70.13541432 70.13541092h358.2143818c16.86315859 0 30.53253866-13.66938006 30.53253861-30.5325352v-0.12775222c0-16.86315859-13.66938006-30.53253866-30.53253861-30.53253869z m-266.7445182-785.92542348h0.12775225c0-1.66076539 1.40526435-2.93827751 3.06602638-2.93827752h88.91483937c16.86315859 0 30.66029086-13.66938006 30.66029088-30.66028749v-32.06555516c0-1.66076539 1.40526435-2.93827751 2.93827753-2.93827757H563.86922675c2.0440187 0 3.70478412 1.66076539 3.70478407 3.70478754v31.29904519c0 16.86315859 13.66938006 30.66029086 30.66029089 30.66028749h85.08230303c2.0440187 0 3.70478412 1.66076539 3.70478414 3.70478748v74.86220611c0 1.66076539-1.40526435 2.93827751-2.93827756 2.9382775H254.32805429c-1.66076539 0-3.06602977-1.40526435-3.0660298-2.9382775v-75.62871607z" p-id="1544"></path><path d="M699.2 753.6l3.2 3.2 1.6 1.6 1.6 1.6 3.2 3.2c3.2 3.2 4.8 6.4 4.8 9.6 0 3.2-3.2 4.8-6.4 9.6l-8 8-11.2 11.2c-4.8 4.8-8 8-12.8 11.2l-9.6 9.6c-3.2 3.2-4.8 6.4-6.4 8s0 4.8 1.6 6.4l6.4 6.4 6.4 6.4c3.2 3.2 4.8 4.8 3.2 8 0 1.6-3.2 3.2-8 3.2s-9.6 1.6-16 1.6-11.2 1.6-17.6 1.6c-6.4 0-11.2 1.6-17.6 1.6-6.4 0-11.2 1.6-16 1.6-4.8 0-8 0-9.6-1.6v-9.6c0-4.8 1.6-9.6 1.6-14.4 0-4.8 1.6-11.2 1.6-16 0-4.8 1.6-11.2 1.6-16 0-4.8 1.6-11.2 1.6-14.4 0-4.8 1.6-8 4.8-9.6 1.6-1.6 4.8 0 8 1.6 1.6 1.6 4.8 3.2 6.4 6.4l6.4 6.4c1.6 1.6 3.2 3.2 4.8 1.6 1.6 0 3.2-1.6 6.4-4.8l9.6-9.6 12.8-12.8 12.8-12.8c4.8-3.2 8-6.4 9.6-9.6l3.2-3.2c1.6-1.6 3.2-1.6 4.8-1.6h4.8c1.6 0 4.8 4.8 6.4 6.4z m134.4-128c4.8 0 8 0 9.6 1.6 1.6 1.6 3.2 4.8 1.6 8 0 4.8-1.6 9.6-1.6 14.4 0 4.8-1.6 11.2-1.6 16 0 4.8-1.6 11.2-1.6 16 0 4.8-1.6 11.2-1.6 14.4 0 4.8-1.6 8-4.8 9.6-1.6 1.6-4.8 0-8-3.2-1.6-1.6-4.8-3.2-8-6.4s-4.8-4.8-8-6.4c-1.6-1.6-3.2-3.2-4.8-3.2-1.6 0-3.2 1.6-4.8 3.2-3.2 1.6-6.4 4.8-9.6 9.6s-8 8-12.8 12.8l-12.8 12.8-9.6 11.2-3.2 3.2c-1.6 1.6-3.2 1.6-4.8 1.6h-4.8c-1.6 0-3.2-1.6-4.8-3.2l-9.6-9.6c-3.2-3.2-4.8-6.4-4.8-9.6s3.2-6.4 6.4-9.6l8-8 11.2-11.2c4.8-4.8 8-8 12.8-11.2l9.6-9.6c3.2-3.2 4.8-4.8 6.4-8 0-1.6 0-4.8-1.6-6.4-1.6-1.6-3.2-3.2-6.4-4.8l-6.4-6.4c-3.2-3.2-4.8-4.8-3.2-8s3.2-3.2 8-4.8 9.6-1.6 16-1.6 11.2-1.6 17.6-1.6c6.4 0 11.2-1.6 17.6-1.6 4.8 1.6 9.6 0 14.4 0z" fill="none" stroke="#4b5563" stroke-width="50" p-id="918"></path></svg>';
const continuationTextSvg =
    '<svg t="1713667293366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1542"><path d="M337.62183964 696.72936427h-34.23732268c-16.86315859 0-30.66029086 13.66938006-30.66029089 30.66028739 0 16.86315859 13.66938006 30.66029086 30.66029089 30.66029094h34.23732268c16.86315859 0 30.66029086-13.66938006 30.66029086-30.66029094s-13.79712884-30.66029086-30.66029086-30.66028739z m195.45934399-165.69331534H294.56968433c-12.00861458 0-21.84545481 13.66938006-21.84545826 30.66028748 0 16.86315859 9.70909146 30.66029086 21.84545826 30.66029087h238.5114993c12.00861458 0 21.84545481-13.66938006 21.84545826-30.66029087s-9.70909146-30.66029086-21.84545826-30.66028748z m104.88374263-159.56125923H303.38451696c-16.86315859 0-30.66029086 13.66938006-30.66029089 30.66029088 0 16.86315859 13.66938006 30.66029086 30.66029089 30.66029082H637.96492626c16.86315859 0 30.66029086-13.66938006 30.66028743-30.66029082s-13.66938006-30.66029086-30.66028743-30.66029088z" p-id="1543"></path><path d="M518.00654269 918.50545721H160.04766196c-4.98229623 0-8.94258482-4.0880374-8.94258481-8.94258481v-707.99718428c0-4.85454745 3.9602886-8.94258482 8.94258481-8.9425848h29.25502648c0.38325328 0 0.76650659 0.38325328 0.76650662 0.76650659v14.05263333c0 35.77033932 29.25502647 65.02536243 65.02536581 65.02536236H683.95535911c35.38708263 0 64.25885581-28.74402095 64.25885924-64.2588558v-14.81913989c0-0.38325328 0.38325328-0.76650659 0.76650657-0.76650659h29.2550265c4.85454745 0 8.94258482 4.0880374 8.94258485 8.9425848v290.5062429c0 16.86315859 13.66938006 30.53253866 30.53253866 30.53253865s30.53253866-13.66938006 30.53253514-30.53253865v-291.27275292c0.12775226-38.32536356-30.91579188-69.36890432-69.11339983-69.36890426h-30.14928532c-0.38325328 0-0.76650659-0.38325328-0.76650657-0.76650663-1.02201109-34.49282721-29.38277873-62.21483715-64.13110703-62.21483712h-54.5497644c-0.38325328 0-0.76650659-0.38325328-0.7665066-0.76650656 0-35.77033932-29.25502647-65.02536243-65.02536584-65.02536585H376.84145867c-35.13158157 0-63.87560247 28.36076769-64.25885584 63.49234927 0 0.38325328-0.38325328 0.76650659-0.76650662 0.76650661l-57.61579416 1.53301653c-34.74832825 0-63.2368482 27.72201333-64.25885578 62.21483712 0 0.38325328-0.38325328 0.76650659-0.76651004 0.76650663h-30.14928193c-38.19761133 0-69.36890432 31.04354414-69.36890773 69.36890426v708.7636943c0 38.58086462 31.55454971 70.13541089 70.13541432 70.13541092h358.2143818c16.86315859 0 30.53253866-13.66938006 30.53253861-30.5325352v-0.12775222c0-16.86315859-13.66938006-30.53253866-30.53253861-30.53253869z m-266.7445182-785.92542348h0.12775225c0-1.66076539 1.40526435-2.93827751 3.06602638-2.93827752h88.91483937c16.86315859 0 30.66029086-13.66938006 30.66029088-30.66028749v-32.06555516c0-1.66076539 1.40526435-2.93827751 2.93827753-2.93827757H563.86922675c2.0440187 0 3.70478412 1.66076539 3.70478407 3.70478754v31.29904519c0 16.86315859 13.66938006 30.66029086 30.66029089 30.66028749h85.08230303c2.0440187 0 3.70478412 1.66076539 3.70478414 3.70478748v74.86220611c0 1.66076539-1.40526435 2.93827751-2.93827756 2.9382775H254.32805429c-1.66076539 0-3.06602977-1.40526435-3.0660298-2.9382775v-75.62871607z" p-id="1544"></path><path d="M656 784c17.6 0 32-14.4 32-32s-14.4-32-32-32-32 14.4-32 32 14.4 32 32 32z m112 0c17.6 0 32-14.4 32-32s-14.4-32-32-32-32 14.4-32 32 14.4 32 32 32z m112 0c17.6 0 32-14.4 32-32s-14.4-32-32-32-32 14.4-32 32 14.4 32 32 32z" fill="none" stroke="#4b5563" stroke-width="50" p-id="1093"></path></svg>';
const myQuillEditor = ref();
const showReloadBtn = ref(false);
const selected = ref(false);
watch(
    selected,
    val => {
        const quillReloadTexttnDom = document.querySelector(
            '.ql-finalPhraseReload'
        );
        const quillExpansionDom = document.querySelector(
            '.ql-finalPhraseExpansion'
        );
        const quillContinuationDom = document.querySelector(
            '.ql-finalPhraseContinuation'
        );
        if (quillReloadTexttnDom) {
            if (val) {
                quillReloadTexttnDom.style.cursor = 'pointer';
            } else {
                quillReloadTexttnDom.style.cursor = 'not-allowed';
            }
        }
        if (quillExpansionDom) {
            if (val) {
                quillExpansionDom.style.cursor = 'pointer';
            } else {
                quillExpansionDom.style.cursor = 'not-allowed';
            }
        }
        if (quillContinuationDom) {
            if (val) {
                quillContinuationDom.style.cursor = 'pointer';
            } else {
                quillContinuationDom.style.cursor = 'not-allowed';
            }
        }
    },
    { deep: true }
);
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
                // [{ align: [] }], // 对齐方式
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                // [{ direction: 'ltl' }], // 文本方向
                // [{ direction: 'rtl' }], // 文本方向
                // [{ indent: '-1' }, { indent: '+1' }], // 缩进
                // [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                // ['blockquote', 'code-block'], // 引用  代码块
                ['clean'], // 清除文本格式
                [
                    'finalPhraseReload',
                    'finalPhraseExpansion',
                    'finalPhraseContinuation'
                ]
                // ['link', 'image', 'video'] // 链接、图片、视频
            ],
            handlers: {
                shadeBox: null,
                that: this,
                finalPhraseSave: function () {
                    const htmlDom = `<h2>${nowTitle.value}</h2>${toRaw(
                        myQuillEditor.value
                    ).getHTML()}`;

                    downLoadWordDoc(htmlDom, nowTitle.value);
                },
                finalPhraseReload: function () {
                    if (selected.value) {
                        reloadSelectText();
                    }
                },
                finalPhraseExpansion: function () {
                    if (selected.value) {
                        expansionSelectText();
                    }
                },
                finalPhraseContinuation: function () {
                    if (selected.value) {
                        continuationSelectText();
                    }
                }
            }
        }
        // toolbar: false
    }
};

function change(val: any) {
    // console.log(toRaw(myQuillEditor.value).getHTML());
    // console.log(state.text);
    // convertClassesToStyles(document.querySelector('.ql-editor'))
    emit('saveRich', toRaw(myQuillEditor.value).getHTML());
}

let selectParams = reactive({
    range: null,
    oldRange: null,
    source: null
});

function rightClick(e: any) {
    showReloadBtn.value = true;
    mouseTopAndLeft.x = e.x + 10;
    mouseTopAndLeft.y = e.y + 10;
}

function reloadSelectText(key = 'range') {
    const quill = toRefs(myQuillEditor.value);
    let { range, oldRange, source } = selectParams;
    range = selectParams[key]

    showReloadBtn.value = false;
    if (range && range.index && range.length) {
        const loading = ElLoading.service({
            lock: true,
            text: '重新生成中, 请勿刷新浏览器...'
        });
        setTimeout(() => {
            loading.close();
            ElMessage.success('重写已完成');
            quill.getQuill.value().deleteText(range.index, range.length);
            quill.getQuill
                .value()
                .insertText(range.index, '我是重新生成的文本');
        }, 3000);
    }
}

function continuationSelectText(key = 'range') {
    const quill = toRefs(myQuillEditor.value);
    let { range, oldRange, source } = selectParams;
    range = selectParams[key]

    showReloadBtn.value = false;
    if (range && range.index && range.length) {
        const loading = ElLoading.service({
            lock: true,
            text: '文案续写中中, 请勿刷新浏览器...'
        });
        setTimeout(() => {
            loading.close();
            ElMessage.success('续写已填充至文案末尾');
            quill.getQuill
                .value()
                .insertText(range.index + range.length, '我是续写的文本');
        }, 3000);
    }
}

function expansionSelectText(key = 'range') {
    console.log(selectParams);
    
    const quill = toRefs(myQuillEditor.value);
    let { range, oldRange, source } = selectParams;
    range = selectParams[key]
    showReloadBtn.value = false;
    if (range && range.index && range.length) {
        const loading = ElLoading.service({
            lock: true,
            text: '文案扩写中, 请勿刷新浏览器...'
        });
        setTimeout(() => {
            loading.close();
            ElMessage.success('扩写文案已填充至选中区域');
            quill.getQuill.value().deleteText(range.index, range.length);
            quill.getQuill
                .value()
                .insertText(range.index, '我是扩写(这里是扩写文案)生成的文本');
        }, 3000);
    }
}

function selection(params: any) {
    const { range, oldRange, source } = params;
    selectParams = params;
    const quill = toRefs(myQuillEditor.value);
    // console.log(quill);
    // console.log(quill.getQuill.value());

    if (range && range.index && range.length) {
        selected.value = true;
        var text = quill.getText.value(range.index, range.length);
        // quill.reinit.value(range.length)
        console.log('User has highlighted', text);
        console.log(mouseTopAndLeft);
    } else {
        console.log('Cursor not in the editor');
        selected.value = false;
    }
}

function mouseup(e: any) {
    console.log(e);
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
    const quillReloadTexttnDom = document.querySelector(
        '.ql-finalPhraseReload'
    );
    if (quillReloadTexttnDom) {
        // @ts-ignore
        quillReloadTexttnDom.innerHTML = reloadTextSvg;
        quillReloadTexttnDom.style.cursor = 'not-allowed';
    }
    const quillExpansionDom = document.querySelector(
        '.ql-finalPhraseExpansion'
    );
    if (quillExpansionDom) {
        // @ts-ignore
        quillExpansionDom.innerHTML = expansionTextSvg;
        quillExpansionDom.style.cursor = 'not-allowed';
    }
    const quillContinuationDom = document.querySelector(
        '.ql-finalPhraseContinuation'
    );
    if (quillContinuationDom) {
        // @ts-ignore
        quillContinuationDom.innerHTML = continuationTextSvg;
        quillContinuationDom.style.cursor = 'not-allowed';
    }
});
</script>
<style lang="less" scoped>
.reload-text {
    box-shadow: 0 0 3px #00000075;
    background-color: #fffffff0;
    border-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    min-width: 150px;
    height: auto;
    padding: 10px 5px;
    &-content {
        width: auto;
        min-width: 100%;
        &-line {
            height: 25px;
            font-size: 14px;
            line-height: 25px;
            padding: 0 5px;
            border-radius: 5px;
            cursor: pointer;
        }
        &-line:hover {
            color: #fff;
            background-color: #4096fe;
        }
    }
}
</style>
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
