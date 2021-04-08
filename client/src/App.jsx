import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { signOut, verify } from './services/authentication';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ErrorPage from './views/ErrorPage';
import TaskOwner from './views/TaskOnwer';

class App extends Component {
  state = {
    user: null,
    loaded: false,
  };

  async componentDidMount() {
    const user = await verify();
    this.handleUserChange(user);
    this.setState({ loaded: true });
  }

  handleUserChange = (user) => {
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
          <nav>
            <Link to="/">Home</Link>
            {(this.state.user && (
              <>
                <img
                  src={this.state.user.profilePicture}
                  alt={this.state.user.name}
                />
                <span>{this.state.user.name}</span>
                <Link to="/private">Private</Link>
                <button onClick={this.handleSignOut}>Sign Out</button>
              </>
            )) || (
              <>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </>
            )}
          </nav>
          <Switch>
            <Route path="/" component={Home} exact />
            <ProtectedRoute
              path="/sign-in"
              render={(props) => (
                <SignIn {...props} onUserChange={this.handleUserChange} />
              )}
              authorized={!user}
              redirect="/"
              exact
            />
            <ProtectedRoute
              path="/sign-up"
              render={(props) => (
                <SignUp {...props} onUserChange={this.handleUserChange} />
              )}
              authorized={!user}
              redirect="/"
              exact
            />
            <ProtectedRoute
              path="/taskowner/:id"
              component={TaskOwner}
              authorized={user && user.role === 'taskowner'}
              redirect="/"
              exact
            />
            <Route path="/error" component={ErrorPage} />
            <Redirect to="/error" />
          </Switch>
        </BrowserRouter>
      </HelmetProvider>
    );
  }
}

export default App;
