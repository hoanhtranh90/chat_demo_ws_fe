import React,{useEffect} from 'react';
import Slidebar from './components/slidebar/slideBar'
import IContent from './components/content/Index.js'
import Navb from './components/Navbar'
import './App.css';
import { connect } from "react-redux";

import axios from 'axios'

import Login from './components/Login/Login'
import Register from './components/Login/Register'
import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";

function App(props) {
   useEffect(() => {
		if(localStorage.getItem('token')!=null){
			let url = 'https://quiz-demo-eng.herokuapp.com/user/' + localStorage.getItem('id')
			axios.get(url)
			.then(res => {
				// console.log(res.data)
				props.refresh(res.data)})
		}
	  });
  return (
    <BrowserRouter>
     

    <div className="App">

        <div className="Bar">
      <Slidebar></Slidebar>

        </div>
        
        <div className="content">
          <div>
      <Navb></Navb>
      <Switch>
            <Route path="/register" component ={Register} />
            <Route path="/login" component ={Login} />
            <Route path="/" component ={IContent} />
      </Switch>
      </div>
        </div>
    </div>
    
    </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      refresh: info => {
          dispatch({
              type:"AUTH_REFRESH",
              payload:info
          })
      }
  }
}
export default connect(null, mapDispatchToProps)(App);
