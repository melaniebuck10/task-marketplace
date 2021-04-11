import React, { Component } from 'react';
import { loadIndividual } from '../services/individual';
import Rating from '../components/Rating';

class IndividualProfile extends Component {
  state = {
    individual: null
  };

  async componentDidMount() {
    const individual = await loadIndividual(this.props.match.params.id);
    this.setState({ individual });
  }

  render() {
    const { individual } = this.state;
    return (
      <div>
        {individual && (
          <>
            <h1>Hello, {individual.name}, this is your profile.</h1>
          </>
        )}
        <Rating>{this.props.rating}</Rating>

        <button>Edit Profile</button>
      </div>
    );
  }
}

export default IndividualProfile;
