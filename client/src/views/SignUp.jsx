import React, { Component } from 'react';
import { signUp } from './../services/authentication';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    role: '',
    description: '',
    address: '',
    phoneNumber: '',
    profilePicture: '',
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const {
      name,
      email,
      password,
      role,
      description,
      address,
      phoneNumber,
      profilePicture,
    } = this.state;
    const data = {
      name,
      email,
      password,
      role,
      description,
      address,
      phoneNumber,
      profilePicture,
    };

    const body = new FormData();
    for (let key in data) {
      const value = data[key];
      if (value instanceof Array) {
        for (let item of value) {
          body.append(key, item);
        }
      } else {
        body.append(key, value);
      }
    }
    const user = await signUp(body);
    this.props.onUserChange(user);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileInputChange = (event) => {
    const { name, files } = event.target;
    let file = files[0];
    this.setState({
      [name]: file,
    });
  };

  handleDisplay = (e) => {
    this.setState({
      display: !this.state.display,
    });
    console.log(this.state.display);
  };

  render() {
    return (
      <main>
        <header>
          <h1>Sign Up</h1>
        </header>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            placeholder="James Dean"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            placeholder="james@example.com"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-profilePicture">Profile Picture</label>
          <input
            id="input-profilePicture"
            type="file"
            name="profilePicture"
            onChange={this.handleFileInputChange}
          />
            
          <label htmlFor="role-input">
            Are you a Task Taker or a Task Owner?
          </label>
          <select
            id="role-input"
            name="role"
            required
            value={this.state.role}
            onChange={this.handleInputChange}
          >
            <option value="" disabled>
              Task Taker or a Task Owner?
            </option>
            <option value="individual">Task Taker</option>
            <option value="taskowner">Task Owner</option>
          </select>
          {this.state.role === 'individual' ? (
            <>
                <label htmlFor="description-input">Description </label>
              <textarea
                id="description-input"
                placeholder="What makes you awesome??"
                name="description"
                maxLength="155"
                required
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </>
          ) : (
            ''
          )}
          {this.state.role === 'taskowner' ? (
            <>
              <label htmlFor="address-input">Your address:</label>
              <input
                id="address-input"
                placeholder="Address.."
                name="address"
                maxLength="155"
                type="address"
                required
                value={this.state.address}
                onChange={this.handleInputChange}
              />
              <label htmlFor="phoneNumber-input">Phone number:</label>
              <input
                id="phoneNumber-input"
                placeholder="Your phone number"
                name="phoneNumber"
                type="tel"
                maxLength="10"
                required
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
              />
            </>
          ) : (
            ''
          )}
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            placeholder="A secure password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button>Sign Up</button>
        </form>
      </main>
    );
  }
}

export default SignUp;
