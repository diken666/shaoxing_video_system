import React from 'react';
import style from './Header.module.scss'
import axios from 'axios';

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '绍兴古城保护利用信息管理系统监控中心',
            cityName: '绍兴',
            weatherInfo: {}
        }
    }
    async componentDidMount() {
        let info = await this.getWeatherInfo();
        if ( info && info.statusText === "OK" ) {
            let data = info.data.HeWeather6[0].now;
            this.setState({
                weatherInfo: {
                    condTxt: data["cond_txt"],  // 天气情况
                    tmp: data["tmp"],           // 温度
                    windDir: data["wind_dir"]   // 风向
                }
            })
        }
    }

    getWeatherInfo() {
        return axios.get(`https://free-api.heweather.net/s6/weather/now?location=${this.state.cityName}&key=d25f7e82b40d401d83a832cf8ebc2334`)
    }

    render() {
        return (
            <div className={style.header}>
                <div className={style.title}>{this.state.title}</div>
                <div className={style.weather}>
                    {this.state.cityName}，
                    {this.state.weatherInfo.condTxt}，
                    {this.state.weatherInfo.tmp}℃，
                    {this.state.weatherInfo.windDir}
                </div>
            </div>
        )
    }
}