import { Component } from 'react';
import { loadTaskOwner } from '../services/taskownerInfo';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

class TaskOwnerList extends Component {
  state = {
    taskowner: null,
    tasks: [],
  };

  async componentDidMount() {
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id,
    );
    this.setState({ tasks: tasksOfOwner, taskowner });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        {(tasks && tasks.length && (
          <>
            <h1>Tasks uploaded by you</h1>

            <TaskList tasks={tasks} />
          </>
        )) || (
          <>
            <p>You have not created any tasks yet!</p>
            <button className="button">
              <Link to="/task/create"> Create a task!</Link>
            </button>
          </>
        )}
      </div>
    );
  }
}

export default TaskOwnerList;
