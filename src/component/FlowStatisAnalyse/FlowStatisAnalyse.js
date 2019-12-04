import React from 'react';
import style from './FlowStatisAnalyse.module.scss';
import { DatePicker, Slider , ConfigProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import Common from "../Common";
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


export default class FlowStatisAnalyse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewer: null,
            cameraHeading: 360,
            videoPlaying: false
        }
    }

    componentDidMount() {
       let viewer = Common.CesiumInit();
        this.setState({
            viewer
        }, ()=>{
            Common.compassBind(this);
        })
    }

    componentWillUnmount() {
        this.setState({
            viewer: null
        })
    }

    disabledDate(current){
        // 不能选今天和今天之前的日期
        return current > Date.now();
    };
    videoStateChange() {
        this.setState({
            videoPlaying: !this.state.videoPlaying
        })
    }

    render() {
        return (
            <div className={style.flowStatisAnalyse}>
                <div id="cesiumContainer" className={style.fillAll}>
                    <div id="compass" className={style.compass} />
                    <div className={style.bottomBox}>
                        <div className={style.dateCon}>
                            <ConfigProvider locale={zh_CN}>
                                <RangePicker size={"default"} format={dateFormat} disabledDate={(current)=>this.disabledDate(current)}/>
                            </ConfigProvider>
                        </div>
                        <div className={style.playBox} onClick={()=>this.videoStateChange()}>
                            <i className={[style.icon, this.state.videoPlaying ? style.stop : style.play ].join(" ")}/>
                        </div>
                        <div className={style.sliderCon}>
                            <Slider defaultValue={30} tooltipVisible={false} />
                            <span className={[style.time, style.start].join(' ')}>0:00</span>
                            <span className={[style.time, style.end].join(' ')}>12:00</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}