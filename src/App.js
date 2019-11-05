import React from 'react';
import './App.css';


import Header from "./component/Header/Header";
import ViewList from "./component/ViewList/ViewList";
import RoadCondition from "./component/RoadCondition/RoadCondition";
import FlowStatis from "./component/FlowStatis/FlowStatis";
import FlowStatisAnalyse from "./component/FlowStatisAnalyse/FlowStatisAnalyse";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        headerState: "视图列表"
    };
    this.headerItemClick = this.headerItemClick.bind(this);
  }

  componentDidMount() {

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
            <Header headerItemClick={this.headerItemClick} />
            {
                this.cptRender( this.state.headerState )
            }
        </div>
    )
  }

}

export default App;
