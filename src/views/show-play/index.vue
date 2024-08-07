<!--
 * @Author: 777
 * @Date: 2024-03-24 17:18:43
 * @LastEditors: suqi suqi.777@bytedance.com
 * @LastEditTime: 2024-08-07 22:23:18
 * @FilePath: /final-phrase-demo/src/views/show-play/index.vue
 * @Description: 
-->
<!--  -->
<template>
    <div>
        <div class="content">
            <div class="menu">
                <Menu
                    :key="activeItemId"
                    v-show="showMenu"
                    :menuItems="menuList"
                    :activeItemId="activeItemId"
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
                <Title :initial-text="mainScript.title"></Title>
                <div class="select-content"></div>
            </div>
        </div>
        <EditBtn v-show="showMenu"></EditBtn>
        <div v-if="showMenu && isPreview" class="jj-btn" @click="drawer = true">
            查看简介
        </div>
        <div v-if="!showMenu" class="loading-content">
            <span
                v-if="!isPreview"
                :class="initAiLoading ? '' : 'loading-text'"
                id="loading-text"
            >
                {{ initAiLoadingText }}
            </span>
            <div v-if="initAiLoading" class="loading-point">
                <div class="bounce-dot"></div>
                <div class="bounce-dot"></div>
                <div class="bounce-dot"></div>
            </div>
            <div
                v-if="!initAiLoading"
                class="loading-point"
                style="margin-left: 5px"
            >
                {{ nowPercent.toFixed(2) }}%
                <!-- <div class="bounce-dot"></div>
                <div class="bounce-dot"></div>
                <div class="bounce-dot"></div> -->
            </div>
        </div>
        <el-drawer v-model="drawer" :with-header="false" style="width: 700px">
            <div v-html="jjInfo"></div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue';
import {
    createOutline,
    create_main,
    create_role,
    create_storyline,
    get_script_list,
    create_script
} from '@/api';
import { ChOrder } from '@/utils';
import Title from '@/components/title.vue';
import Menu from './menu.vue';
import EditBtn from './editBtn.vue';
import PlayInfo from '../../store/palyInfo';

import { useRoute } from 'vue-router';
const $route = useRoute();

const drawer = ref(false);
const isCollapsed = ref(true);
const showMenu = ref(false);
const activeItemId = ref('');
const isPreview = ref(false);
const jjInfo = ref('');
const { state, Prequel, menuList } = PlayInfo();
const initAiLoading = ref(true);
const initAiLoadingText = ref('Final Phrase 思考中');
const bodyDom: any = document.querySelector('.main-body ');

const loadPercentage = ref(100.0);

let timer: any = null;
const estimatedTime = ref(500 * 60 * 18);
let addPercent = 100 / estimatedTime.value;
const nowPercent = ref(0);
const isShowScript = $route.query.showScript;
// const { title, content } = toRefs(state);
const mainScript = toRefs(state);
const PrequelObj = toRefs(Prequel);

let loadingDom: any = null;

let paragraph = Prequel;

function removeInputTags(htmlString: string) {
    // 定义匹配<input>标签的正则表达式
    var inputPattern = /<input[^>]*>/g;
    // 使用replace()方法替换匹配到的<input>标签为空字符串
    var result = htmlString.replace(inputPattern, '');
    return result;
}

let realDom = {};
// const realDomObserver = reactive

const observerConfig = { childList: true, subtree: true, characterData: true };
// 导航处理
let scrollTimer: any = null;
function onScroll() {
    if (!showMenu.value) {
        return;
    }
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        for (let i of menuList.value) {
            if ($route.path !== '/showPlay') {
                return;
            }
            const targetElement: any = document.getElementById(i.id);
            // 获取目标元素的位置信息

            let elementRect: any = targetElement?.getBoundingClientRect();
            if (
                elementRect?.top >= 0 ||
                (elementRect?.bottom <= window.innerHeight &&
                    elementRect?.bottom > 0)
            ) {
                // 当元素进入视口时，触发提示

                activeItemId.value = i.id;
                break;
            }
        }
    }, 200);
}

