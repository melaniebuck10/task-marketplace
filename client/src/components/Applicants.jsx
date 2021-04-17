import { Component } from 'react';

class Applicants extends Component {
  state = {
    applicants: [],
    tasks: null // 6075cefed4b7f53a2c72ec08
  };

  async componentDidMount() {
    const appliedTasks = await loadAppliedTasks(this.props.match.params.id);
    console.log(appliedTasks);
    this.setState({ tasks: appliedTasks });
  }

  render() {
    return <div></div>;
  }
}

export default Applicants;
