import React from 'react';
import './App.css';


import Header from "./component/Header/Header";
import ViewList from "./component/ViewList/ViewList";
import RoadCondition from "./component/RoadCondition/RoadCondition";
import FlowStatis from "./component/FlowStatis/FlowStatis";
import FlowStatisAnalyse from "./component/FlowStatisAnalyse/FlowStatisAnalyse";
import PeopleFlow from "./component/PeopleFlow/PeopleFlow";
import axios from 'axios';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        headerState: "视图列表",
        username: '',
        loginPage: 'http://popcity.popsmart.cn:9038/',
        // loginPage: 'http://192.168.31.3:8001/',
        getUserState: 'http://popcity.popsmart.cn:9038/api/auth/getUserInfo'
        // getUserState: 'http://192.168.31.3:8001/api/auth/getUserInfo'
    };
    this.headerItemClick = this.headerItemClick.bind(this);
  }

  componentDidMount() {

    let code = this.getQueryVariable('code');

    this.userStateInit(code).then()

  }

    getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] === variable){
                return pair[1];
            }
        }
        return false;
    }

    async userStateInit(code) {
      // let cookie = this.getCookie('token');
      // let username = this.getCookie('username');
      // if ( cookie && username ) {
      //     this.setState({
      //         username
      //     })
      // } else if (code) {
      //     let res = await this.getUserState(code);
      //     if ( res.data.status ) {
      //         this.setState({
      //             username: res.data.data.username
      //         }, ()=>{
      //             this.setCookie('token', code);
      //             this.setCookie('username', res.data.data.username);
      //         })
      //     } else {
      //         window.location.href = this.state.loginPage;
      //     }
      // } else {
      //     window.location.href = this.state.loginPage;
      // }
    }

    async getUserState(code) {
        return  axios.post(this.state.getUserState, {}, {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                'code':code
            }
        })
  }

    setCookie(name,value) {
        let hours = 1;
        let exp = new Date();
        exp.setTime(exp.getTime() + hours*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }

    getCookie(name) {
        let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        arr = document.cookie.match(reg);
        if( arr ) {
            return unescape(arr[2]);
        }
        else {
            return null;
        }
    }

    headerItemClick(state) {
      this.setState({
          headerState: state
      }, ()=>{
          console.log(this.state.headerState);
      })
  }



  cptRender(state) {
      switch ( state ) {
          case '视图列表':
              return <ViewList />;
          case '实时路况':
              return <RoadCondition />;
          case '实时人流量':
              return <PeopleFlow />;
          case '人流量变化分析':
              return <FlowStatisAnalyse/>;
          case '人流量统计':
              return <FlowStatis />;
          default:
              return <ViewList />;

      }
  }

  render() {
    return (
        <div className="App">
            <Header headerItemClick={this.headerItemClick} username={this.state.username} />
            {
                this.cptRender( this.state.headerState )
            }

        </div>
    )
  }

}

export default App;
