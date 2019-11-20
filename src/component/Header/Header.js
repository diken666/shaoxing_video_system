import React from 'react';
import style from './Header.module.scss'
import axios from 'axios';

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '绍兴古城保护利用信息管理系统',
            cityName: '绍兴',
            weatherInfo: {}
        }
    }
    async componentDidMount() {
        // let info = await this.getWeatherInfo();
        // if ( info && info.statusText === "OK" ) {
        //     let data = info.data.HeWeather6[0].now;
        //     this.setState({
        //         weatherInfo: {
        //             condTxt: data["cond_txt"],  // 天气情况
        //             tmp: data["tmp"],           // 温度
        //             windDir: data["wind_dir"]   // 风向
        //         }
        //     })
        // }
    }

    getWeatherInfo() {
        return axios.get(`https://free-api.heweather.net/s6/weather/now?location=${this.state.cityName}&key=d25f7e82b40d401d83a832cf8ebc2334`)
    }

    itemClick(index) {
        let items = document.getElementsByClassName(style.item);
        for ( let i=0; i<items.length; i++ ) {
            i === index ?  items[i].classList.add(style.active) : items[i].classList.remove(style.active);
        }
    }
    render() {
        return (
            <div className={style.header}>

                        <div className={style.title}>
                            <i className={style.titleCamera} />
                            <span className={style.titleCtx}>{this.state.title}</span>
                            <span className={style.titleTips}>监控中心</span>
                            <i className={style.line1}/>
                            <i className={style.line2}/>
                        </div>


                        <div className={style.rightBox}>
                            <div
                                className={[style.item, style.active].join(" ")}
                                onClick={ () => {
                                    this.props.headerItemClick("视图列表");
                                    this.itemClick(0)
                                }}
                            >
                                视图列表
                                <i className={style.greenLine}/>
                            </div>
                            <div
                                className={style.item}
                                onClick={ () => {
                                    this.props.headerItemClick("实时路况");
                                    this.itemClick(1)
                                }}
                            >
                                实时路况
                                <i className={style.greenLine}/>
                            </div>
                            <div
                                className={style.item}
                                onClick={ () => {
                                    this.props.headerItemClick("实时人流量");
                                    this.itemClick(2)
                                }}
                            >
                                实时人流量
                                <i className={style.greenLine}/>
                            </div>
                            <div
                                className={style.item}
                                onClick={ () => {
                                    this.props.headerItemClick("人流量变化分析");
                                    this.itemClick(3)
                                }}
                            >
                                人流量变化分析
                                <i className={style.greenLine}/>
                            </div>
                            <div
                                className={style.item}
                                onClick={ () => {
                                    this.props.headerItemClick("人流量统计");
                                    this.itemClick(4)
                                }}
                            >
                                人流量统计
                                <i className={style.greenLine}/>
                            </div>
                            <div className={style.userBox}>
                                <div className={style.userCircle}>
                                    <i className={style.userIcon}/>
                                </div>
                                <span className={style.userName}>{this.props.username}</span>
                                <i className={style.caret} />
                                <div className={style.userFuc}>
                                    <div className={style.userFucItem}>退出登录</div>
                                </div>
                            </div>
                        </div>


            </div>
        )
    }
}