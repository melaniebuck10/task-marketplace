import React, { Component } from 'react';
import { loadTaskOwner } from './../services/taskownerInfo';

class TaskOwner extends Component {
  state = {
    taskonwerInfo: null,
  };

  async componentDidMount() {
    const taskownerInfo = await loadTaskOwner(this.props.match.params.id);
    this.setState({ taskownerInfo });
  }
  render() {
    const { taskonwerInfo } = this.state;
    return (
      <div>
        {taskonwerInfo && (
          <>
            <h1>
              Hello {taskonwerInfo.name}, here you can see your information and
              your listings
            </h1>
            <p>{taskonwerInfo.name}</p>
            {/* <p>{taskonwerInfo.phoneNumber}</p> */}
            {/* <p>{taskonwerInfo.email}</p> */}
          </>
        )}
      </div>
    );
  }
}

export default TaskOwner;