// 打字机效果实现
async function Typewriter(
    lineData: any,
    typeTitle: any,
    id: any,
    type: any,
    cb: any
) {
    let realDomObserver = null;
    if (realDom) {
        realDomObserver = new MutationObserver(dom => {
            bodyDom.scrollTop = bodyDom.scrollHeight;
        });
        realDomObserver.observe(realDom, observerConfig);
    } else {
        return;
    }
    // 创建富文本虚拟dom & 设置属性
    let mockDiv = document.createElement('div');
    mockDiv.innerHTML = lineData.join('');
    let onceAdd = 0.1;
    try {
        onceAdd =
            Math.floor(
                (loadPercentage.value * 100) / mockDiv.innerText.length
            ) / 100;
    } catch (e) {
        onceAdd =
            loadPercentage.value > 0.1
                ? loadPercentage.value - 0.1
                : loadPercentage.value;
    }
    // console.log(onceAdd, '----');

    let addMax = 0;
    // 获取文本中的所有行
    const lineList = mockDiv.querySelectorAll('p');
    realDom.innerHTML += `<h3 id="${type}-${id}-h3" class="text-content-title" style="margin:10px 0 10px">${typeTitle}</h3>`;
    // 创建富文本虚拟dom & 设置属性
    mockDiv = document.createElement('div');
    mockDiv.id = `${type}-${id}`;
    mockDiv.className = 'ql-editor';
    mockDiv.setAttribute('data-gramm', 'false');
    mockDiv.contentEditable = 'false';
    realDom?.appendChild(mockDiv);

    menuList.value.push({
        label: typeTitle,
        id: mockDiv.id,
        menuType: type
    });
    // 创建阶段标题
    // const titleH3 = document.createElement('h3');
    // titleH3.innerHTML = `<h3 class="text-content-title" style="margin:20px 0 10px 20px">${typeTitle}</h3>`;

    if (lineList.length > 0) {
        // 实现打字机效果
        // console.log(lineList.length, lineList);

        for (let index = 0; index < lineList.length; index++) {
            let pLine = lineList[index];
            const pCloneDom = pLine?.cloneNode(true);

            const pCloneText = pCloneDom.innerHTML.split('');

            // 如果不是预览效果，按字符输出
            if (!isShowScript) {
                pCloneDom.innerHTML = '';
            }
            mockDiv.appendChild(pCloneDom);

            if (!isShowScript) {
                let inTag = false;
                let currentText = '';
                let tagBuffer = '';
                for (let char of pCloneText) {
                    // for (let childIndex = 0)
                    await new Promise(reslove => {
                        setTimeout(() => {
                            if (char === '<') {
                                inTag = true;
                                tagBuffer = '<';
                            } else if (inTag) {
                                tagBuffer += char;
                                if (char === '>') {
                                    inTag = false;
                                    currentText += tagBuffer;
                                    tagBuffer = '';
                                }
                            } else {
                                currentText += char;
                            }
                            pCloneDom.innerHTML = currentText;
                            if (onceAdd + addMax < loadPercentage.value - 0.1) {
                                nowPercent.value += onceAdd;
                                addMax += onceAdd;
                            }
                            if (loadingDom && type === "script") {
                                loadingDom.style.background = `linear-gradient(90deg, #505050b0 ${
                                    nowPercent.value 
                                }%, transparent 0%), linear-gradient(-90deg, #ffffffb0 100%, transparent 0%)`;
                            }
                            reslove('');
                        }, 5);
                    });
                }
            }
            // 行与行之间实现间隔等待

            await new Promise(reslove => {
                setTimeout(() => {
                    reslove('');
                }, 100);
            });
        }
        nowPercent.value = loadPercentage.value * (parseInt(id, 10) + 1);
        // console.log(loadPercentage.value, id);
    }

    if (realDomObserver) {
        realDomObserver.disconnect();
    }
    switch (type) {
        case 'synopsis':
            // Prequel.content.push({
            //     sessionId: mockDiv.id,
            //     sessionTitle: typeTitle,
            //     text: mockDiv.outerHTML
            // });
            PrequelObj.content.value.push({
                sessionId: mockDiv.id,
                sessionTitle: typeTitle,
                text: mockDiv.outerHTML
            });
            break;
        default:
            // state.content.push({
            //     sessionId: mockDiv.id,
            //     sessionTitle: typeTitle,
            //     text: mockDiv.outerHTML
            // });
            mainScript.content.value.push({
                sessionId: mockDiv.id,
                sessionTitle: typeTitle,
                text: mockDiv.outerHTML
            });
            
    }
    cb('');
}

