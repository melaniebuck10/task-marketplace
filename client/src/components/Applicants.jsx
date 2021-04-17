import { Component } from 'react';
import { loadTaskApplicants } from './../services/taskownerInfo';

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

  render() {
    return (
      <div>
        {this.state.applicants.map((applicant) => (
          <div key={applicant._id}>
            <li>{applicant.individual.name}</li>
            <button>Assign task</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Applicants;
