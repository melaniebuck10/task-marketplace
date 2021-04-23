import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';
//import { loadTask, applyTask } from './../services/task';
import './Task.scss';

class TaskList extends Component {
  render() {
    return (
      <div className="taskalign">
          {this.props.tasks.map((task) => (
            <div key={task._id}>
              <Link to={`/task/${task._id}`}>
                <Task task={task} />
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default TaskList;
