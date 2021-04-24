import { Component } from 'react';
import { loadAppliedTasks } from '../services/individual';
import { Link } from 'react-router-dom';
//import TaskList from '../components/TaskList';
//import Task from '../components/Task';
import './IndividualApplicationList.scss';

class IndividualApplicationList extends Component {
  state = {
    individual: null,
    applications: [],
  };

  async componentDidMount() {
    const appliedTasks = await loadAppliedTasks(this.props.match.params.id);
    this.setState({ applications: appliedTasks.data.applications });
  }

  render() {
    const { applications } = this.state;

    return (
      <main>
        <div>
          <h1 className="application_head">Your applied tasks</h1>
          <div className="taskalign taskalign_application">
            {applications &&
              applications.map((application) => {
                return (
                  <div
                    className="task__item application_item"
                    key={application._id}
                  >
                    <p>
                      <strong>{application.task.name}</strong>
                    </p>
                    <p>
                      <strong>Decision: </strong>

                      {(application.decision === 'approved' && ' Approved') ||
                        (application.decision === 'rejected' && ' Rejected') ||
                        (application.decision === 'pending' && ' Pending')}
                    </p>
                    <p>
                      {application.decision === 'approved' ? (
                        <>
                          <strong>Status: </strong>
                          {(application.task.status === 'in_process' &&
                            ' In process') ||
                            (application.task.status === 'open' && ' Open') ||
                            ' Closed'}
                        </>
                      ) : (
                        ''
                      )}
                    </p>
                    {application.decision === 'approved' ? (
                      <Link
                        className="link"
                        to={`/task/${application.task._id}/approvedtask`}
                      >
                        View more details
                        <br />
                      </Link>
                    ) : (
                      ''
                    )}{' '}
                    <br />
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    );
  }
}

export default IndividualApplicationList;
