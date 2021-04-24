import './ApprovedApplication.scss';
import { Component } from 'react';
import { loadTask } from './../services/task';
import { loadTaskApplicants } from './../services/taskownerInfo';
import ApplicantTask from './../components/ApplicantsTask';
//import { Link } from 'react-router-dom';

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
    this.setState({
      task: response.task,
      approvedApplication: approvedIndividual
    });
  }
  render() {
    const task = this.state.task;
    const approvedApplication = this.state.approvedApplication;
    return (
      <main>
        <div className="aprrovedTaskComponent">
          <div className="allContactInfo">
            {this.state.task && (
              <div>
                <h2 className="role">{task.taskowner.role}'s contact info</h2>
                <div className="profileCard">
                  {!task.taskowner.profilePicture ? (
                    <div className="profileCard__standin-picture"></div>
                  ) : (
                    <img
                      className="profilePictureImg"
                      src={task.taskowner.profilePicture}
                      alt=""
                    />
                  )}
                  <div className="profileDetails">
                    <strong>{task.taskowner.name}</strong>
                    <div>
                      <strong>Email: </strong> {task.taskowner.email}
                    </div>
                    <div>
                      <strong>Phone: </strong> {task.taskowner.phoneNumber}
                    </div>
                    <div>
                      <strong>Location: </strong> {task.taskowner.address}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.approvedApplication && (
              <div className="individualContactInfo">
                <h2 className="role">
                  {approvedApplication.individual.role}'s contact info
                </h2>
                <div className="profileCard">
                  {!approvedApplication.individual.profilePicture ? (
                    <div className="profileCard__standin-picture"></div>
                  ) : (
                    <img
                      className="profilePictureImg"
                      src={approvedApplication.individual.profilePicture}
                      alt=""
                    />
                  )}
                  <div className="profileDetails">
                    <strong>{approvedApplication.individual.name}</strong>
                    <div>
                      <strong>Email: </strong>
                      {approvedApplication.individual.email}
                    </div>
                    <div>
                      <strong>Phone: </strong>
                      {approvedApplication.individual.phoneNumber}
                    </div>
                    <div>
                      <strong>Description: </strong>
                      {approvedApplication.individual.description}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="taskDescription">
            {this.state.task && <ApplicantTask task={this.state.task} />}
          </div>
        </div>
      </main>
    );
  }
}

export default ApprovedApplication;
