import { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';
import TaskList from '../components/TaskList';

class TaskOwnerList extends Component {
  state = {
    taskowner: null,
    tasks: [],
  };

  async componentDidMount() {
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id,
    );
    this.setState({ tasks: tasksOfOwner });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h1>Tasks uploaded by you</h1>
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

// Still have to add the conditional in case no task was uploaded by the user

export default TaskOwnerList;
