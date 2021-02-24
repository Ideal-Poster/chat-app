import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css'
import  { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import "./index.css";
import App from "./components/App";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase';
import rootReducer from './reducers/index';
import { setUser } from './actions';
import Spinner from './components/Spinner/Spinner';

const store = createStore(rootReducer, composeWithDevTools())

const Root = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(props);
        props.setUser(user)
        props.history.push('/')
      }
    })
  }, [])
  
  return props.isLoading ? <Spinner/> : (
      <Switch> 
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
  )
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser})(Root))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();