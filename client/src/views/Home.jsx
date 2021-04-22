import React, { Component } from 'react';
import TaskList from '../components/TaskList';
import { listTasks } from './../services/task';
//import { loadTaskOwner } from '../services/taskownerInfo';
// import Task from '../components/Task';

class Home extends Component {
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
        <div className="homepage">
        <h1>#GetStuffDone - a marketplace to share common work</h1>
        <h3>Check out all the open tasks and get started!</h3>
        </div>
        <TaskList tasks={tasks} />
      </main>
    );
  }
}

export default Home;
