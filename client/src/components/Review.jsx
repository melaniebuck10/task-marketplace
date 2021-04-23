const Review = ({ review }) => {
    return (
      <main>
        <div>
          {review.rating}
            <strong>Name: </strong> {review.taskowner.name} {' '} <br/>
            <strong>Review: </strong> {review.review} {' '} <br/>
        </div>
      </main>
    );
  };
  
  export default Review;
  