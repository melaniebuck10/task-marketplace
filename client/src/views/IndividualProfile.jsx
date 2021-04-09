import { Component } from 'react';
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
      <main>
        {individual && (
          <>
            <h1>{individual.name}</h1>
          </>
        )}
        <Rating>{this.props.rating}</Rating>
      </main>
    );
  }
}

export default IndividualProfile;
