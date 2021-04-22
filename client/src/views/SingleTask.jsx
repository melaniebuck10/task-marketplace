import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Applicants from './../components/Applicants';
import { editTask, loadTask } from '../services/task';
import PictureSlider from './../components/PictureSlider';
import { applyTask } from './../services/task';
import EditTaskForm from '../components/EditTaskForm';

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
    assignment: ''
  };

  async componentDidMount() {
    const { task, application } = await loadTask(this.props.match.params.id);
    this.setState({
      task,
      application,
      // loading this here otherwise on Edit if user did not provide updated text and saved, then they were null
      name: task.name,
      description: task.description,
      price: task.price,
      hoursOfWork: task.hoursOfWork,
      typeOfWork: task.typeOfWork,
      status: task.status
    });
  }

  handleTaskApplication = async () => {
    console.log(this.props.match.params.id);
    const application = await applyTask(this.props.match.params.id);
    this.setState({ application });
  };

  toggleEditMode = () => {
    this.setState({
      editModeActive: true
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
      status
    } = this.state;

    // console.log(data);
    await this.handleTaskEdit(this.state.task._id, {
      name,
      assignment,
      description,
      price,
      hoursOfWork,
      typeOfWork,
      status
    });

    this.props.history.push(`/task/${this.state.task._id}`);
  };

  handleTaskEdit = async (id, data) => {
    let task = await editTask(id, data);
    task = await loadTask(this.props.match.params.id);

    this.setState({
      task: task.task,
      editModeActive: false
    });
  };

  handleAssignment = (updatedTask) => {
    console.log('UPDATED TASK COMP', updatedTask);
    this.setState({
      task: updatedTask
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const task = this.state.task;
    const userId = this.props.user._id;
    return (
      <main className="page-single-task">
        <div>
          {task && (
            <Helmet>
              <title>Market Place - {task.taskowner.name}</title>
            </Helmet>
          )}
          {(this.state.editModeActive && (
            <EditTaskForm
              values={this.state}
              onChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmission}
            />
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
                        {this.props.user &&
                          this.props.user.role === 'individual' && (
                            <button
                              className="button"
                              disabled={this.state.application}
                              // taskid={task._id}
                              onClick={this.handleTaskApplication}
                            >
                              {(this.state.application && 'Applied!') ||
                                'Apply for Task'}
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {this.props.user &&
          this.props.user.role === 'taskowner' &&
          this.state.task && (
            <Applicants
              taskId={this.state.task._id}
              handleTask={this.handleAssignment}
            />
          )}
      </main>
    );
  }
}

export default SingleTask;
