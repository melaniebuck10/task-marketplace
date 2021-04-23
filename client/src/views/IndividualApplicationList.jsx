import { Component } from 'react';
import { loadAppliedTasks } from '../services/individual';
import { Link } from 'react-router-dom';
//import TaskList from '../components/TaskList';
//import Task from '../components/Task';

class IndividualApplicationList extends Component {
  state = {
    individual: null,
    applications: []
  };

  async componentDidMount() {
    const appliedTasks = await loadAppliedTasks(this.props.match.params.id);
    console.log('APPLIED TASKS', appliedTasks);
    this.setState({ applications: appliedTasks.data.applications });
  }

  render() {
    const { applications } = this.state;

    return (
      <main>
      <div>
        <h1>Tasks applied by you</h1>
        {applications &&
          applications.map((application) => {
            return (
              <div key={application._id}>
                <div>{application.task.name}</div>
                <div>{application.decision}</div>
                {application.decision === 'approved' ? <div>{application.task.status}</div> : ''}
                {application.decision === 'approved' ? (
                  <Link to={`/task/${application.task._id}/approvedtask`}>
                    View more details!
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
      </main>
    );
  }
}

export default IndividualApplicationList;
