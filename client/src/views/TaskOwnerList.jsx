import { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';
// import { listTasks } from '../services/task';
import TaskList from '../components/TaskList';

class TaskOwnerList extends Component {
  state = {
<<<<<<< Updated upstream
    tasksOfOwner: [],
    tasks: []
=======
    taskowner: null,
    tasks: [],
>>>>>>> Stashed changes
  };

  async componentDidMount() {
    // const tasks = await listTasks();
    // this.setState({ tasks: tasks });
<<<<<<< Updated upstream
    const { tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id

=======
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id,
>>>>>>> Stashed changes
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

export default TaskOwnerList;
