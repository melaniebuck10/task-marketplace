import React, { Component } from 'react';
import { loadIndividual, editProfile } from '../services/individual';
import Rating from '../components/Rating';

class IndividualProfile extends Component {
  state = {
    individual: null,
    editModeActive: false,
    newIndividualName: ''
  };

  async componentDidMount() {
    const individual = await loadIndividual(this.props.match.params.id);
    this.setState({ individual });
  }

  toggleNameEditMode = () => {
    this.setState({
      editModeActive: true,
      newIndividualName: this.props.name
    });
  };

  handleIndividualNameChange = event => {
    const value = event.target.value;
    this.setState({
      newIndividualName: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    this.setState(this.state.newIndividualName);
    this.setState({ editModeActive: false });
  };

  render() {
    const { individual } = this.state;
    return (
      <div>
        {individual && (
          <>
            <h1>Hello, {individual.name}, this is your profile.</h1>
            {individual.profilePicture}
            
            <h3>Your information</h3>
              <p>
                {' '}
                <strong>Name: </strong>
              {(this.state.editModeActive && (
              <form onSubmit={this.handleFormSubmission}>
              <input
              type="text"
              placeholder="Update your name"
              value={this.state.newIndividualName}
              onUpdate={value =>
                this.handleIndividualNameChange('name', value)
              }
              />
              <button>🔒</button>
              </form>
              )) || (
                <>
              {individual.name}
                <button onClick={this.toggleNameEditMode}>✏️</button>
              </>
            )}
              </p>

              <p>
                {' '}
                <strong>Email address: </strong>
                {individual.email}
              </p>
              </>
              )}
        <Rating>{this.props.rating}</Rating>

        <button>Edit Profile</button>
      </div>
    );
  }
}

export default IndividualProfile;
