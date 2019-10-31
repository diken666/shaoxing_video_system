import React from 'react';
import './App.css';


import Header from "./component/Header/Header";
import LeftMenu from "./component/LeftMenu/LeftMenu";
import RightBox from "./component/RightBox/RightBox";
import ViewList from "./component/ViewList/ViewList";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        menuState: "列表视图",
        headerState: "视图列表"
    };
    this.menuItemClick = this.menuItemClick.bind(this);
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

  menuItemClick(state) {
      this.setState({
          menuState: state
      }, ()=>{
          console.log(this.state.menuState)
      })
  }

  render() {
    return (
        <div className="App">
          <Header headerItemClick={this.headerItemClick} />
          {/*<LeftMenu menuItemClick={this.menuItemClick} />*/}
          {/*<RightBox menuState={this.state.menuState} />*/}
          <ViewList />
        </div>
    )
  }

}

export default App;
