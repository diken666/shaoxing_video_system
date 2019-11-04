import echarts from "echarts";

export default {
    leftTable: {
        tooltip: {},
        xAxis: {},
        yAxis: {},
        legend: {
            show:true,
            bottom: 5,
            data: ['字段一', '字段二'],
            // borderColor:"#ccc",                         //边框颜色
            // borderWidth:0,                               //边框线宽
            // shadowColor:"red",
        },
        series: [{
            name: '字段二',
            data: [
                [11.0, 4.04],
                [5.0, 6.95],
                [7.0, 1.58],
                [3.0, 4.81],
                [12.0, 6.33],
                [11.0, 9.96],
                [4.0, 8.24],
                [3.0, 2.26],
                [1.0, 10.84],
                [3.0, 7.82],
                [2.0, 9.68]
            ],
            type: 'scatter',
            symbolSize: 20,
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgba(56,192,130,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(56,192,130,1)'
                    }])
                }
            }
        }, {
            name: '字段一',
            symbolSize: 20,
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            type: 'scatter',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgba(29,107,226,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(29,107,226,1)'
                    }])
                }
            },
            data: [
                [10.0, 8.04],
                [8.0, 6.95],
                [13.0, 7.58],
                [9.0, 8.81],
                [11.0, 8.33],
                [14.0, 9.96],
                [6.0, 7.24],
                [4.0, 4.26],
                [12.0, 10.84],
                [7.0, 4.82],
                [5.0, 5.68]
            ]

        }],
        grid: {
            top: "20px",
            left: "10px",
            right: "20px",
            bottom: "30px",
            containLabel: true
        }
    },
    bottomTable: {
        xAxis: {
            type: 'category',
            data: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:true,
            top: 5,
            right: 30,
            data: ['字段一', '字段二']
        },
        color:['rgba(29,107,226,1)','rgba(56,192,130,1)'],
        series: [{
                name: "字段一",
                data: [22, 33, 12, 30, 80, 60, 123, 90, 88, 20, 11, 20, 79],
                type: 'line',
                smooth: false,  //设置折线为圆滑曲线,false则有转折点
                symbol: "none",   //默认显示折点，为none时不显示

                lineStyle:{
                    width:5, 
                    //折线颜色渐变
                    color: new echarts.graphic.LinearGradient(29,107,226, 0, [{
                        offset: 0,
                        color: 'rgba(29,107,226,1)'
                    },
                        {
                            offset: 1,
                            color: 'rgba(29,107,226,1)'
                        }])
                },
            },{
                name: "字段二",
                data: [32, 50, 73, 30, 90, 12, 9, 60, 50, 20, 70, 90, 100],
                type: 'line',
                smooth: false,  //设置折线为圆滑曲线,false则有转折点
                symbol: "none",   //默认显示折点，为none时不显示
                lineStyle:{
                    width:5,
                    //折线颜色渐变
                    color: new echarts.graphic.LinearGradient(56,192,130, 0, [{
                        offset: 0,
                        color: 'rgba(56,192,130,1)'
                    },
                        {
                            offset: 1,
                            color: 'rgba(56,192,130,1)'
                        }])
                },
            }
        ],
        grid: {
            top: "40px",
            left: "30px",
            right: "40px",
            bottom: "30px",
            containLabel: true
        }
    }
}