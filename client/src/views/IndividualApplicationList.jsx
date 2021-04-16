import { Component } from 'react';
import { loadTasksAppliedIndividual } from '../services/individual';
import TaskList from '../components/TaskList';

class IndividualApplicationList extends Component {
  state = {
    individual: null,
    tasks: [],
  };

  async componentDidMount() {
    const { individual, tasksApplied } = await loadTasksAppliedIndividual(
      this.props.match.params.id,
    );
    this.setState({ tasks: tasksApplied });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h1>Tasks applied by you</h1>
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

// Still have to add the conditional in case no task was applied by the user

export default IndividualApplicationList;
