/*
 * @Author: suqi04
 * @Date: 2021-08-06 09:14:11
 * @LastEditTime: 2024-03-24 16:08:14
 * @LastEditors: huangwensong
 * @FilePath: /final-phrase-demo/mock/web.js
 * @Description:
 */
/**
 * @file mock /web
 */

module.exports = [
    {
        enable: true,
        url: '/web/username',
        method: 'GET',
        result: (req, res) => res.send('suqi04')
    },
    {
        enable: true,
        url: '/api/userInfo',
        method: 'GET',
        result: (req, res) =>
            res.send({
                code: 200,
                data: {
                    username: 'hws'
                },
                message: 'success'
            })
    },
    {
        enable: true,
        url: '/imgs',
        method: 'POST',
        result: (req, res) =>
            res.send({
                retCode: 0,
                retData: {
                    name: '小叮当',
                    url: 'https://yt3.googleusercontent.com/ytc/AOPolaQTmS-rvSvKJHIlH4amDMS8jD0JM-ABuj5XJf8o=s900-c-k-c0x00ffffff-no-rj'
                },
                retMsg: 'OK'
            })
    },
    // {
    //     enable: true,
    //     url: '/get_check_data',
    //     method: 'GET',
    //     result: (req, res) => res.send(
    //         {
    //             "retCode": 0,
    //             "retData": {
    //                 "check_alarm": [
    //                     {
    //                         "_id": "5f0563d10f659934bf7e4b48",
    //                         "alarm_time_str" : "2023-05-17 00:00:00",
    //                         "product" : "联盟",
    //                         "params" : "111",
    //                         "charge" : "20",
    //                         "type" : "cmatch",
    //                         "problem_type" : "符合预期",
    //                         "mark_user" : "zhoumeili",
    //                         "mark_time" : "",
    //                         "result" : "cmatch = 111, 聚合粒度: 900.0s, 阈值: 90.0, 不满足巡检监控的标准: 聚合粒度: 172800s, 阈值: 70。",
    //                         "info" : "",
    //                         "tb_charge" : "20",
    //                         "tb" : 20.0,
    //                         "hb_charege": "20",
    //                         "hb" : 20.0,
    //                         "keep_time":"1"
    //                     },
    //                     {
    //                         "_id": "5f0563d10f659934bf7e4b48",
    //                         "alarm_time_str" : "2023-05-17 00:00:00",
    //                         "product" : "联盟",
    //                         "params" : "111",
    //                         "charge" : "20",
    //                         "type" : "cmatch",
    //                         "problem_type" : "符合预期",
    //                         "mark_user" : "zhoumeili",
    //                         "mark_time" : "",
    //                         "result" : "cmatch = 111, 聚合粒度: 900.0s, 阈值: 90.0, 不满足巡检监控的标准: 聚合粒度: 172800s, 阈值: 70。",
    //                         "info" : "",
    //                         "tb_charge" : "20",
    //                         "tb" : 20.0,
    //                         "hb_charege": "20",
    //                         "hb" : 20.0,
    //                         "keep_time":"1"
    //                     },
    //                     {
    //                         "_id": "5f0563d10f659934bf7e4b48",
    //                         "alarm_time_str" : "2023-05-17 00:00:00",
    //                         "product" : "联盟",
    //                         "params" : "111",
    //                         "charge" : "20",
    //                         "type" : "cmatch",
    //                         "problem_type" : "符合预期",
    //                         "mark_user" : "zhoumeili",
    //                         "mark_time" : "",
    //                         "result" : "cmatch = 111, 聚合粒度: 900.0s, 阈值: 90.0, 不满足巡检监控的标准: 聚合粒度: 172800s, 阈值: 70。",
    //                         "info" : "",
    //                         "tb_charge" : "20",
    //                         "tb" : 20.0,
    //                         "hb_charege": "20",
    //                         "hb" : 20.0,
    //                         "keep_time":"1"
    //                     },
    //                     {
    //                         "_id": "5f0563d10f659934bf7e4b48",
    //                         "alarm_time_str" : "2023-05-17 00:00:00",
    //                         "product" : "联盟",
    //                         "params" : "111",
    //                         "charge" : "20",
    //                         "type" : "cmatch",
    //                         "problem_type" : "符合预期",
    //                         "mark_user" : "zhoumeili",
    //                         "mark_time" : "",
    //                         "result" : "cmatch = 111, 聚合粒度: 900.0s, 阈值: 90.0, 不满足巡检监控的标准: 聚合粒度: 172800s, 阈值: 70。",
    //                         "info" : "",
    //                         "tb_charge" : "20",
    //                         "tb" : 20.0,
    //                         "hb_charege": "20",
    //                         "hb" : 20.0,
    //                         "keep_time":"1"
    //                     },
    //                     {
    //                         "_id": "5f0563d10f659934bf7e4b48",
    //                         "alarm_time_str" : "2023-05-17 00:00:00",
    //                         "product" : "联盟",
    //                         "params" : "111",
    //                         "charge" : "20",
    //                         "type" : "cmatch",
    //                         "problem_type" : "符合预期",
    //                         "mark_user" : "zhoumeili",
    //                         "mark_time" : "",
    //                         "result" : "cmatch = 111, 聚合粒度: 900.0s, 阈值: 90.0, 不满足巡检监控的标准: 聚合粒度: 172800s, 阈值: 70。",
    //                         "info" : "",
    //                         "tb_charge" : "20",
    //                         "tb" : 20.0,
    //                         "hb_charege": "20",
    //                         "hb" : 20.0,
    //                         "keep_time":"1"
    //                     },
    //                     {
    //                         "_id": "5f0563d10f659934bf7e4b48",
    //                         "alarm_time_str" : "2023-05-17 00:00:00",
    //                         "product" : "联盟",
    //                         "params" : "111",
    //                         "charge" : "20",
    //                         "type" : "cmatch",
    //                         "problem_type" : "符合预期",
    //                         "mark_user" : "zhoumeili",
    //                         "mark_time" : "",
    //                         "result" : "cmatch = 111, 聚合粒度: 900.0s, 阈值: 90.0, 不满足巡检监控的标准: 聚合粒度: 172800s, 阈值: 70。",
    //                         "info" : "",
    //                         "tb_charge" : "20",
    //                         "tb" : 20.0,
    //                         "hb_charege": "20",
    //                         "hb" : 20.0,
    //                         "keep_time":"1"
    //                     }
    //                     ]
    //                },
    //             "retMsg": "OK"
    //           }
    //     )
    // },
    {
        enable: true,
        url: '/charts/HTMLREPORT',
        method: 'GET',
        result: (req, res) =>
            res.send({
                retCode: 0,
                retData:
                    '{"分成分分析":{"分行业分析":{"cmatch":"222","ctype":"Trade_Charge","product":"凤巢","starttime":"2024-02-17 17:00:00","endtime":"2024-02-17 18:00:00","gini":{"tb":0,"hb":0},"reason":"有风险维度为：医疗服务,教育培训,生活服务","metrics_storage":{"医疗服务":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"医疗服务\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"医疗服务","tag_word":"医疗服务","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=医疗服务&product=","data_strategy":{"tb":{"value":1130.9015590000035,"percent":0.10936276879834571},"hb":{"value":9162.755194000001,"percent":3.968322974175238},"gxd":{"tb":0.31576596134912194,"hb":0.3941952663004464}},"risk":1,"display_content":0.31576596134912194},"教育培训":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"教育培训\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"教育培训","tag_word":"教育培训","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=教育培训&product=","data_strategy":{"tb":{"value":528.4046750000011,"percent":0.14899469521657116},"hb":{"value":2853.7740249999997,"percent":2.33705757387103},"gxd":{"tb":0.14753911059268882,"hb":0.1227735749704208}},"risk":1,"display_content":0.14753911059268882},"生活服务":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"生活服务\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"生活服务","tag_word":"生活服务","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=生活服务&product=","data_strategy":{"tb":{"value":348.42480399999977,"percent":0.1180890585798537},"hb":{"value":1784.855324,"percent":1.178826357744303},"gxd":{"tb":0.09728582679665311,"hb":0.0767871131395797}},"risk":1,"display_content":0.09728582679665311},"商品交易":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"商品交易\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"商品交易","tag_word":"商品交易","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=商品交易&product=","data_strategy":{"tb":{"value":-89.62441600000056,"percent":-0.010396509367533835},"hb":{"value":1701.508440999999,"percent":0.24914125783247124},"gxd":{"tb":-0.025024582956290467,"hb":0.0732014070889573}},"display_content":-0.025024582956290467},"商务服务":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"商务服务\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"商务服务","tag_word":"商务服务","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=商务服务&product=","data_strategy":{"tb":{"value":525.5506479999999,"percent":0.40752487997777037},"hb":{"value":1305.3079220000002,"percent":2.5601359537109523},"gxd":{"tb":0.1467422202071378,"hb":0.05615627538033647}},"display_content":0.1467422202071378},"整形美容":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"整形美容\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"整形美容","tag_word":"整形美容","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=整形美容&product=","data_strategy":{"tb":{"value":-93.81935199999998,"percent":-0.045639429871981864},"hb":{"value":1256.02052,"percent":1.779508135410621},"gxd":{"tb":-0.026195876768997865,"hb":0.054035858524785235}},"display_content":-0.026195876768997865},"文娱传媒":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"文娱传媒\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"文娱传媒","tag_word":"文娱传媒","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=文娱传媒&product=","data_strategy":{"tb":{"value":84.38571499999944,"percent":0.020260562790625884},"hb":{"value":966.9155849999993,"percent":0.2945674139267476},"gxd":{"tb":0.02356185311537603,"hb":0.04159813707221114}},"display_content":0.02356185311537603},"房产家居":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"房产家居\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"房产家居","tag_word":"房产家居","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=房产家居&product=","data_strategy":{"tb":{"value":132.50454500000023,"percent":0.09430103869251856},"hb":{"value":931.8379229999999,"percent":1.5382207082896189},"gxd":{"tb":0.036997406805284044,"hb":0.04008904422617054}},"display_content":0.036997406805284044},"other":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"other\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"other","tag_word":"other","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=other&product=","data_strategy":{"tb":{"value":455.60935100000006,"percent":1.1113419418302148},"hb":{"value":530.0053270000001,"percent":1.5794309302589884},"gxd":{"tb":0.1272134816450139,"hb":0.02280161224368734}},"display_content":0.1272134816450139},"招商加盟":{"monitor_args":"{\\"monitor_metric_args\\": {\\"metric_source_name\\": \\"huhang_api\\", \\"metric_source_params\\": {\\"metric_name\\": \\"fc_cmatch_trade_charge\\", \\"metric\\": \\"9d003f75bb93b77db3a24b56cb7d54f7\\", \\"aggregate_method\\": \\"sum\\", \\"chartid\\": \\"62a1c6964f4f1d4a2b39bf7c\\", \\"expression\\": \\"\\"}, \\"all_dimensions\\": {\\"cmatch\\": \\"222\\", \\"trade_name\\": \\"招商加盟\\", \\"product\\": \\"\\"}, \\"dimensions_map\\": {}, \\"dimensions_trans\\": {}, \\"exposed_dimensions\\": [\\"cmatch\\"]}, \\"params\\": {\\"cmatch\\": \\"222\\"}, \\"url\\": \\"\\"}","category":"Trade_Charge","tag":"招商加盟","tag_word":"招商加盟","url":"https://huhang.baidu.com/charts/gui_new?ChartId=62a1c6964f4f1d4a2b39bf7c&start_str=20240217170000&end_str=20240217180000&cmatch=222&trade_name=招商加盟&product=","data_strategy":{"tb":{"value":153.92298700000003,"percent":0.3166395058725749},"hb":{"value":512.763378,"percent":4.02881818010534},"gxd":{"tb":0.0429777813789213,"hb":0.022059838122946412}},"display_content":0.0429777813789213}}},"html_template":3}}',
                retMsg: 'SUCC'
            })
    }
];
