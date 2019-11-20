import React from "react";
import style from './PeopleFlow.module.scss';
import CesiumHeatmap from 'CesiumHeatmap';
import Common from "../Common";

export default class PeopleFlow extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        let viewer = Common.CesiumInit();
        let bounds = {
            west: 120.64984057527396,
            east: 120.6527326971618,
            south: 28.046490448003386,
            north: 28.048186125298166
        };

        let heatMap = CesiumHeatmap.create(
            viewer,
            bounds,
            {}
        );
        let data = [];
        for ( let i=0; i<1000; i++ ) {
            data.push({
                "x": 120.64984057527396 + Math.random() * 2892121887839494 * 1e-18,
                "y": 28.046490448003386 + Math.random() * 16956772947800403 * 1e-19,
                "value": Math.ceil(Math.random() * 100)
            })
        }

        let valueMin = 0;
        let valueMax = 100;

        heatMap.setWGS84Data(valueMin, valueMax, data);
        setInterval(()=>{
            data = [];
            for ( let i=0; i<1000; i++ ) {
                data.push({
                    "x": 120.64984057527396 + Math.random() * 2892121887839494 * 1e-18,
                    "y": 28.046490448003386 + Math.random() * 16956772947800403 * 1e-19,
                    "value": Math.ceil(Math.random() * 100)
                })
            }
            heatMap.setWGS84Data(valueMin, valueMax, data);
        }, 5000);
    }

    render() {
        return (
            <div className={style.peopleFlow}>
                {/*<i className={style.empty}/>*/}
                <div id="cesiumContainer" className={style.fillAll}/>
            </div>
        )
    }
}