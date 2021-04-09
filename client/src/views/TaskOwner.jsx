import React, { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';

class TaskOwner extends Component {
  state = {
    taskowner: null,
  };

  async componentDidMount() {
    const taskowner = await loadTaskOwner(this.props.match.params.id);
    this.setState({ taskowner });
  }
  render() {
    const { taskowner } = this.state;
    return (
      <div>
        {taskowner && (
          <>
            <h1>Hello {taskowner.name}, here you can see your listings</h1>
            <p>{taskowner.name}</p>
            {/* <p>{taskownerInfo.phoneNumber}</p> */}
            {/* <p>{taskownerInfo.email}</p> */}
          </>
        )}
      </div>
    );
  }
}

export default TaskOwner;
