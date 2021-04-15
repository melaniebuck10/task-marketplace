import { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';
// import { listTasks } from '../services/task';
import TaskList from '../components/TaskList';

class TaskOwnerList extends Component {
  state = {
    tasksOfOwner: null,
    tasks: []
  };

  async componentDidMount() {
    // const tasks = await listTasks();
    // this.setState({ tasks: tasks });
    const { tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id
    );
    this.setState({ tasksOfOwner });
  }

  render() {
    // const { tasksOfOwner } = this.state;
    return (
        <div>
        <h1>Tasks uploaded by you</h1>
        {/* <TaskList tasksOfOwner={tasksOfOwner} /> */}
        <h3>{this.props.tasksOfOwner}</h3>
      </div>
    );
  }
}

export default TaskOwnerList;