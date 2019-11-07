import React from "react";
import style from './PeopleFlow.module.scss';

export default class PeopleFlow extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className={style.peopleFlow}>
                <i className={style.empty}/>
            </div>
        )
    }
}