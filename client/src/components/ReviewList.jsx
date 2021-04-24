import React, { Component } from 'react';
import Review from './Review';

class ReviewList extends Component {
  render() {
    return (
      <div>
          {this.props.reviews.map((review) => (
            <div key={review._id}>
                <Review review={review} />
            </div>
          ))}
      </div>
    );
  }
}
  

export default ReviewList;
