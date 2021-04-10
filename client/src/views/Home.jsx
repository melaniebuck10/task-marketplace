import React, { Component } from 'react';
import TaskList from '../components/TaskList';

class Home extends Component {
  state = {
    tasks: [],
  };
  render() {
    return (
      <div>
        <h1>Welcome to your favorite Tasks Marketplace</h1>
        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}

export default Home;
