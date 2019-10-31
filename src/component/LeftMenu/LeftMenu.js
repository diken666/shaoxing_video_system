
import React from 'react';
import style from './LeftMenu.module.scss'

export default class LeftMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }

    itemClick(index) {
        let items = document.getElementsByClassName(style.item);
        for ( let i=0; i<items.length; i++ ) {
            i === index ? items[i].classList.add(style.menuActive) : items[i].classList.remove(style.menuActive)
        }
    }

    render() {
        return (
            <div className={style.leftMenu}>
                <div
                    className={[style.item, style.menuActive].join(" ")}
                    onClick={ () => { this.props.menuItemClick("列表视图"); this.itemClick(0) } }>
                    列表视图
                </div>
                <div
                    className={style.item}
                    onClick={ () => { this.props.menuItemClick("实时路况"); this.itemClick(1) } }>
                    实时路况
                </div>
                <div
                    className={style.item}
                    onClick={ () => { this.props.menuItemClick("实时人流量"); this.itemClick(2) } }>
                    实时人流量
                </div>
                <div
                    className={style.item}
                    onClick={ () => { this.props.menuItemClick("人流量变化分析"); this.itemClick(3) } }>
                    人流量变化分析
                </div>
                <div
                    className={style.item}
                    onClick={ () => { this.props.menuItemClick("人流量统计"); this.itemClick(4) } }>
                    人流量统计
                </div>
            </div>
        )
    }
}
