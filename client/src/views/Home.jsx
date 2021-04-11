import React, { Component } from 'react';
import TaskList from '../components/TaskList';
import { listTasks } from './../services/task';
class Home extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
    const tasks = await listTasks();
    this.setState({ tasks: tasks });
  }
  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h1>Welcome to your favorite Tasks Marketplace</h1>
        {/* <TaskList tasks={this.state.tasks} /> */}
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

export default Home;
