import { Component } from 'react';
import { loadTask } from './../services/task';
import { loadTaskApplicants } from './../services/taskownerInfo';
import { Link } from 'react-router-dom';

class ApprovedApplication extends Component {
  state = {
    task: null,
    approvedApplication: null
  };

  async componentDidMount() {
    const response = await loadTask(this.props.match.params.id);
    const applicationsResponse = await loadTaskApplicants(
      this.props.match.params.id
    );
    const approvedIndividual = applicationsResponse.filter(
      (application) => application.decision === 'approved'
    )[0];
    console.log('approvedIndividual', approvedIndividual);
    this.setState({
      task: response.task,
      approvedApplication: approvedIndividual
    });
  }
  render() {
    const task = this.state.task;
    const approvedApplication = this.state.approvedApplication;
    console.log('INDIVIDUAL', approvedApplication);
    return (
      <main>
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
                <h2>{task.taskowner.role}</h2>
                <div>{task.taskowner.profilePicture}</div>
                <div>
                  <h2>Contact Info</h2>
                  <div>{task.taskowner.name}</div>
                  <div>Email: {task.taskowner.email}</div>
                  <div>Phone: {task.taskowner.phoneNumber}</div>
                </div>
                <div>Location: {task.taskowner.address}</div>
              </div>
            </div>
          </div>
        )}
        {this.state.approvedApplication && (
          <div>
            <h2>{approvedApplication.individual.role}</h2>
            <div>{approvedApplication.individual.profilePicture}</div>
            <div>{approvedApplication.individual.name}</div>
            <p>{approvedApplication.individual.description}</p>
            <div>{approvedApplication.individual.email}</div>
            <div>{approvedApplication.individual.phoneNumber}</div>
          </div>
        )}
      </div>
      </main>
    );
  }
}

export default ApprovedApplication;
