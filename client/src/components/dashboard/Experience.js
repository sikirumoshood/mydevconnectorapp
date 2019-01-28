import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Moment from "react-moment";

class Experience extends Component {
  handleDelete = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experiences = this.props.experiences.map((exp, index) => (
      <tr key={exp._id}>
        <td>{index + 1}</td>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            type="button"
            style={{ boxShadow: "0px 0px 15px #FFE4EB" }}
            className="btn btn-lg btn-outline-light"
            onClick={() => this.handleDelete(exp._id)}
          >
            <i className="fa fa-trash text-danger" />
          </button>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <h5 style={{ fontSize: "25px" }} className="display-4">
          Experience credentials
        </h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Company</th>
                <th>Title</th>
                <th>Location</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>{experiences}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

Experience.propTypes = {
  experiences: PropTypes.array.isRequired
};
export default connect(
  null,
  { deleteExperience }
)(Experience);
