import { Component } from 'react';
import { loadTaskApplicants } from './../services/taskownerInfo';
import { assignTask } from './../services/task';

class Applicants extends Component {
  state = {
    applicants: [],
    tasks: null // 6075cefed4b7f53a2c72ec08
  };

  async componentDidMount() {
    console.log('taskId', this.props.taskId);
    const applicants = await loadTaskApplicants(this.props.taskId);
    console.log('APPLICANTS', applicants);
    this.setState({ applicants });
  }

  handleAssignment = async () => {
    // Update the task status from open to in process
    const updatedTask = await assignTask(this.props.taskId, {
      status: 'in_process'
    });
    console.log('UPDATED TASK', updatedTask);
    this.props.handleTask(updatedTask);
  };

  render() {
    return (
      <div>
        {this.state.applicants.map((applicant) => (
          <div key={applicant._id}>
            <li>{applicant.individual.name}</li>
            <button onClick={this.handleAssignment}>Assign task</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Applicants;
