import React from 'react';
import style from './ViewList.module.scss';
import Cesium from "Cesium";
// import EZUIKit from 'EZUIKit';

import WeatherBox from "../WeatherBox/WeatherBox";
import Common from "../Common";
import VideoList from '../VideoList/VideoList'

import { Pagination } from 'antd';


export default class ViewList extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            viewer: null,
            viewState: 1,
            singleVideoIndex: 0,
            singleVideoState: false,
            singleVideoSrc: '',
            cameraHeading: 360,
            currentIndex: 1,
            cameraView: [
                {
                    index: 0,
                    name: "监控点1",
                    src: "./video.mp4",
                    lng: 120.64773900225869,
                    lat: 28.049490084778057
                },{
                    index: 1,
                    name: "监控点2",
                    src: "./video.mp4",
                    lng: 120.65141623512831,
                    lat: 28.048846773243984
                },{
                    index: 2,
                    name: "监控点3",
                    src: "./video.mp4",
                    lng: 120.6516625943282,
                    lat: 28.046151969494304
                },{
                    index: 3,
                    name: "监控点4",
                    src: "./video.mp4",
                    lng: 120.64675182300502,
                    lat: 28.046597917280607
                },{
                    index: 4,
                    name: "监控点5",
                    src: "./video.mp4",
                    lng: 120.64913931135611,
                    lat: 28.046285125596253
                },{
                    index: 5,
                    name: "监控点6",
                    src: "./video.mp4",
                    lng: 120.64330747546732,
                    lat: 28.047986457084388
                },{
                    index: 6,
                    name: "监控点7",
                    src: "./video.mp4",
                    lng: 120.64455616051423,
                    lat: 28.049843068493757
                },{
                    index: 7,
                    name: "监控点8",
                    src: "./video.mp4",
                    lng: 120.64590283623939,
                    lat: 28.049410577215916
                },{
                    index: 8,
                    name: "监控点9",
                    src: "./video.mp4",
                    lng: 120.64551002673497,
                    lat: 28.04612312352012
                },{
                    index: 9,
                    name: "监控点10",
                    src: "./video.mp4",
                    lng: 120.65364470233307,
                    lat: 28.047471962781533
                },{
                    index: 10,
                    name: "监控点11",
                    src: "./video.mp4",
                    lng: 120.65018823731569,
                    lat: 28.045116986008136
                },{
                    index: 11,
                    name: "监控点12",
                    src: "./video.mp4",
                    lng: 120.64762228822202,
                    lat: 28.043645319655162
                },{
                    index: 12,
                    name: "监控点13",
                    src: "./video.mp4",
                    lng: 120.6437125752373,
                    lat: 28.044090980019956
                }

            ],
            searchView: []
        };
        this.bigVideoShow = this.bigVideoShow.bind(this);
        this.hideBigVideoShow = this.hideBigVideoShow.bind(this);
    }

    componentWillUnmount() {

        this.setState({
            viewer: null
        })
    }

    componentDidMount() {
        this.setState({
            searchView: [...this.state.cameraView]
        });
        let viewer = Common.CesiumInit();
        viewer.camera.setView({
            destination : Cesium.Cartesian3.fromDegrees(120.64799245639196, 28.043834361592527, 300),
        });

        let vid = document.getElementById("myPlay");
        vid.play();

        // var position = Cesium.Cartesian3.fromDegrees(-75, 40);
        //
        // var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        //     position,
        //     Cesium.Math.toRadians(0.0),
        //     Cesium.Math.toRadians(0.0),
        //     Cesium.Math.toRadians(90.0)
        // );

        let a = viewer.entities.add({
            polygon : {
                hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
                    120.64778709114539, 28.043759594298944,
                    120.64813762335626, 28.043759594298944,
                    120.64813762335626, 28.044004857041912,
                    120.64778709114539, 28.044004857041912,
                ])),
                heading: Cesium.Math.toRadians(90.0),
                material : vid,
                roll: Cesium.Math.toRadians(180),
                clampToGround : true,
                classificationType: Cesium.ClassificationType.BOTH
            }
        });
        console.log(a)


        // todo 使用时这里解除注释
        // let vid = document.getElementById("myPlay");
        // let player = new EZUIKit.EZUIPlayer("myPlay");
        // // 播放
        // player.play();
        // viewer.entities.add({
        //     polygon : {
        //         hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
        //             120.64810971671922, 28.047395097231522,
        //             120.6489111201922, 28.047283779306795,
        //             120.64885425663033, 28.046690425113862,
        //             120.64786502917104, 28.046710664880415,
        //         ])),
        //         material : vid,
        //         // material : "./test.png",
        //         // material : Cesium.Color.RED.withAlpha(0.5),
        //         clampToGround : true,
        //         classificationType: Cesium.ClassificationType.BOTH
        //     }
        // });



        viewer.cesiumWidget.screenSpaceEventHandler.setInputAction((e)=> {
            // let position = viewer.scene.pickPosition(e.position);
            // let ellipsoid = viewer.scene.globe.ellipsoid;
            // let cartesian3 = new Cesium.Cartesian3(position.x, position.y, position.z);
            // let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
            // let lat = Cesium.Math.toDegrees(cartographic.latitude);
            // let lng = Cesium.Math.toDegrees(cartographic.longitude);
            // let height = cartographic.height;
            // console.log(lng, lat, height);
            this.billboardBind(e.position);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this.setState({
            viewer
        }, ()=>{
            this.cameraBillboard(viewer, this.state.cameraView);
            Common.compassBind(this);
        })
    }


    videoClose() {
        this.setState({
            singleVideoState: false
        })
    }

    itemClick(index) {
        let items = document.getElementsByClassName(style.item);
        let realIndex = parseInt(items[index].getAttribute('data-index'));
        for ( let i=0; i<items.length; i++ ) {
            i === index ? items[i].classList.add(style.active) : items[i].classList.remove(style.active);
        }
        this.setState({
            singleVideoState: false,
            singleVideoIndex: realIndex
        }, ()=>{
            switch (this.state.viewState) {
                case 0:
                    this.bigVideoShow(realIndex, 1);
                    break;
                case 1:
                    this.flyTo(this.state.viewer, this.state.cameraView[realIndex]);
                    break;
                default :
                    break;
            }
        });
    }

    searchKeyUp() {
        let searchVal = document.getElementById('searchInput').value;
        let cameraList = [...this.state.cameraView];
        let tempList = [];
        for ( let item of cameraList ) {
            if ( item.name.indexOf(searchVal) >= 0 ) {
                tempList.push(item)
            }
        }

        this.hideBigVideoShow();

        this.setState({
            searchView: tempList
        })
    }

    addVideoToEarth(player) {
        let index = this.state.singleVideoIndex;
        let lng = this.state.cameraView[index].lng;
        let lat = this.state.cameraView[index].lat;
        this.state.viewer.entities.add({
            polygon : {
                hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
                    lng - 0.0004, lat + 0.0002,
                    lng + 0.0004, lat + 0.0002,
                    lng + 0.0004, lat - 0.0002,
                    lng - 0.0004, lat - 0.0002
                ])),
                material : player,
                clampToGround : true,
                classificationType: Cesium.ClassificationType.BOTH
            }
        });


    }
    cameraVideoRender(isShow, src, index) {
        if ( !isShow ) {
            return null;
        }
        let top = document.body.clientHeight / 2 - 80;
        let left = document.body.clientWidth / 2;
        return (
            <div id="videoCon"
                 className={style.videoCon}
                 style={{top: `${top}px`, left: `${left}px`}}
                 onMouseDown={(e)=>this.videoConDragAble(e)}
            >
                <div className={style.closeIcon} onClick={() => this.videoClose()}>
                    <i className={style.closeIconInside}/>
                </div>
                <i className={style.loading}/>
                <video
                    id="myPlayer"
                    src={src}
                    poster=""
                    className={style.singleVideoShow}
                    autoPlay={true} loop={true}
                    playsInline
                >
                </video>
                <span className={style.singleVideoTitle}>{this.state.cameraView[index].name}</span>
            </div>
        )
    }

    cameraBillboard(viewer, list) {
        let ellipsoid = viewer.scene.globe.ellipsoid;
        for ( let item of list ) {
           let entity =  viewer.entities.add({
                position : Cesium.Cartesian3.fromDegrees(item.lng, item.lat, 35, ellipsoid),
                billboard : {
                    image : './img/poi.png',
                    width : 64,
                    height : 64
                },
            });
            entity.index = item.index;
        }
    }
    billboardBind(position) {
        let pickFeature = this.state.viewer.scene.pick(position);
        this.setState({
            singleVideoState: false
        }, ()=> {
            if ( Cesium.defined(pickFeature) ) {
                if ( pickFeature.id && (typeof pickFeature.id.index === 'number' )) {
                    let index = pickFeature.id.index;
                    let left = window.event.clientX || 0;
                    let top = window.event.clientY || 0;
                    this.setState({
                        singleVideoIndex: index,
                        singleVideoState: true,
                        singleVideoSrc: this.state.cameraView[index].src
                    }, ()=>{
                        // setTimeout(()=>{
                            let videoCon = document.getElementById('videoCon');
                            videoCon.style.margin = "0";
                            videoCon.style.top = `${top-280}px`;
                            videoCon.style.left = `${left-200}px`;
                        // })
                    });
                }
            }
        });

    }
    flyTo(viewer, item) {
        let that = this;
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(item.lng, item.lat, 100),
            complete() {
                that.setState({
                    singleVideoState: true,
                    singleVideoSrc: item.src
                })
            }
        })
    }

    videoConDragAble(e) {
        let videoCon = document.getElementById('videoCon');
        let x = 0, y = 0;
        e = e || window.event; //要用event这个对象来获取鼠标的位置
        x = e.clientX - videoCon.offsetLeft;
        y = e.clientY - videoCon.offsetTop;
        document.onmousemove = function(e) {
            //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
            if(videoCon) {
                e = e || window.event;
                let moveX = e.clientX - x; //得到距离左边移动距离                    　　
                let moveY = e.clientY - y; //得到距离上边移动距离
                let maxX = document.documentElement.clientWidth - videoCon.offsetWidth;
                let maxY = document.documentElement.clientHeight - videoCon.offsetHeight;
                moveY = Math.min(maxY, Math.max(0,moveY));
                moveX = Math.min(maxX, Math.max(0,moveX));
                videoCon.style.margin = "0";
                videoCon.style.left = moveX + "px";
                videoCon.style.top = moveY + "px";
            }
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    viewBarClick(index) {
        let left = document.getElementsByClassName(style.left)[0];
        let right = document.getElementsByClassName(style.right)[0];
        let cesiumContainer = document.getElementById('cesiumContainer');
        let listView = document.getElementById('listView');
        switch ( index ) {
            case 0:
                left.classList.add(style.barActive);
                right.classList.remove(style.barActive);
                cesiumContainer.style.zIndex = '1';
                listView.style.zIndex = '10';
                break;
            case 1:
                right.classList.add(style.barActive);
                left.classList.remove(style.barActive);
                listView.style.zIndex = '1';
                cesiumContainer.style.zIndex = '10';
                this.hideBigVideoShow();
                break;
            default:
                break;
        }

        this.setState({
            viewState: index
        })
    }

    // cameraOpt(command, index) {
    //     let videos = document.getElementsByClassName(style.listItemVideo);
    //     switch ( command ) {
    //         case 'play':
    //             videos[index].play();
    //             break;
    //         case 'stop':
    //         default:
    //             videos[index].pause();
    //             break;
    //     }
    // }

    bigVideoShow(index, status, itemsClassName) {
        document.getElementById('btnBack').style.display = "block";
        document.getElementById('paginationCon').style.display = 'none';
        let src = '', title = '';
        switch (status) {
            case 0:
                src = this.state.cameraView[(this.state.currentIndex-1)*12+index].src;
                title = this.state.cameraView[(this.state.currentIndex-1)*12+index].name;
                break;
            case 1:
            default:
                src = this.state.cameraView[index].src;
                title = this.state.cameraView[index].name;
                break;
        }
        let items = document.getElementsByClassName('listItem');
        for ( let item of items ) {
            item.style.display = "none";
        }
        document.getElementById('bigVideoShow').setAttribute('src', src);
        document.getElementById('bigVideoTitle').innerText = title;
        document.getElementById('bigViewShowCon').style.display = "block";
        document.getElementById('bigVideoShow').play();
    }
    hideBigVideoShow() {
        document.getElementById('btnBack').style.display = "none";
        document.getElementById('paginationCon').style.display = 'block';
        let items = document.getElementsByClassName('listItem');
        for ( let item of items ) {
            item.style.display = "inline-block";
        }
        document.getElementById('bigViewShowCon').style.display = "none";
        document.getElementById('bigVideoShow').pause();
    }
    paginationChange(page){
        this.setState({
            currentIndex: page
        });
    }
    paginationRender(current, type, originalElement) {
        if (type === 'prev') {
            return <span className={style.pagination}>上一页</span>;
        }
        if (type === 'next') {
            return <span className={style.pagination}>下一页</span>;
        }
        return originalElement;
    }
    inputAutoFocus() {
        let input = document.getElementById('searchInput');
        input.focus();
    }

    render() {
        return (
            <div className={style.viewList}>
                <div className={style.viewBar}>
                    <div className={style.left} onClick={ () => this.viewBarClick(0) }>列表视图</div>
                    <div className={[style.right, style.barActive].join(" ")} onClick={ ()=> this.viewBarClick(1) }>地图视图</div>
                </div>
                <div id="cesiumContainer" className={style.fillAll}>
                    {/*<video id="myPlay"*/}
                    {/*       className={style.video}*/}
                    {/*       autoPlay={true} loop={true} controls>*/}
                    {/*    <source src="https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8" type="video/mp4"/>*/}
                    {/*</video>*/}
                    <video id="myPlay"
                           className={style.video}
                           autoPlay={true} loop={true} controls muted
                           // style={{transform: "rotate(30deg)"}}
                    >
                        <source src="./road3.mp4" type="video/mp4"/>
                    </video>
                    {
                        this.cameraVideoRender(this.state.singleVideoState, this.state.singleVideoSrc, this.state.singleVideoIndex )
                    }
                    <div id="compass" className={style.compass} />
                </div>
                <div id="listView" className={style.listView}>
                    <div id="btnBack" className={style.btnBack} onClick={ () => this.hideBigVideoShow() }>返回</div>
                    <VideoList currentIndex={this.state.currentIndex} cameraView={this.state.cameraView} bigVideoShow={this.bigVideoShow}/>
                    <div id="bigViewShowCon" className={style.bigViewShowCon}>
                        <video id="bigVideoShow" className={style.bigViewShow} src="" loop={true} />
                        <div id="bigVideoTitle" className={style.listItemTitle}/>
                    </div>
                    <div id="paginationCon" className={style.paginationCon}>
                        <Pagination
                            total={this.state.cameraView.length}
                            itemRender={this.paginationRender}
                            pageSize={12}
                            onChange={(page)=>this.paginationChange(page)}
                        />
                    </div>
                </div>
                <div className={style.leftBox}>
                    <div className={style.title}>
                        <span>
                            监控列表
                        </span>
                    </div>
                    <div className={style.searchBox}>
                        <div className={style.searchIconCon} onMouseEnter={()=>this.inputAutoFocus()}>
                            <i className={style.searchIcon}/>
                        </div>
                        <div className={style.searchCtx}>
                            <input type="text" autoFocus={true}
                               id="searchInput" autoComplete="off"
                               onKeyUp={() => {
                                   this.searchKeyUp()
                               }}
                            />
                        </div>
                    </div>
                    <div className={style.itemCon}>
                        {
                            this.state.searchView.map((item, index) => {
                                let key = Math.random();
                                return (
                                    <div
                                        data-index={item.index}
                                        className={style.item}
                                        key={key}
                                        onClick={ () => {
                                            this.itemClick(index);
                                        } }
                                        title={item.name}
                                    >
                                        <i className={style.icon}/>
                                        <span className={style.ctx}>{item.name}</span>
                                        <i className={style.leftLine}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <WeatherBox />
                </div>
            </div>
        )
    }
}