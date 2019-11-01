import React from 'react';
import style from './WeatherBox.module.scss'

export default class WeatherBox extends React.Component {
    constructor(props)  {
        super( props );
        this.state = {
            city: "绍兴"
        }
    }
    render() {
        return (
            <div className={style.weatherBox}>
                <div className={style.title}>{ this.state.city }</div>
                <div className={style.ctn}>
                    <img className={style.picture} src="./img/weather.png" alt=""/>
                    <div className={style.ctxBox}>
                        <span className={style.ctx}>25 晴 微风</span>
                        <span className={style.ctx}>空气质量：优</span>
                    </div>
                </div>
            </div>
        )
    }
}