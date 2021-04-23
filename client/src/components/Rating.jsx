import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { loadRating } from '../services/rating';

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

  render() {
    const { rating } = this.state;
    
    return ( 
      <main>               
      <div>
        <h3>Rating:</h3>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.state.averageScore}
        />
      </div>
      </main>
    );
  }
}

export default Rating;
