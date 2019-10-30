import React from 'react';
import './App.css';


import Header from "./component/Header/Header";
import LeftMenu from "./component/LeftMenu/LeftMenu";
import RightBox from "./component/RightBox/RightBox";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menuState: "列表视图"
    };
    this.menuItemClick = this.menuItemClick.bind(this);
  }

  componentDidMount() {

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
          <Header />
          <LeftMenu menuItemClick={this.menuItemClick} />
          <RightBox menuState={this.state.menuState} />
        </div>
    )
  }

}

export default App;
