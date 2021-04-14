import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { signOut, verify } from './services/authentication';
import Navbar from './components/Navbar';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import IndividualProfile from './views/IndividualProfile';
import ErrorPage from './views/ErrorPage';
import TaskOwner from './views/TaskOwner';
import CreateTask from './views/CreateTask';
// import HomeBeforeAuthentication from './views/HomeBeforeAuthentication';
// import TaskOwner from './views/TaskOwner';
// import TaskList from './components/TaskList';
import SingleTask from './views/SingleTask';
import Messenger from './views/Messenger';
import HomeBeforeAuthentication from './views/HomeBeforeAuthentication';

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
          <Navbar user={user} onSignOut={this.handleSignOut} />
          {this.state.loaded && (
            <Switch>
              <Route path="/" component={HomeBeforeAuthentication} exact />
              <ProtectedRoute
                path="/sign-in"
                render={(props) => (
                  <SignIn {...props} onUserChange={this.handleUserChange} />
                )}
                authorized={!user}
                redirect="/home"
                exact
              />
              <ProtectedRoute
                path="/sign-up"
                render={(props) => (
                  <SignUp {...props} onUserChange={this.handleUserChange} />
                )}
                authorized={!user}
                redirect="/home"
                exact
              />
              <ProtectedRoute
                path="/task/create"
                component={CreateTask}
                authorized={user && user.role === 'taskowner'}
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/task/:id"
                component={SingleTask}
                authorized={user}
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/individual/:id"
                authorized={user}
                component={IndividualProfile}
                exact
              />
              <ProtectedRoute
                path="/home"
                component={Home}
                authorized={user}
                redirect="/"
                exact
              />

              <ProtectedRoute
                path="/taskowner/:id"
                component={TaskOwner}
                authorized={user}
                exact
              />
              <Route path="/messenger" component={Messenger} exact />
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
