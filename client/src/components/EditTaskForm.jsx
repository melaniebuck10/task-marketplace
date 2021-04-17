import React, { Component } from 'react';

export default class EditTaskForm extends Component {
  render() {
    const {
      task,
      name,
      description,
      price,
      hoursOfWork,
      typeOfWork,
      status,
      assignment,
    } = this.props.values;
    return (
      <div>
        <form onSubmit={this.props.handleFormSubmit}>
          <label htmlFor="input-name">Task name</label>
          <input
            type="text"
            placeholder={task.name}
            name="name"
            value={name && name}
            onChange={(event) => this.props.onChange(event)}
          />
          <label htmlFor="input-description">Description</label>
          <input
            type="text"
            placeholder={task.description}
            name="description"
            value={description && description}
            onChange={(event) => this.props.onChange(event)}
          />
          <label htmlFor="input-assignment">Type of Assignment</label>
          <select
            id="input-assignment"
            name="assignment"
            value={assignment}
            onChange={(event) => this.props.onChange(event)}
            required
          >
            <option value="" disabled>
              Type of task
            </option>
            <option value="single_task">Single Task</option>
            <option value="project">Project</option>
          </select>
          <label htmlFor="input-price">Price in EUR</label>
          <input
            type="number"
            placeholder={task.price}
            name="price"
            value={price && price}
            onChange={(event) => this.props.onChange(event)}
          />
          <label htmlFor="input-hoursOfWork">Hours</label>
          <input
            type="number"
            placeholder={task.hoursOfWork}
            name="hoursOfWork"
            value={hoursOfWork && hoursOfWork}
            onChange={(event) => this.props.onChange(event)}
          />
          <label htmlFor="input-typeOfWork">Type of Work</label>
          <select
            id="input-typeOfWork"
            name="typeOfWork"
            value={typeOfWork}
            onChange={(event) => this.props.onChange(event)}
          >
            <option value="" disabled>
              Type of Work
            </option>
            <option value="physical">Physical</option>
            <option value="administrative">Administrative</option>
          </select>
          <label htmlFor="input-status">Status</label>
          <select
            id="input-status"
            name="status"
            value={status}
            // onChange={this.props.handleInputChange}
            onChange={(event) => this.props.handleInputChange(event)}
            // event)=>this.inputChangedHandler(event)
            required
          >
            <option value="" disabled>
              Status
            </option>
            <option value="open">Open</option>
            <option value="in_process">In Process</option>
            <option value="closed">Closed</option>
          </select>
          <button>Save</button>
        </form>
      </div>
    );
  }
}
