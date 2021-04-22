import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';
//import { loadTask, applyTask } from './../services/task';

class TaskList extends Component {
  render() {
    return (
      <div>
        <div className="task__list">
          {this.props.tasks.map((task) => (
            <div key={task._id}>
              <Link to={`/task/${task._id}`}>
                <Task task={task} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TaskList;
