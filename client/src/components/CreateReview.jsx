import React from 'react';
import { createRating } from '../services/rating';
// loadRating, listRatings, loadRatingIndividual  --> to be added to above once used
import Rating from './Rating';

class CreateReview extends React.Component {
    state = {
        rating: '',
        review: '',
        editModeActive: false,
    };

    toggleTaskEditMode = () => {
      this.setState({
        editModeActive: true,
        // newTaskTitle: this.props.task.title
      });
    };

    handleFormSubmission = async (event) => {
        event.preventDefault();
        const {
          rating,
          review,
        } = this.state;
        const data = {
          rating,
          review
        };
        const body = new FormData();
        for (let key in data) {
          const value = data[key];
          if (value instanceof Array) {
            for (let item of value) {
              body.append(key, item);
            }
          } else {
            body.append(key, value);
          }
        }
        const newReview = await createRating(body);
        // this.props.history.push(`/rating/${newReview._id}`);
        this.props.history.push(`/individual/${newReview._id}`);
        this.setState({ editModeActive: false });
      };

      handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      };


    // async componentDidMount() {
    //   const rating = await listRatings(
    //     this.props.match.params.id,
    //   );
    //   this.setState({ rating: ratingOfIndividual });
    // }
   
    onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }
   
    render() {
      const { rating } = this.state;
      return (                
        <main>
        {(this.state.editModeActive && (
        <form onSubmit={this.handleFormSubmission}>
          <h2>Your overall experience</h2>
          <Rating 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
          />

          <label htmlFor="input-review">Leave here your review</label>
          <textarea
            id="input-review"
            name="review"
            placeholder="Leave here your review about this person..."
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
          <button>Submit review</button>
        </form>
          )) || (
          <button onClick={this.toggleTaskEditMode}><strong>Click here to leave your review</strong></button>
          )}
        </main>
      );
    }
  }


export default CreateReview;