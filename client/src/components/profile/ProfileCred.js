import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
class ProfileCred extends Component {
  render() {
    const experiences = this.props.experiences.map(exp => (
      <li
        style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
        key={exp._id}
        className="list-group-item"
      >
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD-MM-YYYY">{exp.from}</Moment> - (
          {exp.to ? <Moment format="DD-MM-YYYY">{exp.to}</Moment> : "Now"})
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          <strong>Description:</strong> {exp.description}
        </p>
        <hr style={{ opacity: 0.7 }} />
      </li>
    ));

    const educations = this.props.educations.map(edu => (
      <li
        style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
        key={edu._id}
        className="list-group-item"
      >
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD-MM-YYYY">{edu.from}</Moment> - (
          {edu.to ? <Moment format="DD-MM-YYYY">{edu.to}</Moment> : "Now"})
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          <strong>Description:</strong>
          {edu.description}
        </p>
        <hr style={{ opacity: 0.7 }} />
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {experiences.length > 0 ? (
              experiences
            ) : (
              <p className="text-muted text-center">
                No experience details added yet.
              </p>
            )}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {/* educations */}
            {educations.length > 0 ? (
              educations
            ) : (
              <p className="text-muted text-center">
                No education details added yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
ProfileCred.propTypes = {
  experiences: PropTypes.array.isRequired,
  educations: PropTypes.array.isRequired
};
export default ProfileCred;
