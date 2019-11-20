import React from 'react';
import style from './VideoList.module.scss';

export default class VideoList extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {}
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if ( this.props.currentIndex !== nextProps.currentIndex ) {
            return true
        }
        let page = this.props.currentIndex;
        let thisItems = this.props.cameraView.slice((page-1)*12, (page)*12);
        let nextItems = nextProps.cameraView.slice((page-1)*12, (page)*12);
        for ( let i=0; i<thisItems.length; i++ ) {
            if (
                thisItems[i].index  !== nextItems[i].index
                || thisItems[i].name  !== nextItems[i].name
                || thisItems[i].src  !== nextItems[i].src
                || thisItems[i].lng  !== nextItems[i].lng
                || thisItems[i].lat  !== nextItems[i].lat
            ) {
                return true
            }
        }
        return false
    }

    cameraOpt(command, index) {
        let videos = document.getElementsByClassName(style.listItemVideo);
        switch ( command ) {
            case 'play':
                videos[index].play();
                break;
            case 'stop':
            default:
                videos[index].pause();
                break;
        }
    }
    render() {
        let res = [];
        let page = this.props.currentIndex;
        let items = this.props.cameraView.slice((page-1)*12, (page)*12);
        for ( let i=0; i<items.length; i++ ) {
            let key = "key" + Math.random().toString().slice(2);
            res.push((
                <div
                    className={[style.listItem, 'listItem'].join(' ')}
                    key={key}
                    onClick={() => this.props.bigVideoShow(i, 0)}
                    onMouseEnter={()=>this.cameraOpt('play', i)}
                    onMouseLeave={()=>this.cameraOpt('pause', i)}
                >
                    <video
                        className={style.listItemVideo}
                        // autoPlay={true}
                        loop={true} src={items[i].src}
                        // poster={"./img/loading2.png"}
                    />
                    <div className={style.listItemTitle}>{items[i].name}</div>
                </div>
            ))
        }
        return (
            <div className={style.listItemCon}>
                { res }
            </div>
        );
    }
}