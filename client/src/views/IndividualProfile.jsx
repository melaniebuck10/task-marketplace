import React, { Component } from 'react';
import { loadIndividual, editProfile } from '../services/individual';
import Rating from '../components/Rating';
import CreateReview from './CreateReview';
import './IndividualProfile.scss';
import settingsImage from './../pictures/gear-options-setup-comments-settings-wheel.png';

class IndividualProfile extends Component {
  state = {
    individual: null,
    editModeActive: false,
    name: '',
    email: '',
    description: '',
    // reviews: []
  };

  async componentDidMount() {
    const individual = await loadIndividual(this.props.match.params.id);
    // const reviews = await listRatings();

    this.setState({
      individual,
      name: individual.name,
      email: individual.email,
      description: individual.description,
      // reviews: reviews
    });
  }

  toggleEditMode = () => {
    this.setState({
      editModeActive: true,
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { name, description, email } = this.state;

    await this.handleProfileEdit(this.state.individual._id, {
      name,
      description,
      email,
    });

    this.props.history.push(`/individual/${this.state.individual._id}`);
  };

  handleProfileEdit = async (id, data) => {
    let individual = await editProfile(id, data);

    this.setState({
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

  handleReviewCreation = (review) => {
    // this.props.history.push(`/rating/${review._id}`);
  };

  render() {
    const { individual, name, email, description } = this.state;
    const userId = this.props.user._id;
    return (
      <main>
        <div className="profile-box">
          {individual && (
            <>
              {(this.state.editModeActive && (
                <form onSubmit={this.handleFormSubmission}>
                  <label htmlFor="name-input">Name:</label>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Update your name"
                    name="name"
                    value={name && name}
                    onChange={this.handleInputChange}
                  />
                  <label htmlFor="description-input">Description:</label>
                  <textarea
                    id="description-input"
                    type="text"
                    placeholder="Update your description"
                    name="description"
                    value={description && description}
                    onChange={this.handleInputChange}
                  />
                  <label htmlFor="email-input">Email address:</label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="Change your email address"
                    name="email"
                    value={email && email}
                    onChange={this.handleInputChange}
                  />
                  <button>Save</button>
                </form>
              )) || (
                <>
                  {/* only display info below to the owner of the profile - taskower can also see the individual profile */}
                  {(userId === individual._id && (
                    <>
                      <div className="profileTop">
                        <h1>Hello, {individual.name}, this is your profile.</h1>
                        {userId === individual._id && (
                          <button
                            className="settingButton"
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
                    </>
                  )) || (
                    /* or display below copy if the person viewing is not 
                    the owner of the profile, in this case the 
                    taskowner viewing applicant information
                    */
                    <>
                      <h2>{individual.name}'s information</h2>
                    </>
                  )}
                  <div className="individual">
                    {(individual.profilePicture && (
                      <img
                        className="profile-picture"
                        src={individual.profilePicture}
                        alt=""
                      />
                    )) || <div className="standinProfilePic"></div>}
                    <div className="info-profile">
                      <p>
                        <strong>Name: </strong>
                        {individual.name}
                      </p>
                      <p>
                        <strong>Email address: </strong>
                        {individual.email}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {individual.description}
                      </p>
                      <br />
                      <Rating individual={this.props.match.params.id} />
                    </div>
                  </div>
                    {(userId !== individual._id && (
                      <div className="create-review">
                      <CreateReview
                        individual={this.props.match.params.id}
                        onReviewCreation={this.handleReviewCreation}
                      />
                    </div>
                    ))}
                </>
              )}
            </>
          )}
        </div>
      </main>
    );
  }
}

export default IndividualProfile;
