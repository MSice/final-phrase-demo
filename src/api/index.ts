/*
 * @Author: huangwensong
 * @Date: 2024-03-19 21:09:18
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-19 21:12:02
 * @FilePath: /final-phrase-demo/src/api/index.ts
 * @Description:
 */
import { GET, POST } from "./request";

/**
 * 获取用户信息
 * @param {}
 * @returns
 */
export const getUserInfo = () => GET("/userInfo", {}, { isToken: true });

/**
 * 登陆
 * @param {}
 * @returns
 */

export const login = (params: { username: string; password: string }) =>
  GET("/login", params, { isToken: false });
