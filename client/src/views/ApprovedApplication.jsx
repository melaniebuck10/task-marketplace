import { Component } from 'react';
import { listTasks, loadTask } from './../services/task';
import { loadIndividual } from './../services/individual';

class ApprovedApplication extends Component {
  state = {
    task: null
  };

  async componentDidMount() {
    //display taskowner info
    //dipslay task info
    //display individual info
    const response = await loadTask(this.props.match.params.id);
    // const individual = await loadIndividual(individual:id)
    console.log('TASK', response.task);
    this.setState({
      task: response.task
    });
  }
  render() {
    console.log('PROPS ', this.props.user);
    const task = this.state.task;
    const user = this.props.user;
    return (
      <div>
        {this.state.task && (
          <div>
            <div>
              <h1>{this.state.task.name}</h1>
              <p>{this.state.task.description}</p>
              <small>Payment is {this.state.task.price} EUR</small>
            </div>
            <div>
              <div>
                <h2>{user.role}</h2>
                <h2>{user.description}</h2>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.phoneNumber}</div>
                <div>{user._id}</div>
              </div>
              <div>
                <h2>{task.taskowner.role}</h2>
                <div>{task.taskowner.name}</div>
                <div>{task.taskowner.email}</div>
                <div>{task.taskowner.phoneNumber}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ApprovedApplication;
