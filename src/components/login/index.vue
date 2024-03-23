<!--
 * @Author: suqi04
 * @Date: 2024-03-23 12:49:51
 * @LastEditTime: 2024-03-23 17:30:45
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/components/login/index.vue
 * @Description: 登陆页面
-->
<template>
    <el-dialog
        v-model="showLogin"
        width="350"
        class="login-wide"
        :before-close="closeCallback"
    >
        <template #title>
            <div class="login-wide-header">
                <img
                    src="../../assets/images/logo.png"
                    alt=""
                >
            </div>
        </template>
        <div class="form-content">
            <div class="form-content-title">
                <span
                    :class="loginType === 'password' ? 'btn-active' : ''"
                    @click="loginType = 'password'"
                >密码登陆</span>
                <span
                    :class="loginType === 'captcha' ? 'btn-active' : ''"
                    @click="loginType = 'captcha'"
                >验证码登陆</span>
            </div>
            <el-form
                :model="loginParams"
                label-width="auto"
                style="max-width: 600px"
                size="large"
            >
                <el-form-item>
                    <el-input
                        v-model="loginParams.logingId"
                        placeholder="用户名 | 手机号"
                    />
                </el-form-item>
                <el-form-item v-if="loginType === 'password'">
                    <el-input
                        v-model="loginParams.passWord"
                        placeholder="密码"
                    />
                </el-form-item>
                <el-form-item v-else>
                    <el-input
                        v-model="loginParams.passWord"
                        placeholder="验证码"
                    >
                        <template #append>
                            <el-button
                                type="primary"
                                text
                                class="captcha-btn"
                            >获取验证码</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="control-sel">
                        <span @click="savePassword = true">
                            <el-checkbox
                                v-model="savePassword"
                                size="mini"
                                style="margin-right: 5px"
                            ></el-checkbox>
                            保存密码
                        </span>
                        <span>
                            忘记密码
                        </span>
                    </div>
                    <el-button
                        type="primary"
                        class="login-btn"
                    >登 陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api';
import { ref, reactive, watch, watchEffect, onBeforeMount } from 'vue';
const showLogin = ref(false); // 是否展示登陆框
const loginType = ref('password'); // 登陆类型
const savePassword = ref(false);
const loginParams = reactive({
    logingId: '',
    passWord: ''
});
// watchEffect(() => {
//     console.log(loginType);

// })
watch(
    () => loginType.value,
    () => {
        loginParams.passWord = '';
    }
);
function closeCallback(done: Function) {
    done();
}

function login() {
    // getUserInfo().then(data => {
    //     console.log(data);
        
    // })
}

onBeforeMount(() => {
    login()
})
</script>

<style lang="less">
@import '../../style/index.less';
.login-wide {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
    padding: 16px 16px !important;
    border-radius: 10px !important;
    min-height: 370px;
    .el-dialog__headerbtn {
        top: 6px;
        right: 6px;
        font-size: 20px;
    }
    img {
        height: 28px;
    }
    .form-content {
        width: 100%;
        height: 100%;
        .form-content-title {
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            font-size: @FontSizeLarge;
            font-weight: 600;
            span {
                user-select: none;
                cursor: pointer;
                padding-bottom: 5px;
                border-bottom: 2px solid #0000;
            }
            .btn-active {
                color: #4096ef;
                padding-bottom: 5px;
                border-bottom: 2px solid #4096ef;
            }
        }
        .el-form {
            margin-top: 25px;
            padding: 0 15px;
            .el-form-item {
                margin-bottom: 30px;
            }
            .captcha-btn {
                color: #4096ef;
            }
            .el-input-group__append {
                background-color: transparent;
            }
            .control-sel {
                width: 100%;
                height: 20px;
                font-size: @FontSizeMini;
                line-height: 20px;
                margin-bottom: 5px;
                color: @TextGreyColor;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
            .login-btn {
                width: 100%;
                font-weight: 600;
                letter-spacing: 10px;
            }
        }
    }
}
</style>
