import React, { Component } from 'react';
import { loadTaskOwner, editProfile } from '../services/taskownerInfo';
import './TaskOwner.scss';
import settingsImage from './../pictures/gear-options-setup-comments-settings-wheel.png';

class TaskOwner extends Component {
  state = {
    taskowner: null,
    tasks: [],
    editModeActive: false,
    name: '',
    phoneNumber: '',
    email: '',
  };

  async componentDidMount() {
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id,
    );
    this.setState({
      taskowner,
      tasks: tasksOfOwner,
      name: taskowner.name,
      phoneNumber: taskowner.phoneNumber,
      email: taskowner.email,
    });
  }

  toggleEditMode = () => {
    this.setState({
      editModeActive: true,
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { name, phoneNumber } = this.state;

    await this.handleProfileEdit(this.state.taskowner._id, {
      name,
      phoneNumber,
    });
    this.props.history.push(`/taskowner/${this.state.taskowner._id}`);
  };

  handleProfileEdit = async (id, data) => {
    let taskowner = await editProfile(id, data);

    this.setState({
      taskowner: taskowner,
      editModeActive: false,
    });
    this.props.onUserChange(taskowner);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { taskowner } = this.state;
    const userId = this.props.user._id;
    return (
      <main>
        <div className="profile-box">
          {taskowner && (
            <div>
              {(this.state.editModeActive && (
                <form onSubmit={this.handleFormSubmission}>
                  <label htmlFor="input-name">Name</label>
                  <input
                    type="text"
                    placeholder="Update your name"
                    name="name"
                    value={this.state.name && this.state.name}
                    onChange={this.handleInputChange}
                  />
                  <label htmlFor="input-phone-number">Phone number</label>
                  <input
                    type="text"
                    placeholder="Update your phone number"
                    name="phoneNumber"
                    value={this.state.phoneNumber && this.state.phoneNumber}
                    onChange={this.handleInputChange}
                  />
                  <button>Save</button>
                </form>
              )) || (
                <div>
                  <h2>{taskowner.name}'s Profile</h2>
                  <div className="profileTop">
                    {userId === taskowner._id && (
                      <button
                        className="settingButton-taskowner"
                        onClick={this.toggleEditMode}
                      >
                        <img
                          className="settingsImage"
                          src={settingsImage}
                          alt="logo"
                        />
                      </button>
                    )}
                  </div>
                  <div className="taskOwner">
                    {(taskowner.profilePicture && (
                      <img
                        className="profile-picture"
                        src={taskowner.profilePicture}
                        alt=""
                      />
                    )) || <div className="standinProfilePic"></div>}
                    <div className="info-profile">
                      <p>
                        <strong>Name: </strong>
                        {taskowner.name}
                      </p>
                      <p>
                        <strong>Phone number: </strong>
                        {taskowner.phoneNumber}
                      </p>
                      <p>
                        <strong>Email address: </strong>
                        {taskowner.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default TaskOwner;
