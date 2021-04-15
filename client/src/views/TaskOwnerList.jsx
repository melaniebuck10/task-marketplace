import { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';
// import { listTasks } from '../services/task';
import TaskList from '../components/TaskList';

class TaskOwnerList extends Component {
  state = {
    tasksOfOwner: [],
    tasks: []
  };

  async componentDidMount() {
    // const tasks = await listTasks();
    // this.setState({ tasks: tasks });
    const { tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id

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