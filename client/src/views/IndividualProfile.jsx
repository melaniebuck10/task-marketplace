import React, { Component } from 'react';
import { loadIndividual } from '../services/individual';
import Rating from '../components/Rating';
import CreateReview from '../components/CreateReview';

class IndividualProfile extends Component {
  state = {
    individual: null,
    editModeActive: false,
    newIndividualName: '',
  };

  async componentDidMount() {
    const individual = await loadIndividual(this.props.match.params.id);
    this.setState({ individual });
  }

  toggleNameEditMode = () => {
    this.setState({
      editModeActive: true,
      newIndividualName: this.props.name,
    });
  };

  handleIndividualNameChange = (event) => {
    const value = event.target.value;
    this.setState({
      newIndividualName: value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
  };

  render() {
    const { individual } = this.state;
    return (
      <main>
        <div>
          {individual && (
            <>
              <h1>Hello, {individual.name}, this is your profile.</h1>
              {individual.profilePicture}

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
                    value={
                      this.state.newIndividualName &&
                      this.state.newIndividualName
                    }
                    onChange={(event) => this.handleIndividualNameChange(event)}
                  />
                  <button>🔒</button>
                </form>
              )) || (
                <>
                  {individual.name}
                  <button onClick={this.toggleNameEditMode}>✏️</button>
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
