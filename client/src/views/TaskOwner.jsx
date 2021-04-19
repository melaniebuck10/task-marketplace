import React, { Component } from 'react';
import { loadTaskOwner, editProfile } from '../services/taskownerInfo';

class TaskOwner extends Component {
  state = {
    taskowner: null,
    tasks: [],
    editModeActive: false,
    name: '',
    phoneNumber: ''
  };

  async componentDidMount() {
    const { taskowner, tasksOfOwner } = await loadTaskOwner(
      this.props.match.params.id
    );
    this.setState({ 
      taskowner, 
      tasks: tasksOfOwner,
      name: taskowner.name,
      phoneNumber: taskowner.phoneNumber
    });
  }

  toggleEditMode = () => {
    this.setState({
      editModeActive: true
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { name, 
      phoneNumber 
    } = this.state;

    await this.handleProfileEdit(this.state.taskowner._id, { 
      name, 
      phoneNumber
    });
    this.props.history.push(`/taskowner/${this.state.taskowner._id}`);
  };

  handleProfileEdit = async (id, data) => {
    let profile = await editProfile(id, data);
    profile = await loadTaskOwner(this.props.match.params.id);

    this.setState({
      name: profile.name,
      phoneNumber: profile.phoneNumber,
      editModeActive: false
    });
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const taskowner = this.state;
    return (
      <main>
        <div>
          {taskowner && (
            <>
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
                <>
                <h1>Hello, {taskowner.name}, this is your personal page</h1>
                <br/>
                <h3>Your information</h3>
                <p>
                  {' '}
                  <strong>Name: </strong>
                  {taskowner.name}
                </p>
                <p>
                  {' '}
                  <strong>Phone number: </strong>
                  {taskowner.phoneNumber}
                </p>
                <p>
                  {' '}
                  <strong>Email address: </strong>
                  {taskowner.email}
                </p>
                <img src={taskowner.profilePicture} alt="" />
                <br />
                {/* {this.props.user._id === taskowner._id && ( */}
                  <button
                  className="button"
                  onClick={this.toggleEditMode}>
                  Edit
                </button>
                {/* )} */}
                </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    );
  }
}



export default TaskOwner;
