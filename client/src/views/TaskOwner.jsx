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
            <h1>Hello {taskowner.name}, your personal page</h1>
            <div>
              {' '}
              <h3>Your information</h3>
              <p>
                {' '}
                <strong>Name </strong> {taskowner.name}
              </p>
              <p>
                {' '}
                <strong>Phone number </strong> {taskowner.phoneNumber}
              </p>
              <p>
                {' '}
                <strong>Email address </strong>
                {taskowner.email}
              </p>
              <img src="{taskowner.profilePicture}" alt="" />
            </div>
            <div>
              <h1>Tasks uploaded by you:</h1>
            <TaskList tasks={tasks} />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default TaskOwner;
