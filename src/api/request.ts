/*
 * @Author: huangwensong
 * @Date: 2024-03-19 19:44:07
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-24 12:35:20
 * @FilePath: /final-phrase-demo/src/api/request.ts
 * @Description:
 */
import axios, {
  Method,
  InternalAxiosRequestConfig,
  AxiosResponse,
  GenericAbortSignal,
  AxiosProgressEvent,
} from "axios";
import { clearToken, getToken } from "@/utils/auth";
import {
  TOKEN_ERROR_CODE,
  ERROR_CODE_ARRAY,
  TOKEN_ERROR_CODE_ARRAY,
} from "../constants/responseCode";
import { ResponseDataType, requestConfigType } from "../types/request";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const instance = axios.create({
  baseURL: "/api", // 开发环境下的跨域解决
  timeout: 5000, //配置超时时间
  withCredentials: true, //携带凭证允许
  headers: {
    "content-type": "application/json",
  }, //请求头格式
});

/* 请求拦截 */
instance.interceptors.request.use(requestAuth, (err) => Promise.reject(err));

/* 响应拦截 */
instance.interceptors.response.use(responseSuccess, (err) => {
  //   NProgress.done(); // 关闭loading
  return Promise.reject(err);
});

/**
 * 请求开始前的检查
 */
function requestAuth(
  config: InternalAxiosRequestConfig & requestConfigType
): InternalAxiosRequestConfig {
  if (config.headers && config.isToken) {
    console.log("auth-consig-token");
    config.headers.Authorization = `Bearer ${getToken()}`; // 需要使用token的请求
  } // 不需要使用token的请求，直接送出即可
  return config;
}

/**
 * 请求成功,检查请求头
 */
function responseSuccess(response: AxiosResponse<ResponseDataType>) {
    console.log(response);
    
  return response;
}

const checkRes = (res: ResponseDataType) => {
  const { code, message, data } = res;

  console.log(data);

  if (code === 200) return data || code;

  if (TOKEN_ERROR_CODE_ARRAY.includes(code)) {
    {
      const router = useRouter();
      router.push("./home");
      ElMessage({
        message: message,
        grouping: true,
        type: "error",
      });
      return null;
    }
  }
};

function request(url: string, params: any, config: any, method: Method): any {
  /* 去空 */
  for (const key in params) {
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  }
  return instance
    .request({
      url: url,
      method: method,
      data: method === "GET" ? null : params,
      params: method === "GET" ? params : null, // get请求不携带data，params放在url上
      ...config, // 用户自定义配置，可以覆盖前面的配置
    })
    .then((res: any) => checkRes(res)) //这里将数据data解构出来了，直接放到下一步checkRes中去了
    .catch((err) => {
      ElMessage.error("请求失败");
    });
}

export default request;

/**
 * api请求方式
 * @param {String} url
 * @param {Any} params
 * @param {Object} config
 * @returns
 */
export function GET<T>(url: string, params = {}, config: any = {}): Promise<T> {
  return request(url, params, config, "GET");
}
export function POST<T>(url: string, data = {}, config: any = {}): Promise<T> {
  return request(url, data, config, "POST");
}
export function PUT<T>(url: string, data = {}, config: any = {}): Promise<T> {
  return request(url, data, config, "PUT");
}
export function DELETE<T>(
  url: string,
  data = {},
  config: any = {}
): Promise<T> {
  return request(url, data, config, "DELETE");
}
