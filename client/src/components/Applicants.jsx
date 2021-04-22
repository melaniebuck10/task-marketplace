import { Component } from 'react';
import { loadTaskApplicants } from './../services/taskownerInfo';
import { assignTask, updatedApplications } from './../services/task';
import { Link } from 'react-router-dom';

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

  handleAssignment = async (index) => {
    // Update the task status from open to in process
    const updatedTask = await assignTask(this.props.taskId, {
      status: 'in_process'
    });
    this.props.handleTask(updatedTask);
    // Approving one candidate, rejecting all others
    let applicants = [...this.state.applicants];
    applicants.map((applicant) => (applicant.decision = 'rejected'));
    applicants[index].decision = 'approved';
    this.setState({
      applicants: applicants
    });
    // Updating the DB applications
    const applicantsUpdated = await updatedApplications(
      this.props.taskId,
      this.state.applicants
    );
    console.log(applicantsUpdated);
  };

  render() {
    return (
      <main>
        <div>
          {this.state.applicants.map((applicant, index) => (
            <div key={applicant._id}>
              <Link to={`/individual/${applicant.individual._id}`}>
                {' '}
                <li>{applicant.individual.name}</li>
              </Link>

              <li>
                {applicant.decision === 'approved' ? (
                  <Link to={`/task/${this.props.taskId}/approvedtask`}>
                    Communicate with the task taker!
                  </Link>
                ) : (
                  applicant.decision
                )}
              </li>
              {applicant.decision === 'approved' ||
              applicant.decision === 'rejected' ? (
                ''
              ) : (
                <button onClick={(e) => this.handleAssignment(index)}>
                  Assign task
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default Applicants;
