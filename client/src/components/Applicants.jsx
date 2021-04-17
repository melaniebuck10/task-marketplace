import { Component } from 'react';
import { loadTaskApplicants } from './../services/taskownerInfo';

class Applicants extends Component {
  state = {
    applicants: [],
    tasks: null // 6075cefed4b7f53a2c72ec08
  };

  async componentDidMount() {
    //   ID RETRIEVAL ISSUE WITH PROPS
    const applicants = await loadTaskApplicants('6078787b1562695cb045068b');
    console.log('APPLICANTS', applicants);
    this.setState({ applicants });
  }

  render() {
    return (
      <div>
        {this.state.applicants.map((applicant) => (
          <li key={applicant._id}>{applicant.individual.name}</li>
        ))}
      </div>
    );
  }
}

export default Applicants;
