import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 8;
  apiKey = process.env.REACT_APP_NEWSPAPER_API;
  state = {
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
          color='#1a00ab'
          height={5}
          progress={this.state.progress}/>
          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pgSize={this.pageSize} country="in" category="general"/></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pgSize={this.pageSize} country="in" category="business"/></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pgSize={this.pageSize} country="in" category="entertainment"/></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pgSize={this.pageSize} country="in" category="health"/></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pgSize={this.pageSize} country="in" category="science"/></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pgSize={this.pageSize} country="in" category="sports"/></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pgSize={this.pageSize} country="in" category="technology"/></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
