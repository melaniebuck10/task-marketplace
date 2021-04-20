import React, { Component } from 'react';
import { loadIndividual, editProfile } from '../services/individual';
import Rating from '../components/Rating';
import CreateReview from '../components/CreateReview';

class IndividualProfile extends Component {
  state = {
    individual: null,
    editModeActive: false,
    name: '',
    email: '',
  };

  async componentDidMount() {
    const individual = await loadIndividual(this.props.match.params.id);
    this.setState({
      individual,
      name: individual.name,
      email: individual.email,
    });
  }

  toggleNameEditMode = () => {
    this.setState({
      editModeActive: true,
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const name = this.state;

    await this.handleProfileEdit(this.state.individual._id, name);
    this.props.history.push(`/individual/${this.state.individual._id}`);
  };

  handleProfileEdit = async (id, data) => {
    let individual = await editProfile(id, data);
    // profile = await loadIndividual(this.props.match.params.id);

    this.setState({
      // name: profile.name,
      individual: individual,
      editModeActive: false,
    });
    this.props.onUserChange(individual);
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { individual } = this.state;
    const userId = this.props.user._id;
    return (
      <main>
        <div>
          {individual && (
            <>
              <h1>Hello, {individual.name}, this is your profile.</h1>
              <h3>Your information</h3>
              <p>
                {' '}
                <strong>Name: </strong>
              </p>
              {(this.state.editModeActive && (
                <form onSubmit={this.handleFormSubmission}>
                  <input
                    type="text"
                    placeholder="Update your name"
                    name="name"
                    value={this.state.name && this.state.name}
                    onChange={this.handleInputChange}
                  />
                  <button>Save</button>
                </form>
              )) || (
                <>
                  {individual.name}
                  {userId === individual._id && (
                    <button onClick={this.toggleNameEditMode}>✏️</button>
                  )}
                </>
              )}
              <p>
                {' '}
                <strong>Email address: </strong>
                {individual.email}
              </p>
            </>
          )}
          <div>
            <h2>Rating:</h2>
            <Rating individual={this.props.match.params.id} />
          </div>
          <CreateReview />
        </div>
      </main>
    );
  }
}

export default IndividualProfile;
