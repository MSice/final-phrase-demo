/**
 * @file server for mock api
 * @author zhangyou04@baidu.com
 */

let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
// let url = require('url');
let fs = require('fs');
let servicesUrl = require('./servicesUrl');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// 解决跨域问题，*代表所有的都不限制
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

let getReponseFun = (req, res) => {
    let path = __dirname + '/data' + req.path.replace(/\//g, '.').replace('.', '/') + '.json';

    fs.readFile(path, (error, data) => {
        if (!error) {
            res.send(JSON.parse(data));
        }
        else {
            if (error.errno === -2) {
                if (Object.keys(req.params).length) {
                    for (let key in req.params) {
                        path = path.replace(new RegExp('.' + req.params[key]), '.1');
                    }
                }

                readFile(
                    path,
                    data => {
                        res.send(JSON.parse(data));
                    },
                    error => {
                        res.send(JSON.stringify(error));
                    }
                );
            }
            else {
                res.send(JSON.stringify(error));
            }
        }
    });
};

let readFile = (path, callback, errorCallback) => {
    // console.log(path);
    fs.readFile(
        path,
        (error, data) => {
            if (!error) {
                callback && callback(data);
            }
            else {
                errorCallback && errorCallback(error);
            }
        }
    );
};

let formatUrl = function (url) {
    return url.replace(/{[^}]*}/gi, function (a) {
        return ':' + a.replace(/{(.*)}/i, '$1');
    });
};

// console.log(servicesUrl);
let traveralObj = (obj, callback) => {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            app.get(obj[key], getReponseFun);
            callback && callback(obj[key]);
        }
        else {
            if (obj[key].url && obj[key].method) {
                // console.log(obj[key].method + ':' + obj[key].url);
                app[obj[key].method.toLowerCase()](formatUrl(obj[key].url), getReponseFun);
                callback && callback(obj[key]);
            }
            else {
                traveralObj(obj[key], callback);
            }
        }
    }
};

traveralObj(servicesUrl);
let port = process.env.PORT || 8887;
let server = app.listen(port, () => {
    console.log('Listening on port %d', server.address().port);
});
