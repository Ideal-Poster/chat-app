import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import firebase from 'firebase/app';
class Root extends React.Component  {

  componentDidMount() {
    // redirect to homepage if logged in
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    return(
      <Switch>
        <Route exact path="/"  component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    )
  }
}

const RootWithAuth = withRouter(Root)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RootWithAuth/>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
