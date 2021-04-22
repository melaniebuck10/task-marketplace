import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { loadRating } from '../services/rating';
//createRating, listRatings, loadRatingIndividual --> to be added to above when used
//import CreateReview from './CreateReview';

class Rating extends React.Component {
  state = {
    averageScore: 1,
    ratings: []
  };

  async componentDidMount() {
    const ratings = await loadRating(this.props.individual);
    this.setState({ ratings });
    this.reviewScore();
  }

  reviewScore = () => {
    const reducer = (accumulator, currentValue) => {
      return accumulator + currentValue;
    };
    const ratingScores = this.state.ratings.map((item) => item.rating);
    const addScores = ratingScores.reduce(reducer, 0);
    const averageScores = addScores / ratingScores.length;

    this.setState((prevState) => {
      return { averageScore: averageScores };
    });
  };

  // onStarClick(nextValue, prevValue, name) {
  //   const newReview = await createRating( );
  //   this.setState({rating: nextValue});
  // }

  render() {
    const { rating } = this.state;
    return (
      <div class="average-rating">
        <h2>Rating:</h2>
        <br />
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={this.state.averageScore}
          // onChange={(event) => this.props.onChange(event)}
          // onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default Rating;
