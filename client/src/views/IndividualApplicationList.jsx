import { Component } from 'react';
import { loadAppliedTasks } from '../services/individual';
import TaskList from '../components/TaskList';

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
                <div>{application.task.name}</div>
                <div>{application.decision}</div>
              </div>
            );
          })}
      </div>
    );
  }
}

// Still have to add the conditional in case no task was applied by the user

export default IndividualApplicationList;
