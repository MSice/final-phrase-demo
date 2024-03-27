/*
 * @Author: suqi04
 * @Date: 2024-03-24 16:37:46
 * @LastEditTime: 2024-03-27 10:28:34
 * @LastEditors: huangwensong
 * @FilePath: /final-phrase-demo/src/store/userInfo.ts
 * @Description: 用户信息储存
 */
import { ref, reactive } from 'vue';
const userInfo = reactive({
    name: '用户',
    account: "",
    imgUrl: '',
    membershipLevel: 0 // 0-普通用户, 1-会员
})
const AppUserInfo = () => {
    return {
        userInfo
    };
};

export default AppUserInfo;
