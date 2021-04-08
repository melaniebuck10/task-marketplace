import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';

import { signOut, verify } from './services/authentication';

import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ErrorPage from './views/ErrorPage';

class App extends Component {
  state = {
    user: null,
    loaded: false
  };

  async componentDidMount() {
    const user = await verify();
    this.handleUserChange(user);
    this.setState({ loaded: true });
  }

  handleUserChange = user => {
    this.setState({ user });
  };

  handleSignOut = async () => {
    await signOut();
    this.handleUserChange(null);
  };

  render() {
    const user = this.state.user;
    return (
      <HelmetProvider>
        <BrowserRouter>
          <Helmet>
            <title>Tasks - MarketPlace</title>
          </Helmet>
          <Navbar user={user} onSignOut={this.handleSignOut} />
          {this.state.loaded && (
            <Switch>
              
              <ProtectedRoute
                path="/sign-in"
                render={props => (
                  <SignIn {...props} onUserChange={this.handleUserChange} />
                )}
                authorized={!user}
                redirect="/"
                exact
              />
              <ProtectedRoute
                path="/sign-up"
                render={props => (
                  <SignUp {...props} onUserChange={this.handleUserChange} />
                )}
                authorized={!user}
                redirect="/"
                exact
              />
              <Route path="/error" component={ErrorPage} />
              <Redirect to="/error" />
            </Switch>
          )}
        </BrowserRouter>
      </HelmetProvider>
    );
  }
}

export default App;
