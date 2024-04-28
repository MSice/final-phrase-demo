/*
 * @Author: 777
 * @Date: 2024-03-19 19:51:09
 * @LastEditors: 777
 * @LastEditTime: 2024-03-19 19:51:24
 * @FilePath: /final-phrase-demo/src/types/request.d.ts
 * @Description:
 */
export interface ResponseDataType {
  code: number;
  message: string;
  data: any;
}

export interface requestConfigType {
  headers?: { [key: string]: string };
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signal?: GenericAbortSignal;
  hold?: boolean;
  timeout?: number;
  isToken?: boolean;
}
