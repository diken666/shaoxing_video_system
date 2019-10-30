import React from 'react';
import style from './RoadCondition.module.scss'
import AMap from 'AMap';

export default class RoadCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        let map = new AMap.Map('AMapContainer', {
            resizeEnable: true,
            center: [120.57, 30.00],
            zoom: 13
        });
        //实时路况图层
        let trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10
        });
        trafficLayer.setMap(map);
    }

    render() {
        return (
            <div className={style.roadCondition}>
                <div id="AMapContainer"/>
            </div>
        )
    }
}