// 生成剧本文本
function reloadMainScriptApiReload() {
    nowPercent.value = 0;
    initAiLoading.value = false;
    initAiLoadingText.value = 'Final Phrase 剧本生成中';
    realDom.innerHTML += `<h2 id="script-info-h3" class="text-content-title" style="margin:10px 0 10px">剧本内容</h2>`;
    activeItemId.value = 'script-info';
    menuList.value.push({
        label: '剧本内容',
        id: 'script-info',
        menuType: 'script'
    });
    new Promise(reslove => {
        get_script_list().then(async (data: any) => {
            if (data && data.code === 0) {
                data = data.data;
                if (data?.length > 0) {
                    loadPercentage.value =
                        Math.floor((100 * 100) / data?.length) / 100;
                    for (
                        let script_index = 0;
                        script_index < data.length;
                        script_index++
                    ) {
                        let script = data[script_index];
                        await new Promise(_reslove => {
                            create_script({
                                script_name: script
                            })
                                .then((_data: any) => {
                                    if (
                                        _data &&
                                        _data.success &&
                                        _data.content
                                    ) {
                                        try {
                                            _data.content = JSON.stringify(_data.content)
                                        } catch(e) {
                                            console.log("内容格式异常");
                                            
                                        }
                                        _data = JSON.parse(
                                            _data.content
                                                // .replace(/\\n/g, '')
                                                // .replace(/\n/g, '')
                                        );
                                        // 筛选内容前面的key
                                        let formatData = Object.keys(_data)
                                            .filter(
                                                key =>
                                                    ![
                                                        '元素',
                                                        '剧本内容',
                                                        '场次'
                                                    ].includes(key)
                                            )
                                            .map(key => {
                                                let _line = _data[key];
                                                if (key === "剧本内容") {
                                                    _line = _line.replace(/\\n/g, '</p><p>').replace(/\n/g, '</p><p>')
                                                }
                                                return `<p><b>${key}:</b> ${_data[key]}</p>`;
                                            });
                                        // 整理元素
                                        let elementList = [];
                                        if (_data['元素']) {
                                            elementList = [
                                                `<p><b>元素:</b></p>`,
                                                ..._data['元素'].map(
                                                    (
                                                        el: any,
                                                        index: number
                                                    ) => {
                                                        // `<p><b>元素${ChOrder(index + 1)}</b></p>` +
                                                        return (
                                                            Object.keys(el)
                                                                .map(_key => {
                                                                    return `<p><em>${_key}: </em> ${el[_key]}</p>`;
                                                                })
                                                                .join('') +
                                                            `<p><br></p>`
                                                        );
                                                    }
                                                )
                                            ];
                                        }
                                        formatData = [
                                            ...formatData,
                                            ...elementList,
                                            `<p><b>剧本内容: </b></p><p>${_data['剧本内容'].replace(/\\n/g, '</p><p>').replace(/\n/g, '</p><p>')}</p>`
                                        ];

                                        Typewriter(
                                            formatData,
                                            script,
                                            script_index,
                                            'script',
                                            _reslove
                                        );
                                    } else {
                                        _reslove();
                                    }
                                })
                                .catch(err => {
                                    _reslove();
                                });
                        });
                    }
                    bodyDom.scrollTo(0, 0);
                    reslove();
                }
            }
        });
    }).finally(() => {
        nowPercent.value = 100;
        localStorage.setItem('MainScript_history', JSON.stringify(state));
        showMenu.value = true;
    });
}

