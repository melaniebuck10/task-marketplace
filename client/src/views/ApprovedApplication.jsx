import { Component } from 'react';
import { listTasks, loadTask } from './../services/task';

class ApprovedApplication extends Component {
  state = {
    task: null
  };

  async componentDidMount() {
    //display taskowner info
    //dipslay task info
    //display individual info
    const response = await loadTask(this.props.match.params.id);
    console.log('TASK', response.task);
    this.setState({
      task: response.task
    });
  }
  render() {
    console.log('PROPS ', this.props.user);
    return <div>{this.state.task && this.state.task.status}</div>;
  }
}

export default ApprovedApplication;
