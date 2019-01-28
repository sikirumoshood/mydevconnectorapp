import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Moment from "react-moment";

class Education extends Component {
  handleDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const educations = this.props.educations.map((edu, index) => (
      <tr key={edu._id}>
        <td>{index + 1}</td>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            type="button"
            style={{ boxShadow: "0px 0px 15px #FFE4EB" }}
            className="btn btn-lg btn-outline-light"
            onClick={() => this.handleDelete(edu._id)}
          >
            <i className="fa fa-trash text-danger" />
          </button>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <h5 style={{ fontSize: "25px" }} className="display-4">
          Education credentials
        </h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>School</th>
                <th>Degree</th>
                <th>Field of Study</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>{educations}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

Education.propTypes = {
  educations: PropTypes.array.isRequired
};
export default connect(
  null,
  { deleteEducation }
)(Education);