// 生成剧本简介
function reloadIntroduceApiReload() {
    initAiLoading.value = true;
    initAiLoadingText.value = '开始生成故事梗概';
    realDom.innerHTML += `<h2 class="text-content-title" style="margin:10px 0 10px">剧本简介</h2>`;
    new Promise(reslove => {
        createOutline().then(data => {
            initAiLoadingText.value = '故事梗概生成中';
            if (data) {
                try {
                    mainScript.title.value = data['剧本名称'] || '示例剧本';

                    const formatData = Object.keys(data)
                        .filter(key => key != '剧本名称')
                        .map((key: any) => {
                            return `<p><b>${key}:</b> ${data[key]}</p>`;
                        });

                    Typewriter(formatData, '故事梗概', 10, 'synopsis', reslove);
                } catch (e) {
                    reslove('');
                }
            }
        });
    })
        .then(() => {
            initAiLoadingText.value = '开始生成大元素';
            return new Promise(reslove => {
                create_main().then(data => {
                    initAiLoadingText.value = '大元素生成中';
                    if (data && data.length > 0) {
                        const formatData = data.map(item => {
                            return (
                                Object.keys(item)
                                    .map(key => {
                                        return `<p><b>${key}:</b>${item[key]}</p>`;
                                    })
                                    .join('') + `、<p><br></p>`
                            );
                        });
                        Typewriter(
                            formatData,
                            '大元素',
                            11,
                            'synopsis',
                            reslove
                        );
                    }
                });
            });
        })
        .then(() => {
            initAiLoadingText.value = '开始生成人物信息';
            return new Promise(reslove => {
                create_role().then(data => {
                    initAiLoadingText.value = '人物信息生成中';
                    if (data && data.length > 0) {
                        const formatData = data.map(item => {
                            return (
                                Object.keys(item)
                                    .map(key => {
                                        return `<p><b>${key}:</b>${item[key]}</p>`;
                                    })
                                    .join('') + `、<p><br></p>`
                            );
                        });
                        Typewriter(
                            formatData,
                            '人物信息',
                            12,
                            'synopsis',
                            reslove
                        );
                    }
                });
            });
        })
        .then(() => {
            initAiLoadingText.value = '开始生成故事线';
            return new Promise(reslove => {
                create_storyline().then(data => {
                    initAiLoadingText.value = '故事线生成中';
                    if (data && data.length > 0) {
                        const formatData = data.map(item => {
                            return (
                                Object.keys(item)
                                    .map(key => {
                                        return `<p><b>${key}:</b>${item[key]}</p>`;
                                    })
                                    .join('') + `、<p><br></p>`
                            );
                        });
                        Typewriter(
                            formatData,
                            '故事线',
                            13,
                            'synopsis',
                            reslove
                        );
                    }
                });
            });
        })
        .catch(() => {
            console.log('err');
        })
        .finally(() => {
            localStorage.setItem('Introduce_history', JSON.stringify(Prequel));
            reloadMainScriptApiReload();
        });
}

async function reloadIntroduceHistory() {
    let introduceHistory = localStorage.getItem('Introduce_history');
    if (Prequel.content.length <= 0 && introduceHistory) {
        try {
            introduceHistory = JSON.parse(introduceHistory);
            Prequel.content = introduceHistory.content.map(item => {
                menuList.value.push({
                    label: item.sessionTitle,
                    id: item.sessionId,
                    menuType: 'synopsis'
                });
                return item;
            });
            Prequel.title = introduceHistory.title;
        } catch (e) {
            console.log(e);
        }
    }
    reloadMainScriptHistory();
}

