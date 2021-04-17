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
    price: '',
    hoursOfWork: '',
    typeOfWork: '',
    status: '',
  };
  // const { task, application } = await loadTask(this.props.match.params.id);
  // this.setState({ task, name: task.name, application });
  async componentDidMount() {
    const task = await loadTask(this.props.match.params.id);
    this.setState({
      task,
      // loading this here otherwise on Edit if user did not provide updated text and saved, then they were null
      name: task.name,
      description: task.description,
      price: task.price,
      hoursOfWork: task.hoursOfWork,
      typeOfWork: task.typeOfWork,
      status: task.status,
    });
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
    const {
      name,
      assignment,
      description,
      price,
      hoursOfWork,
      typeOfWork,
      status,
    } = this.state;

    // console.log(data);
    await this.handleTaskEdit(this.state.task._id, {
      name,
      assignment,
      description,
      price,
      hoursOfWork,
      typeOfWork,
      status,
    });

    this.props.history.push(`/task/${this.state.task._id}`);
  };

  handleTaskEdit = async (id, data) => {
    let task = await editTask(id, data);
    task = await loadTask(this.props.match.params.id);
    this.setState({
      task: task,
      editModeActive: false,
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
            <label htmlFor="input-assignment">Type of Assignment</label>
            <select
              id="input-assignment"
              name="assignment"
              value={this.state.assignment}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>
                Type of task
              </option>
              <option value="single_task">Single Task</option>
              <option value="project">Project</option>
            </select>
            <label htmlFor="input-price">Price in EUR</label>
            <input
              type="number"
              placeholder={task.price}
              name="price"
              value={this.state.price && this.state.price}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-hoursOfWork">Hours</label>
            <input
              type="number"
              placeholder={task.hoursOfWork}
              name="hoursOfWork"
              value={this.state.hoursOfWork && this.state.hoursOfWork}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-typeOfWork">Type of Work</label>
            <select
              id="input-typeOfWork"
              name="typeOfWork"
              value={this.state.typeOfWork}
              onChange={this.handleInputChange}
            >
              <option value="" disabled>
                Type of Work
              </option>
              <option value="physical">Physical</option>
              <option value="administrative">Administrative</option>
            </select>
            <label htmlFor="input-status">Status</label>
            <select
              id="input-status"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>
                Status
              </option>
              <option value="open">Open</option>
              <option value="in_process">In Process</option>
              <option value="closed">Closed</option>
            </select>
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
                    <strong>Type of Task: </strong>
                    {(task.assignment === 'single_task' && 'Single Task') ||
                      'Project'}
                    <br />
                    <strong>Type of work: </strong>
                    {(task.typeOfWork === 'physical' && 'Physical') ||
                      'Administrative'}
                    <p>
                      <strong> Hours:</strong> {task.hoursOfWork}
                    </p>
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
                    <span>Created by {task.taskowner.name}</span>
                    <div>
                      {userId === task.taskowner._id && (
                        <button
                          className="button"
                          onClick={this.toggleEditMode}
                        >
                          Edit
                        </button>
                      )}

                      <button
                        className="button"
                        disabled={this.state.application}
                        // taskid={task._id}
                        onClick={this.handleTaskApplication}
                      >
                        {(this.state.application && 'Applied!') ||
                          'Apply for Task'}
                      </button>
                    </div>
                  </div>
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
