import React from 'react';
import style from './CesiumBox.module.scss';
import Cesium from "Cesium";
import EZUIKit from 'EZUIKit';
import CesiumHeatmap from 'CesiumHeatmap';

export default class CesiumBox extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {

        }
    }
    componentDidMount() {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDdhNmRjMC0yNGMxLTRlYWItYjU5Ny1jZjJjZWIyNWI2YmIiLCJpZCI6NzY2Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MDExMjI4NH0.e_LkplBoPjo_fSqLsGAb97ypotS0G5tMHJoSxLkqyUw';
        const viewer = new Cesium.Viewer("cesiumContainer", {
            animation: false, //是否显示动画控件
            shouldAnimate : true,
            homeButton: false, //是否显示Home按钮
            fullscreenButton: false, //是否显示全屏按钮
            baseLayerPicker: false , //是否显示图层选择控件
            geocoder: false, //是否显示地名查找控件
            timeline: false, //是否显示时间线控件
            sceneModePicker: false, //是否显示投影方式控件
            navigationHelpButton: false, //是否显示帮助信息控件
            infoBox: false, //是否显示点击要素之后显示的信息
            requestRenderMode: true, //启用请求渲染模式

        });
        viewer._cesiumWidget._creditContainer.style.display="none";
        viewer.scene.globe.depthTestAgainstTerrain = false;//why
        viewer.scene.logarithmicDepthBuffer = true;//why
        // 加载倾斜模型数据
        viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            // url: 'http://popcity.popsmart.cn:9001/data/lishui/fs_b3dm/tileset.json',
            url: 'http://popcity.popsmart.cn:9001/data/ningbo/yongjia-b3dm-zhuanzuobiao/b3dm/tileset.json',
            maximumScreenSpaceError: 2,       // 最大的屏幕空间误差
            maximumNumberOfLoadedTiles: 10000,  // 最大加载瓦片个数
            // modelMatrix: m
        }));

        let vid = document.getElementById("trailer");
        let myPlayer = document.getElementById('myPlayer');
        viewer.entities.add({
          polygon : {
            hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
              120.64810971671922, 28.047395097231522,
              120.6489111201922, 28.047283779306795,
              120.64885425663033, 28.046690425113862,
              120.64786502917104, 28.046710664880415,
            ])),
            material : vid,
            // material : "./test.png",
            // material : Cesium.Color.RED.withAlpha(0.5),
            clampToGround : true,
            classificationType: Cesium.ClassificationType.BOTH
          }
        });
        viewer.entities.add({
          polygon : {
            hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
              120.64849786718204, 28.047984855152823,
              120.64837678410242, 28.047514452359955,
              120.64918907016619, 28.04740797173156,
              120.64935824183732, 28.047878124184113,
            ])),
            material : myPlayer,
            clampToGround : true,
            classificationType: Cesium.ClassificationType.BOTH
          }
        });

        let player = new EZUIKit.EZUIPlayer('myPlayer');
        // 播放
        player.play();
        // 结束
        // player.stop();



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

    // add data to heatmap
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

        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(120.64810153223512, 28.047289583084336, 600),
        });


        viewer.cesiumWidget.screenSpaceEventHandler.setInputAction((e)=> {
            let position = viewer.scene.pickPosition(e.position);
            let ellipsoid = viewer.scene.globe.ellipsoid;
            let cartesian3 = new Cesium.Cartesian3(position.x, position.y, position.z);
            let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
            let lat = Cesium.Math.toDegrees(cartographic.latitude);
            let lng = Cesium.Math.toDegrees(cartographic.longitude);
            let height = cartographic.height;
            console.log(lng, lat, height)
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    render() {
        return (
            <div className={style.cesiumBox}>
                <div id="cesiumContainer" className={style.fillAll}>

                    <video id="trailer" style={{display: "block", width: "100px", height: "100px", position:"absolute", zIndex: "100",top: "100px"}} autoPlay={true} loop={true}  controls>
                      <source src="video.mp4" type="video/mp4"/>
                    </video>
                    <video
                        id="myPlayer"
                        src="https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8"
                        poster=""
                        style={{display: "block", width: "200px", height: "200px", position:"absolute", zIndex: "100", top: "200px"}}

                        controls
                        playsInline

                    >
                    </video>

                </div>
            </div>
        )
    }
}