async function reloadMainScriptHistory() {
    
    nowPercent.value = 0;
    initAiLoading.value = false;
    initAiLoadingText.value = 'Final Phrase 剧本生成中';
    realDom.innerHTML += `<h2 id="script-info" class="text-content-title" style="margin:10px 0 10px">剧本内容</h2>`;
    activeItemId.value = 'script-info';
    menuList.value.push({
        label: '剧本内容',
        id: 'script-info',
        menuType: 'script'
    });
    let mainScriptHistory = localStorage.getItem('MainScript_history');

    try {
        mainScriptHistory = JSON.parse(mainScriptHistory);
    } catch (e) {
        console.log(e);
    }
    console.log(mainScriptHistory,);
    
    if (mainScriptHistory && mainScriptHistory.content.length > 0) {
        loadPercentage.value =
            Math.floor((100 * 100) / mainScriptHistory.content.length) / 100;
        
        for (let index = 0; index < mainScriptHistory.content.length; index++) {
            let item = mainScriptHistory.content[index];
            const mockDiv = document.createElement('div');
            mockDiv.innerHTML = item.text;
            let formatData = [];
            mockDiv.querySelectorAll('p').forEach((item, index) => {
                formatData.push(item.outerHTML);
            });
            // .map(dom => {
            //     return dom.outerHTML;
            // });
            console.log(loadPercentage.value, nowPercent.value, item.sessionId.split('-')[1]);
            await new Promise(_reslove => {
                Typewriter(
                    formatData,
                    item.sessionTitle,
                    item.sessionId.split('-')[1],
                    'script',
                    _reslove
                );
            });
            console.log(loadPercentage.value, nowPercent.value);
        }
    }
    showMenu.value = true;
}
onMounted(async () => {
    // 获取query值
    console.log('show start');

    isPreview.value = $route?.query?.preview === '1' ? true : false;
    $route?.query?.preview === '1' &&
        paragraph.content.map(item => {
            jjInfo.value += `<h3 class="text-content-title" style="margin:20px 0 10px 20px">${
                item.sessionTitle
            }</h3>${removeInputTags(item.text)}`;
        });
    // document.addEventListener();

    realDom = document.querySelector('.select-content');
    loadingDom = document.querySelector('#loading-text');
    menuList.value = [];
    Prequel.content = [];
    state.content = [];
    if (!$route.query.showScript) {
        // reloadIntroduceApiReload();
        reloadMainScriptApiReload();
    } else {
        reloadIntroduceHistory();
    }
    return;
    function showNextItem(index: number) {
        if ($route.path !== '/showPlay') {
            return;
        }

        if (index < paragraph.content.length) {
            const item = paragraph.content[index];
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
                    const pDom = paragraphs[counter].cloneNode(true);
                    const pDomText = pDom.innerText.split('');

                    if (!$route.query.showScript) {
                        pDom.innerText = '';
                    }

                    container1.appendChild(pDom);
                    counter++;
                    if (!$route.query.showScript) {
                        let textIndex = 0;
                        function insertText(dom: Document) {
                            if (pDomText.length <= 0) {
                                bodyDom.scrollTo(0, bodyDom?.scrollHeight);
                                setTimeout(showNextLine, 50); // 控制每行显示的时间间隔，单位为毫秒
                                return;
                            }
                            pDom.innerText += pDomText[textIndex];
                            textIndex++;
                            if (textIndex < pDomText.length) {
                                setTimeout(() => {
                                    insertText(pDom);
                                }, 5);
                            } else {
                                // 滚动到页面底部
                                bodyDom.scrollTo(0, bodyDom?.scrollHeight);
                                setTimeout(showNextLine, 30); // 控制每行显示的时间间隔，单位为毫秒
                            }
                        }
                        insertText(pDom);
                    } else {
                        bodyDom.scrollTo(0, bodyDom?.scrollHeight);
                        setTimeout(
                            showNextLine,
                            $route.query.showScript ? 50 : 30
                        ); // 控制每行显示的时间间隔，单位为毫秒
                    }
                } else {
                    container1 = null;
                    showNextItem(index + 1); // 执行下一个项
                }
            }

            showNextLine();
        } else {
            if (initAiLoading.value) {
                initAiLoading.value = false;
                initAiLoadingText.value = 'Final Phrase 剧本生成中';
                setTimeout(() => {
                    initAiLoadingText.value = 'Final Phrase 开始生成剧本';
                    timer = setInterval(() => {
                        const loadingDom =
                            document.querySelector('#loading-text');
                        if (nowPercent.value <= 90) {
                            nowPercent.value = nowPercent.value + addPercent;
                        } else {
                            clearInterval(timer);
                            timer = null;
                        }
                        if (loadingDom) {
                            loadingDom.style.background = `linear-gradient(90deg, #505050b0 ${nowPercent.value}%, transparent 0%), linear-gradient(-90deg, #ffffffb0 100%, transparent 0%)`;
                        }
                    }, 5);
                    // const realDom = document.querySelector('.select-content');
                    // realDom.innerHTML = ''
                    paragraph = state;
                    if (!timer) {
                        timer = setInterval(() => {
                            const loadingDom =
                                document.querySelector('#loading-text');
                            if (nowPercent.value <= 90) {
                                nowPercent.value =
                                    nowPercent.value + addPercent;
                            } else {
                                clearInterval(timer);
                                timer = null;
                            }
                            if (loadingDom) {
                                loadingDom.style.background = `linear-gradient(90deg, #505050b0 ${nowPercent.value}%, transparent 0%), linear-gradient(-90deg, #ffffffb0 100%, transparent 0%)`;
                            }
                        }, 5);
                    }
                    showNextItem(0);
                }, 5000);
            } else {
                nowPercent.value = 100;
                setTimeout(() => {
                    const loadingDom = document.querySelector('#loading-text');
                    if (loadingDom) {
                        loadingDom.style.background = 'none';
                    }
                    showMenu.value = true;
                }, 300);
            }
        }
    }

    initAiLoadingText.value = 'Final Phrase 剧本简介生成中';
    if ($route.query.showScript) {
        paragraph = state;
        initAiLoading.value = false;
        initAiLoadingText.value = 'Final Phrase 剧本生成中';
        showNextItem(0); // 开始执行第一个项
    } else {
        setTimeout(() => {
            showNextItem(0); // 开始执行第一个项
        }, 1000);
    }
});

