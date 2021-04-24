import React from 'react';
import { createRating } from '../services/rating';
// loadRating, listRatings, loadRatingIndividual  --> to be added to above once used
// import Rating from './Rating';
import StarRatingComponent from 'react-star-rating-component';
import { listRatings } from '../services/rating';

class CreateReview extends React.Component {
  state = {
    rating: 1,
    review: [],
    editModeActive: false,
  };

  async componentDidMount() {
    const review = await listRatings();
    this.setState({ review: review });
  }

  toggleTaskEditMode = () => {
    this.setState({
      editModeActive: true,
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { rating, review } = this.state;
    const individual = this.props.individual;
    const data = { individual, rating, review };

    const newReview = await createRating(data);

    // this.props.history.push(`/rating/${newReview._id}`);

    this.setState({
      rating: rating,
      review: review,
      editModeActive: false,
    });

    this.props.onReviewCreation(newReview);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  render() {
    const { rating } = this.state;
    return (
      <main className="create-review">
        {(this.state.editModeActive && (
          <form onSubmit={this.handleFormSubmission}>
            <h3>Rate this person:</h3>
            <StarRatingComponent
              name="create-review-rating-input"
              starCount={5}
              value={rating}
              onStarClick={this.handleStarClick}
            />
            <button>Submit</button>
          </form>
        )) || (
          <button onClick={this.toggleTaskEditMode}>
            <strong>Click here to rate this person</strong>
          </button>
        )}
      </main>
    );
  }
}

export default CreateReview;
