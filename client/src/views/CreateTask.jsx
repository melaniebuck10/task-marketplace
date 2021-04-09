import React, { Component } from 'react';
import { createTask } from './../services/task';

// HAVE NOT FIGURED OUT WHY SUBMITTING THE FORM GIVES A 500 RESPONSE
class CreateTask extends Component {
  state = {
    name: '',
    assignment: '',
    description: '',
    price: '',
    hourOfWork: '',
    typeOfWork: '',
    status: '',
    // pictures: '',
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const {
      name,
      assignment,
      description,
      price,
      hourOfWork,
      typeOfWork,
      status,
    } = this.state;
    const data = {
      name,
      assignment,
      description,
      price,
      hourOfWork,
      typeOfWork,
      status,
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
    const task = await createTask(body);
    this.props.history.push(`/task/${task._id}`);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileInputChange = (event) => {
    const { name, files } = event.target;
    const arrayOfFiles = [];
    for (const file of files) arrayOfFiles.push(file);
    this.setState({
      [name]: arrayOfFiles,
    });
  };

  render() {
    return (
      <main>
        <header>
          <h1>Add a task</h1>
        </header>

        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />

          <div className="row">
            <div className="col">
              <label htmlFor="input-assignment">Type of Assignment</label>
              <select
                id="input-assignment"
                name="assignment"
                value={this.state.assignment}
                onChange={this.handleInputChange}
                required
              >
                <option value disabled>
                  Assignment
                </option>
                <option value="single_task">Single Task</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>

          <label htmlFor="input-description">Description</label>
          <textarea
            id="input-description"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />

          <div className="col">
            <label htmlFor="input-typeOfWork">Type of Work</label>
            <select
              id="input-typeOfWork"
              name="typeOfWork"
              value={this.state.typeOfWork}
              onChange={this.handleInputChange}
            >
              <option value="">Non-specified</option>
              <option value="physical">Physical</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="input-price">
                How much can I pay you for this in EUR
              </label>
              <input
                id="input-price"
                name="price"
                type="number"
                placeholder="Price"
                min="0"
                value={this.state.price}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>

          <label htmlFor="input-hourOfWork">
            Approximate amount of hours required to complete the job
          </label>
          <input
            id="input-hourOfWork"
            name="hourOfWork"
            type="number"
            placeholder="Amount Of Hours"
            value={this.state.hourOfWork}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-pictures">Pictures</label>
          <input
            id="input-pictures"
            type="file"
            name="pictures"
            multiple
            disabled
            onChange={this.handleFileInputChange}
          />

          <div className="col">
            <label htmlFor="input-status">Task Status</label>
            <select
              id="input-status"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>
                Status
              </option>
              <option value="open">Open</option>
              <option value="in_process">In Process</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button>List job</button>
        </form>
      </main>
    );
  }
}

export default CreateTask;
