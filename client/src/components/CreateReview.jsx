import React from 'react';
import { createRating } from '../services/rating';
// loadRating, listRatings, loadRatingIndividual  --> to be added to above once used
// import Rating from './Rating';
import StarRatingComponent from 'react-star-rating-component';

class CreateReview extends React.Component {
  state = {
    rating: 1,
    review: '',
    editModeActive: false
  };

  toggleTaskEditMode = () => {
    this.setState({
      editModeActive: true
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { rating, review } = this.state;
    const individual = this.props.individual;
    const data = { individual, rating, review };

    const newReview = await createRating(data);

    this.setState({
      rating: rating,
      review: review,
      editModeActive: false
    });

    this.props.onReviewCreation(newReview);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  render() {
    const { rating } = this.state;
    // const userId = this.props.user._id;
    return (
      <main class="create-review">
        {(this.state.editModeActive && (
          <form onSubmit={this.handleFormSubmission}>
            <h2>Your overall experience</h2>
            <StarRatingComponent
              name="create-review-rating-input"
              starCount={5}
              value={rating}
              onStarClick={this.handleStarClick}
            />

            <label htmlFor="input-review">Leave here your review</label>
            <textarea
              id="input-review"
              name="review"
              placeholder="Leave here your review about this person..."
              value={this.state.review}
              onChange={this.handleInputChange}
              minLength="50"
              required
            />
            <button>Submit review</button>
          </form>
        )) || (
          // {userId === taskowner && (
          <button onClick={this.toggleTaskEditMode}>
            <strong>Click here to leave your review</strong>
          </button>
        )}
      </main>
    );
  }
}

export default CreateReview;
