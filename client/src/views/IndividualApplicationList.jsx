import { Component } from 'react';
import { loadAppliedTasks } from '../services/individual';
import { Link } from 'react-router-dom';
import Task from '../components/Task';

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
      <div>
        <h1>Tasks applied by you</h1>
        {applications &&
          applications.map((application) => {
            return (
              <div key={application._id}>
                <Link to={`/task/${application.task._id}`}>{application.task.name}</Link>
                <p>{application.decision}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default IndividualApplicationList;
