import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import ProtectedRoute from './components/ProtectedRoute';
//import TaskList from './components/TaskList';
import Navbar from './components/Navbar';

import { signOut, verify } from './services/authentication';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import IndividualProfile from './views/IndividualProfile';
import ErrorPage from './views/ErrorPage';
import TaskOwner from './views/TaskOwner';
import CreateTask from './views/CreateTask';
import IndividualApplicationList from './views/IndividualApplicationList';
import SingleTask from './views/SingleTask';
import TaskOwnerList from './views/TaskOwnerList';
import Messenger from './views/Messenger';
import HomeBeforeAuthentication from './views/HomeBeforeAuthentication';
import ApprovedApplication from './views/ApprovedApplication';
import CreateReview from './components/CreateReview';
import ReviewList from './components/ReviewList';

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
                render={(props) => <SingleTask {...props} user={user} />}
                authorized={user}
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/individual/:id"
                authorized={user}
                render={(props) => (
                  <IndividualProfile
                    {...props}
                    user={this.state.user}
                    onUserChange={this.handleUserChange}
                  />
                )}
                redirect="/"
                exact
              />
              <ProtectedRoute
                path="/rating/create"
                authorized={user && user.role === 'taskowner'}
                render={(props) => (
                  <CreateReview
                    {...props}
                    user={this.state.user}
                    onUserChange={this.handleUserChange}
                  />
                )} 
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/task/:id/approvedtask"
                render={(props) => (
                  <ApprovedApplication {...props} user={user} />
                )}
                authorized={user}
              />

              <ProtectedRoute
                path="/individual/:id/myapplications"
                render={(props) => (
                  <IndividualApplicationList {...props} user={user} />
                )}
                authorized={user}
                exact
              />
              <ProtectedRoute
                path="/home"
                render={(props) => <Home {...props} user={user} />}
                authorized={user}
                redirect="/"
                exact
              />
              <ProtectedRoute
                path="/taskowner/:id"
                render={(props) => (
                  <TaskOwner
                    {...props}
                    user={this.state.user}
                    onUserChange={this.handleUserChange}
                  />
                )}
                authorized={user && user.role === 'taskowner'}
                redirect="/"
                exact
              />
              <ProtectedRoute
                path="/taskowner/:id/list"
                component={TaskOwnerList}
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
