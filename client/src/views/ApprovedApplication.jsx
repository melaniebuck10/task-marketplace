import { Component } from 'react';
import { listTasks } from './../services/task';

class ApprovedApplication extends Component {
  state = {
    tasks: []
  };

  async componentDidMount() {
    // WORK IN PROGRESS
    const tasks = await listTasks();
    this.setState({ tasks: tasks });
  }
  render() {
    console.log(this.props.match);
    return <div>
      
    </div>;
  }
}

export default ApprovedApplication;
