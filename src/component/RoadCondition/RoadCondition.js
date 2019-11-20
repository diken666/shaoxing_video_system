import React from 'react';
import style from './RoadCondition.module.scss'
import Cesium from 'Cesium';
import Common from "../Common";
import axios from 'axios'

export default class RoadCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewer: null,
            cameraHeading: 360,
            picUrl: "/pic/savepic",
            entityId: "",
            update: true
        }
    }

   componentDidMount() {
        let viewer = Common.CesiumInit();
        viewer.cesiumWidget.screenSpaceEventHandler.setInputAction((e)=> {
            let position = viewer.scene.pickPosition(e.position);
            let ellipsoid = viewer.scene.globe.ellipsoid;
            let cartesian3 = new Cesium.Cartesian3(position.x, position.y, position.z);
            let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
            let lat = Cesium.Math.toDegrees(cartographic.latitude);
            let lng = Cesium.Math.toDegrees(cartographic.longitude);
            let height = cartographic.height;
            console.log(lng, lat, height);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

       this.setState({
           viewer
       }, ()=>{
           Common.compassBind(this);
           this.addRoadPic(viewer).then(()=>{
           //     this.roadUpdate(viewer, this.state.entityId).then()
           });
       });

    }

    async roadUpdate(viewer, id) {
        while(this.state.update) {
            await this.updateInfo(viewer, id);
        }
    }

    updateInfo(viewer, id) {
        this.removeEntity(viewer, id);
        this.addRoadPic(viewer).then();
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log(Math.random());
                resolve();
            }, 1000)
        })
    }

    removeEntity(viewer, id){
        viewer = viewer.entities.removeById(id);
        this.setState({
            viewer,
            entityId: ""
        })
    }

    getRoadPicUrl(url){
        return axios.get(url);
    }

    async addRoadPic(viewer) {
        // let url = ( await this.getRoadPicUrl(this.state.picUrl) ).data.url;
        // console.log(viewer);
        let entity = viewer.entities.add({
            polygon : {
                hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
                    120.60393,28.02867,
                    120.60393,28.08218,
                    120.76111,28.08218,
                    120.76111,28.02867
                ])),
                // material : url,
                material : './map.png',
                clampToGround : true,
                classificationType: Cesium.ClassificationType.BOTH
            }
        });
        this.setState({
            viewer,
            entityId: entity.id
        });
    }

    render() {
        return (
            <div className={style.roadCondition}>
                <div id="cesiumContainer" className={style.fillAll}>
                    <div id="compass" className={style.compass} />
                </div>
            </div>
        )
    }
}