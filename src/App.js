import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Dashboard from './components/dashboard';
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants'

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
      authed : firebaseAuth.currentUser != null ? true : false
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
  
  render() {
    return (
      <BrowserRouter>
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Kare</Link>
            </div>
            <ul className="nav navbar-nav pull-right">
              <li>
                <Link to="/" className="navbar-brand">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
              </li>
              <li>
                {this.state.authed
                  ? <button
                      style={{border: 'none', background: 'transparent'}}
                      onClick={() => {
                        logout()
                      }}
                      className="navbar-brand">Logout</button>
                  : <span>
                      <Link to="/login" className="navbar-brand">Login</Link>
                    </span>}
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
            <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
