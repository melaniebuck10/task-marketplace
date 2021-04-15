import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loadTask } from '../services/task';
import PictureSlider from './../components/PictureSlider';
import { applyTask } from './../services/task';

class SingleTask extends Component {
  state = {
    task: null,
    editModeActive: false,
    application: null,
  };

  async componentDidMount() {
    const task = await loadTask(this.props.match.params.id);
    this.setState({ task });
    // I REMOVED THE BELOW CODE (APPLICATION) BECAUSE IT WAS BLOCKING THE SINGLE TASK FROM RENDERING. loadTask does not return the application.
    // const { task, application } = await loadTask(this.props.match.params.id);
    // console.log(task);
    // this.setState({ task, application });
  }

  handleTaskApplication = async () => {
    const application = await applyTask(this.props.match.params.id);
    this.setState({ application });
  };

  toggleEditMode = () => {
    this.setState({
      editModeActive: true,
    });
  };
  handleFormSubmission = (event) => {
    event.preventDefault();
  };
  render() {
    const task = this.state.task;
    const userId = this.props.user._id;
    return (
      <main>
        {task && (
          <>
            <Helmet>
              <title>Market Place - {task.taskowner.name}</title>
            </Helmet>
            <br />
            <br />
            <div className="task_design">
              <div className="taskinput">
                <h1>{task.name}</h1>
                {!!task.pictures.length && (
                  <PictureSlider pictures={task.pictures} />
                )}
                {task.description && (
                  <p>
                    <strong>Description:</strong> <br />
                    {task.description}
                  </p>
                )}
                <strong>Type: </strong>
                {(task.assignment === 'single_task' && 'Single Task') ||
                  'Project'}
                <p>Hours: {task.hoursOfWork}</p>
                <p>
                  <strong>I am able to pay the following amount:</strong> <br />
                  {task.price} Eur
                </p>
                <p>
                  <strong>Status:</strong> <br />
                  {(task.status === 'open' && 'Open') ||
                    (task.status === 'closed' && 'Closed') ||
                    'In process'}
                </p>{' '}
                <br />
                <br />
                {userId === task.taskowner._id && (
                  <button
                    onClick={this.toggleEditMode}
                    style={{ backgroundColor: 'lightgreen' }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <span>
                Created by{' '}
                {/* <Link to={`/taskowner/${task.taskowner._id}`}> */}
                {task.taskowner.name}
                {/* </Link> */}
              </span>
            </div>
          </>
        )}
      </main>
    );
  }
}

export default SingleTask;
