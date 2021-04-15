import React, { Component } from 'react';
import TaskList from '../components/TaskList';
import { listTasks } from './../services/task';
import { loadTaskOwner } from '../services/taskownerInfo';
import Task from '../components/Task';

class Home extends Component {
  state = {
    taskowner: null,
    individual: null,
    tasks: []
  };

  async componentDidMount() {
    const tasks = await listTasks();
    this.setState({ tasks: tasks });
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id
    );
    this.setState({ taskowner, tasks: tasksOfOwner });
  }
  render() {
    const { tasks, taskowner, individual } = this.state;
    return (
      <div>
        <h1>Welcome to your favorite Tasks Marketplace</h1>
        <TaskList tasks={tasks} />
      </div>
      // <div>
      //   {taskowner && (
      //   <>
      //   <h1>Here are the tasks uploaded by you</h1>
      //   <Task tasks={tasks} />
      //   </>
      //   )}
      //   {individual && (
      //   <>
      //   <h1>Welcome to your favorite Tasks Marketplace</h1>
      //   <TaskList tasks={tasks} />
      //   </>
      //   )}
      // </div>
    );
  }
}

export default Home;
