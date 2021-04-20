import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { loadRating, } from '../services/rating';
//createRating, listRatings, loadRatingIndividual --> to be added to above when used
//import CreateReview from './CreateReview';
 
class Rating extends React.Component {
  state = {
    rating: 1
  }

      async componentDidMount() {
      const rating = await loadRating(
        this.props.individual,
      );
      this.setState({ rating });
    }
 
  // onStarClick(nextValue, prevValue, name) {
  //   const newReview = await createRating( );
  //   this.setState({rating: nextValue});
  // }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          //onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default Rating;

