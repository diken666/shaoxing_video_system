import React from 'react';
import style from './RightBox.module.scss'


import RoadCondition from "../RoadCondition/RoadCondition";
import CesiumBox from "../CesiumBox/CesiumBox";

export default class RightBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }

    boxRender(state) {
        switch (state) {
            case "列表视图":
                return <CesiumBox /> ;
            case "实时路况":
                return  <RoadCondition />;
            case "实时人流量":
                return null;
            case "人流量变化分析":
                return null;
            case "人流量统计":
                return null;
            default:
                return null;
        }
    }

    render() {
        return (
            <div className={style.rightBox}>
                {
                     this.boxRender(this.props.menuState)
                }
            </div>
        )
    }
}