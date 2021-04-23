import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';

class TaskList extends Component {
  render() {
    return (
      <main>
        <div className="task__list">
          {this.props.tasks.map((task) => (
            <div key={task._id}>
              <Link to={`/task/${task._id}`}>
                <Task task={task} />
              </Link>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default TaskList;

//line 13 {task.status === 'open' ? (
//line 17  ) : ('')}

// would be to filter but does not work
