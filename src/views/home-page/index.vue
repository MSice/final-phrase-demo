<!--
 * @Author: suqi04
 * @Date: 2024-03-20 19:27:42
 * @LastEditTime: 2024-03-25 19:13:37
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/views/home-page/index.vue
 * @Description: 文件描述
-->
<template>
    <div class="home-page">
        <video
            autoplay
            loop
            muted
            playsinline
            class="fill-background"
        >
            <source
                src="./homePageVideo.mp4"
                type="video/mp4"
            >
            Your browser does not support the video tag.
        </video>
        <div class="home-page-box">
            <div class="home-page-header">
                <Header v-if="userInfo.name"></Header>
                <el-button
                    v-else
                    type="primary"
                    class="start-create-btn login-btn"
                    @click="ShowLoaginDialog = true"
                >登陆 | 注册</el-button>
            </div>
            <div class="home-page-name">
                <span>Final</span>
                <span>Perase</span>
            </div>
            <p class="home-page-alrent">
                {{ text[0] }}
                <span style="color: #d96868">
                    {{ text[1] }}
                </span>
                {{ text[2] }}
            </p>
            <div class="home-page-control">
                <span>
                    <el-button
                        type="primary"
                        class="start-create-btn"
                    >开始创作</el-button>
                    <el-button
                        type="primary"
                        class="start-create-btn margin-btn"
                    >了解更多</el-button>
                </span>
            </div>
        </div>
        <el-dialog
            v-model="ShowLoaginDialog"
            class="login-dialog"
            width="350px"
        >
            <template #title>
                <div class="login-dialog-title">
                    <img
                        src="../../assets/images/logo.png"
                        alt=""
                    >
                </div>
            </template>
            <div class="login-dialog-type">
                <span
                    :class="['text-btn', loginType === 'password' ? 'text-btn-active' : '']"
                    @click="loginType = 'password'"
                >密码登陆</span>
                <span
                    :class="['text-btn', loginType === 'captcha' ? 'text-btn-active' : '']"
                    @click="loginType = 'captcha'"
                >验证码登陆</span>
            </div>
            <div class="login-dialog-form">
                <el-form
                    ref="loginRuleFormRef"
                    :model="loginParams"
                    label-width="auto"
                    :rules="rules"
                    size="large"
                >
                    <el-form-item prop="account">
                        <el-input
                            v-model="loginParams.account"
                            placeholder="手机号"
                        />
                    </el-form-item>
                    <el-form-item
                        v-if="loginType === 'password'"
                        prop="password"
                    >
                        <el-input
                            v-model="loginParams.password"
                            placeholder="密码"
                        />
                    </el-form-item>
                    <el-form-item
                        v-else
                        prop="password"
                    >
                        <el-input
                            v-model="loginParams.password"
                            placeholder="验证码"
                        >
                            <template #append>
                                <span class="form-text-btn">
                                    获取验证码
                                </span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="login-control">
                            <template v-if="loginType === 'password'">
                                <el-checkbox v-model="saveLoginPassword">
                                    <span class="text-btn-hover">记住密码</span>
                                </el-checkbox>

                                <span class="text-btn-hover">忘记密码</span>
                            </template>
                        </div>
                        <el-button
                            type="primary"
                            class="login-commit-btn"
                            @click="login(loginRuleFormRef)"
                        >登 陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue';

import type { FormInstance, FormRules } from 'element-plus';

import AppUserInfo from '@/store/userInfo';
const { userInfo } = AppUserInfo();

import { ElMessage } from 'element-plus';
import { getUserInfo } from '@/api/index';

import { ref, reactive, onMounted } from 'vue';
import SQLTest from '@/store/SqlTest';
const { userLoginSql } = SQLTest();

import AppDomConfig from '@/store/fullSituation';
const { ShowLoaginDialog } = AppDomConfig();

const phoneNumberRegex = /^1[3-9]\d{9}$/; // 手机号效验正则

const loginRuleFormRef = ref<FormInstance>();

let text = reactive([
    '「我们不能创造',
    '100分',
    '的脚本,因为我们需要你的画龙点睛」'
]);

// 登陆弹窗
const loginType = ref('password');
const loginParams = reactive({
    account: '',
    password: ''
});
const rules = reactive<FormRules<typeof loginParams>>({
    account: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (
                        loginParams.account !== '' &&
                        !phoneNumberRegex.test(loginParams.account)
                    ) {
                        callback(new Error('请输入正确格式的手机号'));
                    }
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    password: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === '') {
                    callback(
                        new Error(
                            `${
                                loginType.value === 'password'
                                    ? '密码'
                                    : '验证码'
                            }不能为空`
                        )
                    );
                }
                callback();
            },
            trigger: 'blur'
        }
    ]
});
const saveLoginPassword = ref(false);

