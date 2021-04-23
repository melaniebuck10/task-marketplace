import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Review from './Review';


const ReviewList = ({ reviews }) => {
    return (
      <main>
        {/* <div>
          {reviews.map((review) => (
            <div key={review._id}>
                <Review review={review} />
            </div>
          ))}
        </div> */}
      </main>
    );
  }
  

export default ReviewList;
