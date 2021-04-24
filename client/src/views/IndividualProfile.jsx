import React, { Component } from 'react';
import { loadIndividual, editProfile } from '../services/individual';
import Rating from '../components/Rating';
import CreateReview from '../components/CreateReview';
import { listRatings } from '../services/rating';
import ReviewList from '../components/ReviewList';
import './Profile.scss';

class IndividualProfile extends Component {
  state = {
    individual: null,
    editModeActive: false,
    name: '',
    email: '',
    description: '',
    reviews: []
  };

  async componentDidMount() {
    const individual = await loadIndividual(this.props.match.params.id);
    // const review = await listRatings();

    this.setState({
      individual,
      name: individual.name,
      email: individual.email,
      description: individual.description,
      // review: review
    });
  }

  toggleEditMode = () => {
    this.setState({
      editModeActive: true
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { name, description, email } = this.state;

    await this.handleProfileEdit(this.state.individual._id, {
      name,
      description,
      email
    });

    this.props.history.push(`/individual/${this.state.individual._id}`);
  };

  handleProfileEdit = async (id, data) => {
    let individual = await editProfile(id, data);

    this.setState({
      individual: individual,
      editModeActive: false
    });
    this.props.onUserChange(individual);
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleReviewCreation = (review) => {
    // this.props.history.push(`/rating/${review._id}`);
  };

  render() {
    const { individual, reviews, name, email, description } = this.state;
    const userId = this.props.user._id;
    return (
      <main>
        <div>
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
                      <h1>Hello, {individual.name}, this is your profile.</h1>
                      <h3>Your information</h3>
                      <div class="personal-rating">
                        <h3>Your rating:</h3>
                        <Rating individual={this.props.match.params.id} />
                      </div>
                    </>
                  )) || (
                    /* or display below copy if the person viewing is not 
                    the owner of the profile, in this case the 
                    taskowner viewing applicant information
                    */
                    <>
                      <h2>Applicant's information</h2>
                      <div class="create-review-box">
                      <h3>Rating:</h3>
                      <Rating individual={this.props.match.params.id} />
                      <CreateReview
                        individual={this.props.match.params.id}
                        onReviewCreation={this.handleReviewCreation}
                      />
                      </div>
                    </>
                  )}
                  <p>
                    <strong>Name: </strong>
                  </p>
                  {individual.name}
                  <p>
                    <strong>Description: </strong>
                  </p>
                  {individual.description}
                  <p>
                    <strong>Email address: </strong>
                  </p>
                  {individual.email}
                  <br/>
                  <div class="list-reviews">
                    <h2>{individual.name}'s reviews:</h2>
                    <ReviewList reviews={reviews} individual={this.props.match.params.id} />
                  </div>
                  <div>
                    {userId === individual._id && (
                      <button className="button" onClick={this.toggleEditMode}>
                        Edit
                      </button>
                    )}
                  </div>
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
