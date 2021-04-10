import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loadTask } from './../services/task';
// import { applyTask } from './../services/task';

class Task extends Component {
  state = {
    task: null,
    // application
  };

  async componentDidMount() {
    const { task } = await loadTask(this.props.match.params.id);
    this.setState({ task });
  }

  /* handleTaskApplication = async () => {
    const application = await applyTask(this.props.match.params.id);
    this.setState({ application });
  }; */

  render() {
    const task = this.state.task;
    return (
      <main>
        {task && (
          <>
            <Helmet>
              <title>Market Place - {task.name}</title>
            </Helmet>
            <h1>{task.name}</h1>
            {task.description && <p>{task.description}</p>}
            <span>
              Created by{' '}
              <Link to={`/taskowner/${task.taskowner._id}`}>
                {task.taskowner.name}
              </Link>
            </span>
            <br />
            <h4>{task.location}</h4>
            <p>{task.price}</p>
          </>
        )}
      </main>
    );
  }
}

export default Task;
