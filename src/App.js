import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import { logout } from './helpers/auth';
import { firebaseAuth } from './config/constants';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      authed : firebaseAuth.currentUser != null ? true : false,
      open: false
    };
    
  }
  
  componentDidMount() {
    this.removeListener = firebaseAuth.onAuthStateChanged( (user) => {
      this.setState({
        authed: user ? true : false
      })
    })
  }
  
  componentWillUnmount () {
    this.removeListener()
  }
  
  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <AppBar 
              title="Kare Kahve" 
              onLeftIconButtonTouchTap={this.handleToggle}
              iconElementRight={
                this.state.authed
                ? <FlatButton 
                    label="Logout" 
                    onClick={() => {
                      logout()
                    }}
                  /> 
                : <FlatButton 
                    label="Login" 
                    containerElement={<Link to="/login" />}
                  /> 
              }
            />
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <MenuItem 
                onClick={this.handleClose}
                containerElement={<Link to="/dashboard" />}
                primaryText="Dashboard"
              />
              <MenuItem 
                onClick={this.handleClose}
                containerElement={<Link to="/settings" />}
                primaryText="Settings"
              />
            </Drawer>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute  authed={this.state.authed} path='/login'     component={Login} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/settings'  component={Settings} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>  
    );
  }
}

export default App;
