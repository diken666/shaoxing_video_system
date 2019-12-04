import React from 'react';
import style from './WeatherBox.module.scss'
import axios from 'axios';

export default class WeatherBox extends React.Component {
    constructor(props)  {
        super( props );
        this.state = {
            city: "绍兴"
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={style.weatherBox} >
                <iframe title={"天气"} scrolling="no" src="https://tianqiapi.com/api.php?style=tg&skin=pitaya&city=绍兴" frameBorder="0"
                        width="280" height="60"/>
                {/*<div className={style.title}>{ this.state.city }</div>*/}
                {/*<div className={style.ctn}>*/}
                {/*    <img className={style.picture} src="./img/weather.png" alt=""/>*/}
                {/*    <div className={style.ctxBox}>*/}
                {/*        <span className={style.ctx}>25 晴 微风</span>*/}
                {/*        <span className={style.ctx}>空气质量：优</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}