import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { editTask, loadTask } from '../services/task';
import PictureSlider from './../components/PictureSlider';
import { applyTask } from './../services/task';

class SingleTask extends Component {
  state = {
    task: null,
    editModeActive: false,
    application: null,
    name: '',
    description: '',
  };

  async componentDidMount() {
    const task = await loadTask(this.props.match.params.id);
    this.setState({ task, name: task.name });
    // I REMOVED THE BELOW CODE (APPLICATION) BECAUSE IT WAS BLOCKING THE SINGLE TASK FROM RENDERING. loadTask does not return the application.
    // const { task, application } = await loadTask(this.props.match.params.id);
    // console.log(task);
    // this.setState({ task, application });
  }

  handleTaskApplication = async () => {
    console.log(this.props.match.params.id);
    const application = await applyTask(this.props.match.params.id);
    this.setState({ application });
  };

  toggleEditMode = () => {
    this.setState({
      editModeActive: true,
    });
  };
  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { name, description } = this.state;
    this.handleTaskEdit(this.state.task._id, { name, description });
    this.setState({ editModeActive: false });
    this.props.history.push(`/task/${this.state.task._id}`);
  };

  handleTaskEdit = async (id, data) => {
    const task = await editTask(id, { data });
    this.setState({
      task: task,
    });
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const task = this.state.task;
    const userId = this.props.user._id;
    return (
      <main>
        {task && (
          <Helmet>
            <title>Market Place - {task.taskowner.name}</title>
          </Helmet>
        )}

        {(this.state.editModeActive && (
          <form onSubmit={this.handleFormSubmission}>
            <label htmlFor="input-name">Task name</label>
            <input
              type="text"
              placeholder={task.name}
              name="name"
              value={this.state.name && this.state.name}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-description">Description</label>
            <input
              type="text"
              placeholder={task.description}
              name="description"
              value={this.state.description && this.state.description}
              onChange={this.handleInputChange}
            />
            <button>Save</button>
          </form>
        )) || (
          <>
            {task && (
              <>
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
                      <strong>I am able to pay the following amount:</strong>{' '}
                      <br />
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
                  <span>Created by {task.taskowner.name}</span>
                </div>
              </>
            )}
          </>
        )}
      </main>
    );
  }
}

export default SingleTask;
