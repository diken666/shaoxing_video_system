
import React from 'react';
import style from './FlowStatis.module.scss';

export default class FlowStatis extends React.Component {
    constructor( porps ) {
        super( porps );
        this.state = {

        }
    }
    componentDidMount() {
        document.body.style.overflowY = "auto" ;
    }

    render() {
        return (
            <div className={style.flowStatis}>
                <div className={style.tableCon}>
                    <div className={style.tableLeft}></div>
                    <div className={style.tableRight}></div>
                </div>
            </div>
        )
    }
}