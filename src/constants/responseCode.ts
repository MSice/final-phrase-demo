/*
 * @Author: 777
 * @Date: 2024-03-19 19:49:56
 * @LastEditors: 777
 * @LastEditTime: 2024-03-19 20:57:37
 * @FilePath: /final-phrase-demo/src/constants/responseCode.ts
 * @Description:
 */
export const ERROR_CODE: { [key: number]: string } = {
  400: "请求失败",
  401: "无权访问",
  403: "紧张访问",
  404: "请求不存在",
  405: "请求方法错误",
  406: "请求的格式错误",
  410: "资源已删除",
  422: "验证错误",
  500: "服务器发生错误",
  502: "网关错误",
  503: "服务器暂时过载或维护",
  504: "网关超时",
};

export const TOKEN_ERROR_CODE: { [key: number]: string } = {
  506: "请先登录",
  507: "请重新登录",
  508: "登录已过期",
};

export const ERROR_CODE_ARRAY = [
  400, 401, 403, 404, 405, 406, 410, 422, 500, 502, 503, 504,
];

export const TOKEN_ERROR_CODE_ARRAY = [506, 507, 508];
