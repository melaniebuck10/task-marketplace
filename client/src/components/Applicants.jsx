import { Component } from 'react';
import { loadTaskApplicants } from './../services/taskownerInfo';
import { assignTask, updatedApplications } from './../services/task';
import { Link } from 'react-router-dom';
import './Applicants.scss';

class Applicants extends Component {
  state = {
    applicants: [],
    tasks: null // 6075cefed4b7f53a2c72ec08
  };

  async componentDidMount() {
    const applicants = await loadTaskApplicants(this.props.taskId);
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
    await updatedApplications(
      this.props.taskId,
      this.state.applicants
    );
  };

  render() {
    return (
      <main>
        <div className="applicantinfo">
          <div>
            <h3 className="title">Check out your applicants</h3>
          </div>
          {this.state.applicants.map((applicant, index) => (
            <div key={applicant._id}>
              <Link to={`/individual/${applicant.individual._id}`}>
                {' '}
                <li className="list">{applicant.individual.name}</li> <br />
              </Link>

              <li className="list2">
                Status of the application: {applicant.decision}
                <br />{' '}
                {applicant.decision === 'approved' ? (
                  <Link to={`/task/${this.props.taskId}/approvedtask`}>
                    Communicate with the task taker!
                  </Link>
                ) : (
                  ''
                )}
              </li>
              {applicant.decision === 'approved' ||
              applicant.decision === 'rejected' ? (
                ''
              ) : (
                <button
                  className="assignbutton"
                  onClick={(e) => this.handleAssignment(index)}
                >
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
