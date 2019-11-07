import Cesium from "Cesium";

export default class Common {
    static compassBind(that){
        let compass = document.getElementById('compass');
        let viewer = that.state.viewer;
        if ( compass ) {
            // 指南针监控和调整
            viewer.scene.postRender.addEventListener(()=>{
                if(that.state.cameraHeading !== viewer.camera.heading){
                    let compass = document.getElementById('compass');
                    let degrees = Cesium.Math.toDegrees(viewer.camera.heading);
                    that.setState({
                        cameraHeading: viewer.camera.heading
                    }, ()=>{
                        compass.style.transform = `rotate(${360 - degrees}deg)`;
                    })
                }
            });
            compass.addEventListener('click', ()=>{
                that.setState({
                    cameraHeading: 360
                }, ()=>{
                    // let heading = viewer.camera.heading;
                    let roll = viewer.camera.roll;
                    let pitch = viewer.camera.pitch;
                    let position = viewer.camera.position;
                    viewer.camera.flyTo({
                        destination: position,
                        orientation: {
                            heading: Cesium.Math.toRadians(360),
                            roll,
                            pitch
                        }
                    })
                })
            })
        }
    }

    static CesiumInit() {
        // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzllZDg3OS1hMzQyLTRkNjMtOGFiMC01Y2Q5NWNkYTFjMDUiLCJpZCI6MTQ5NjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzMwMDY2ODF9.EZTxd1CrxqNMb_pU-x0hsT_t0XR4ck0QCMW6L3lLhJw';
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
        viewer.scene.globe.depthTestAgainstTerrain = false;
        viewer.scene.logarithmicDepthBuffer = true;
        // 加载倾斜模型数据
        viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: 'http://popcity.popsmart.cn:9001/data/ningbo/yongjia-b3dm-zhuanzuobiao/b3dm/tileset.json',
            maximumScreenSpaceError: 2,       // 最大的屏幕空间误差
            maximumNumberOfLoadedTiles: 10000,  // 最大加载瓦片个数
        }));

        viewer.camera.setView({
            destination : Cesium.Cartesian3.fromDegrees(120.64810153223512, 28.047289583084336, 600),
        });
        return viewer;
    }
}