import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loadTask } from './../services/task';
import { applyTask } from './../services/task';

// HAVE NOT FIGURED OUT WHY SUBMITTING THE FORM GIVES A 500 RESPONSE
class Task extends Component {
  state = {
    task: null,
    application
  };

  async componentDidMount() {
    const { task, application } = await loadTask(this.props.match.params.id);
    this.setState({ task, application });
  }

  handleTaskApplication = async () => {
    const application = await applyTask(this.props.match.params.id);
    this.setState({ application });
  };

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
              <Link to={`/taskowner/${task.taskowner._id}`}>{task.taskowner.name}</Link>
            </span>
            <br />
            <h4>{task.location}</h4>
            <p>{task.price}</p>
            <button
              className="button"
              disabled={this.state.application}
              onClick={this.handleTaskApplication}
            >
              {(this.state.application && 'Applied!') || 'Apply for this Task'}
            </button>
          </>
        )}
      </main>
    );
  }
}

export default Task;
