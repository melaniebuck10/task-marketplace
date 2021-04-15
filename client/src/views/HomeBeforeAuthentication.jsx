import React, { Component } from 'react';
import TaskList from '../components/TaskList';
import { listTasks } from './../services/task';

class HomeBeforeAuthentication extends Component {
  state = {
    tasks: []
  };

  async componentDidMount() {
    const tasks = await listTasks();
    this.setState({ tasks: tasks });
  }

  render() {
    const { tasks } = this.state;
    return (
      <main>
        <h1>Welcome there</h1>
        <TaskList tasks={tasks} />
      </main>
    );
  }
}

export default HomeBeforeAuthentication;