const handleClose = (done: () => void) => {};

function login(formEl: FormInstance | undefined) {
    if (!formEl) {
        return;
    }
    formEl.validate(valid => {
        if (valid) {
            const infos = userLoginSql.filter(
                item => item.account === loginParams.account
            );
            if (infos.length <= 0) {
                ElMessage.error('账号未注册！');
                return;
            } else {
                if (infos[0].password !== loginParams.password) {
                    ElMessage.error('密码错误！');
                    return;
                }
            }

            getUserInfo().then(data => {
                userInfo.name = data.name;
                ShowLoaginDialog.value = false;
            });
        } else {
            console.log('error submit!');
            return false;
        }
    });
}

onMounted(() => {
    // inputAlrent();
});
</script>

<style scoped>
.home-page {
    min-height: max(100vh, 735px);
}
.home-page .home-page-name {
    font-size: min(150px, max(10vw, 110px));
}
.home-page .home-page-alrent {
    font-size: min(35px, max(3.1vw, 25px));
    letter-spacing: 2px;
}
.home-page-name span:last-child {
    /* margin-left: min(50px, max(35px, 5vw)); */
}
.margin-btn {
    margin-left: min(200px, max(13vw, 150px)) !important;
}
.start-create-btn {
    font-size: min(20px, max(1.5vw, 17px));
    width: min(200px, max(13vw, 150px));
}
</style>

<style lang="less" scoped>
@import '../../style/index.less';
.home-page {
    width: 100%;
    height: 100%;
    min-width: @ScreenMinWidth;
    position: relative;
    box-sizing: border-box;
    // background: linear-gradient(to bottom, #f2f3f7, #9cc6fcd8);
    background: @BackgroundColorImg;
    position: relative; /* 相对定位 */
    width: 100%; /* 视频宽度 */
    height: 100vh; /* 视频高度 */
    overflow: hidden; /* 隐藏溢出的视频部分 */
    color: @TextColor;

    .start-create-btn {
        height: 50px;
        // width: 200px;
        color: #fff;
        border-radius: 20px;
        font-weight: bold;
        letter-spacing: 2px;
        // font-size: 20px;
        background-image: radial-gradient(#0066fff0, transparent);
    }

    .home-page-box {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }
    .fill-background {
        width: 100%; /* 视频宽度 */
        height: 100%; /* 视频高度 */
        object-fit: cover; /* 视频填充 */
        position: absolute; /* 绝对定位 */
        top: 0;
        left: 0;
        // z-index: -1;
    }
    &-header {
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        line-height: 50px;
        padding: 0 20px;
        text-align: right;
        // background-color: #fff;
        .login-btn {
            height: 30px;
            width: 120px;
            font-size: 14px;
        }
    }
    @font-face {
        font-family: 'Archivo Narrow';
        src: url('https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap');
    }
    &-name {
        font-weight: 600;
        height: 40vh;
        min-height: 210px;
        line-height: 40vh;
        text-align: center;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            display: block;
            transform: scale(0.8, 1.4);
            text-shadow: 0px 18px 16px #00000040;
        }
    }
    &-alrent {
        font-family: 'Noto Sans SC';
        text-align: center;
        font-size: 35px;
        color: #666;
        font-weight: 1000;
    }
    &-control {
        position: relative;
        box-sizing: border-box;
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .start-create-btn:last-child {
            background-image: none;
            background-color: transparent;
            border: 3px solid #0084ff8e;
            color: #666;
            background-color: #ffffff6b;
        }
        .start-create-btn:hover {
            box-shadow: 0px 3px 8px 0px #fc4d6d43;
        }
    }
}
</style>
 
<style lang="less">
@import '../../style/index.less';
.login-dialog {
    border-radius: 10px !important;
    .el-dialog__body {
        padding: 0 10px;
    }
    .el-form-item {
        margin-bottom: 30px;
        .el-input-group__append {
            background-color: transparent !important;
        }
        .form-text-btn {
            cursor: pointer;
            color: #4096ef;
            font-weight: 600;
        }
        .login-control {
            width: 100%;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
            .text-btn-hover {
                color: #595959;
                font-weight: normal;
                font-size: 12px;
            }
            .text-btn-hover:hover {
                cursor: pointer;
            }
        }
        .login-commit-btn {
            width: 100%;
            letter-spacing: 5px;
        }
    }
    &-title {
        height: 25px;
        img {
            height: 100%;
        }
    }
    &-type {
        margin: 15px 0 30px !important;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: @FontSizeSmall;
        font-weight: 700;
        .text-btn {
            user-select: none;
            cursor: pointer;
            padding-bottom: 5px;
            margin-bottom: 2px;
        }
        .text-btn-active {
            border-bottom: 2px solid #4096ef;
            color: #4096ef;
            margin-bottom: 0;
        }
    }
}
</style>