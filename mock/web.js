/*
 * @Author: suqi04
 * @Date: 2021-08-06 09:14:11
 * @LastEditTime: 2024-03-23 17:09:13
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/mock/web.js
 * @Description:
 */
/**
 * @file mock /web
 */

module.exports = [
    {
        enable: true,
        url: "/api/mock/userInfo",
        method: "GET",
        result: (req, res) => res.send("suqi04")
    },
    {
        enable: true,
        url: "/imgs",
        method: "POST",
        result: (req, res) =>
            res.send({
                retCode: 0,
                retData: {
                    name: "小叮当",
                    url:
                        "https://yt3.googleusercontent.com/ytc/AOPolaQTmS-rvSvKJHIlH4amDMS8jD0JM-ABuj5XJf8o=s900-c-k-c0x00ffffff-no-rj"
                },
                retMsg: "OK"
            })
    }
];
