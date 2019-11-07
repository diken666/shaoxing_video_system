
import React from 'react';
import style from './FlowStatis.module.scss';
import echarts from 'echarts';
import { Table } from 'antd'

import options from './options'

const { Column } = Table;

export default class FlowStatis extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            data: [
                    {
                        key: '1',
                        place: '地点1',
                        nowFlow: 1111,
                        todayFlow: 11,
                        status: 0
                    },
                    {
                        key: '2',
                        place: '地点2',
                        nowFlow: 2222,
                        todayFlow: 22,
                        status: 1
                    },
                    {
                        key: '3',
                        place: '地点3',
                        nowFlow: 333,
                        todayFlow: 33,
                        status: 0

                    },
                    {
                        key: '4',
                        place: '地点4',
                        nowFlow: 444,
                        todayFlow: 44,
                        status: 0

                    },
                    {
                    key: '5',
                    place: '地点5',
                    nowFlow: 555,
                    todayFlow: 55,
                    status: 0
                },
                {
                    key: '6',
                    place: '地点6',
                    nowFlow: 666,
                    todayFlow: 66,
                    status: 0

                },
            ]
        }
    }
    componentDidMount() {

        let leftTable = echarts.init(document.getElementById('leftTable'));
        leftTable.setOption(options.leftTable);

        let bottomTable = echarts.init(document.getElementById('bottomTable'));
        bottomTable.setOption(options.bottomTable);

        window.addEventListener("resize", () => {
            bottomTable.resize();
            leftTable.resize();
        });

    }

    statusBoxRender(status){
        let color = null;
        let text = null;
        switch (status) {
            case 0:
                color = style.green;
                text = "正常";
                break;
            case 1 :
                color = style.red;
                text = "超负荷";
                break;
            default :
                color = style.green;
                text = "异常";
                break;
        }
        return {
            text,
            color
        }

    }

    render() {
        return (
            <div className={style.flowStatis}>
                <div className={style.tableCon}>
                    <div className={[style.smallTable, style.left].join(" ")}>
                        <div className={style.title}>
                            <i className={[style.icon, style.pointMap].join(" ")}/>
                            实时流量
                        </div>
                        <div id="leftTable" className={style.ctx} />
                    </div>
                    <div className={[style.smallTable, style.right].join(" ")}>
                        <div className={style.title}>
                            <i className={[style.icon, style.layout].join(" ")}/>
                            流量报表
                        </div>
                        <div id="rightTable" className={[style.ctx, style.ctxPadding].join(" ")} >
                            <Table dataSource={this.state.data} pagination={false}>
                                <Column title="序号" dataIndex="key" key="key" />
                                <Column title="地点" dataIndex="place" key="place" />
                                <Column title="当前流量" dataIndex="nowFlow" key="nowFlow" />
                                <Column title="今日流量" dataIndex="todayFlow" key="todayFlow" />
                                <Column
                                    title="运行状态"
                                    dataIndex="status"
                                    key="status"
                                    render={(status) => {
                                        let color = this.statusBoxRender(status).color;
                                        let text = this.statusBoxRender(status).text;
                                        return (
                                            <div className={style.statusBox}>
                                                <i className={color}/>
                                                {text}
                                            </div>
                                        )
                                    }}
                                />
                            </Table>
                        </div>
                    </div>
                </div>
                <div className={style.ctnBox}>
                    <div className={style.bgBox}>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera1].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera2].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera3].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera4].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera5].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera6].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera7].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera8].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                        <div className={style.item}>
                            <i className={[style.cameraIcon, style.camera9].join(" ")} />
                            <div className={style.cameraTitle}>鲁迅纪念馆</div>
                            <div className={style.cameraCtx}>10000</div>
                        </div>
                    </div>
                    <div className={style.bigTable}>
                        <div className={style.title}>
                            <i className={[style.icon, style.lineChart].join(" ")}/>
                            实时流量
                        </div>
                        <div id="bottomTable" className={style.bottomTable}/>
                    </div>
                </div>
            </div>
        )
    }
}