const scrollToElement = (data: any) => {
    activeItemId.value = data.id;
    const targetElement = document.getElementById(`${data.id}-h3`);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

bodyDom.addEventListener('scroll', onScroll);

onBeforeUnmount(() => {
    bodyDom.removeEventListener('scroll', onScroll);
});
</script>
<style>
.el-drawer {
    min-width: 700px !important;
}
.el-drawer h3 {
    text-align: left;
    font-size: 20px;
}
.el-drawer .ql-editor {
    height: auto;
}
</style>
<style lang="less" scoped>
.jj-btn {
    position: fixed;
    right: 10px;
    top: 130px;
    display: flex;
    font-size: 14px;
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b1c6a7;
    padding: 15px;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 20px;
    margin-right: 10px;
    color: rgb(95, 94, 92);
    &:hover {
        background-color: #e9f1e9;
        color: rgb(174, 172, 167);
    }
}
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
        padding: 10px 20px 100px;
    }
}
.loading-content {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: auto;
    white-space: nowrap;
    height: 30px;
    font-size: 25px;
    font-weight: bold;
    /* background-color: #fff; */
    display: flex;
    align-items: baseline;
    flex-direction: row;
    flex-wrap: wrap;
    color: #505050b0;
}

.loading-text {
    background: linear-gradient(90deg, #505050b0 0%, transparent 0%),
        linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    background-clip: text !important;
    color: transparent !important;
    // animation: textLoading 5s forwards alternate;
}

.loading-content .bounce-dot {
    width: 5px;
    height: 5px;
    margin: 0 2px;
    background-color: #505050b0;
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1s infinite alternate;
}

.loading-content .loading-content.bounce-dot:nth-child(2) {
    animation-delay: 0.25s; /* 让第二个点稍微迟于开始 */
}

.loading-point {
    color: #505050b0 !important;
}
.bounce-dot:nth-child(3) {
    animation-delay: 0.5s; /* 让第三个点稍微迟于开始 */
}
@keyframes textLoading {
    0% {
        background: linear-gradient(90deg, #505050b0 0%, transparent 0%),
            linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    }
    5% {
        background: linear-gradient(90deg, #505050b0 5%, transparent 0%),
            linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    }
    10% {
        background: linear-gradient(90deg, #505050b0 10%, transparent 0%),
            linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    }
    12% {
        background: linear-gradient(90deg, #505050b0 12%, transparent 0%),
            linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    }
    20% {
        background: linear-gradient(90deg, #505050b0 20%, transparent 0%),
            linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    }
    99%,
    100% {
        background: linear-gradient(90deg, #505050b0 98%, transparent 0%),
            linear-gradient(-90deg, #ffffffb0 100%, transparent 0%);
    }
}
@keyframes bounce {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
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
