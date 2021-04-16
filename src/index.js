import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import firebase from 'firebase/app';
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import rootReducer from './reducers/index';
import { setUser } from './actions'

const store = createStore(rootReducer, composeWithDevTools())
class Root extends React.Component  {

  componentDidMount() {
    // redirect to homepage if logged in
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(user); 
        this.props.setUser(user)
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

const RootWithAuth = withRouter(connect(null, { setUser })(Root))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithAuth/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
