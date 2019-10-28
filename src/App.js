import React from 'react';
import './App.css';
import Cesium from 'Cesium';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      initViewPosition:{
        lon: 121.34338888888888,
        lat: 29.259416666666668,
        height: 600.0
      },
    }
  }

  componentDidMount() {
    // todo
    // http://cesium.xin/wordpress/archives/197.html
    // https://www.cnblogs.com/webgl-angela/p/9809307.html
    // https://blog.csdn.net/Abeita/article/details/89154549

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDdhNmRjMC0yNGMxLTRlYWItYjU5Ny1jZjJjZWIyNWI2YmIiLCJpZCI6NzY2Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MDExMjI4NH0.e_LkplBoPjo_fSqLsGAb97ypotS0G5tMHJoSxLkqyUw';
    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, // 是否创建动画小器件
      timeline: false, // 是否显示时间控件
      fullscreenButton: false, // 是否显示全屏按钮
      geocoder: false, // 是否显示地名查找控件
      baseLayerPicker: true, // 是否显示图层选择控件
      vrButton: false,
      orderIndependentTranslucency: false,
      contextOptions: {
        webgl: {
          alpha: true
        }
      }
    });
    // 加载倾斜模型数据
    viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      // url: '/tileset/tileset.json',
      url: 'http://popcity.popsmart.cn:9001/data/lishui/fs_b3dm/tileset.json',
      maximumScreenSpaceError: 2,       // 最大的屏幕空间误差
      maximumNumberOfLoadedTiles: 10000,  // 最大加载瓦片个数
      // modelMatrix: m
    }));
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(this.state.initViewPosition.lon, this.state.initViewPosition.lat, this.state.initViewPosition.height),
      orientation: {
        pitch : Cesium.Math.toRadians(-40.0),
      }
    });

    // var vid = document.getElementById("trailer");
    // var polygon = viewer.entities.add({
    //   polygon : {
    //     hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
    //       116.3905818638,39.9073400924,
    //       116.3918829375,39.9073236682,
    //       116.3916863213,39.9065994805,
    //       116.3907149650,39.9065800227
    //     ])),
    //     material : vid,
    //     classificationType : Cesium.ClassificationType.BOTH
    //   }
    // });
    // viewer.camera.flyTo({
    //   destination : Cesium.Cartesian3.fromDegrees(116.3905818638, 39.9073400924, this.state.initViewPosition.height),
    //   orientation: {
    //     pitch : Cesium.Math.toRadians(-40.0),
    //   }
    // });


  }

  render() {
    return (
        <div className="App">
          <video id="trailer" style={{display: "none"}} autoPlay loop crossOrigin controls>
            <source src="video.mp4" type="video/mp4"/>
          </video>
          <div id="cesiumContainer"/>
        </div>
    )
  }

}

export default App;
