import React, { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';
import TaskList from '../components/TaskList';

class TaskOwner extends Component {
  state = {
    taskowner: null,
    tasks: []
  };

  async componentDidMount() {
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id
    );
    this.setState({ taskowner, tasks: tasksOfOwner });
  }
  render() {
    const { taskowner, tasks } = this.state;
    return (
      <div>
        {taskowner && (
          <>
            <h1>Hello {taskowner.name}, here you can see your listings</h1>
            <p>{taskowner.name}</p>
            <p>{taskowner.phoneNumber}</p>
            <p>{taskowner.email}</p>
            <img src="{taskowner.profilePicture" alt="" />

            {/* Component with Listed Tasks of this taskowner */}
            <TaskList tasks={tasks} />
          </>
        )}
      </div>
    );
  }
}

export default TaskOwner;
