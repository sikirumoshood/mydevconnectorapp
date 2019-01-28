import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class ProfileItems extends Component {
  render() {
    const { profile } = this.props;
    const skills = profile.skills.map(skill => (
      <div className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    const experiences = profile.experience.map(exp => (
      <li className="list-group-item">
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
      </li>
    ));

    const educations = profile.education.map(edu => (
      <li className="list-group-item">
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
      </li>
    ));

    return (
      <div>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <Link
                      to="/profiles"
                      className="btn btn-light mb-3 float-left"
                    >
                      Back To Profiles
                    </Link>
                  </div>
                  <div className="col-6" />
                </div>

                {/* <!-- Profile Header --> */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                      <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                          <img
                            className="rounded-circle"
                            src={profile.user.avatar}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h1 className="display-4 text-center">
                          {profile.user.name}
                        </h1>
                        <p className="lead text-center">{profile.status}</p>
                        <p>{profile.location}</p>
                        <p>
                          <a className="text-white p-2" href={profile.website}>
                            <i className="fas fa-globe fa-2x" />
                          </a>
                          <a
                            className="text-white p-2"
                            href={profile.social.twitter}
                          >
                            <i className="fab fa-twitter fa-2x" />
                          </a>
                          <a
                            className="text-white p-2"
                            href={profile.social.facebook}
                          >
                            <i className="fab fa-facebook fa-2x" />
                          </a>
                          <a
                            className="text-white p-2"
                            href={profile.social.linkedin}
                          >
                            <i className="fab fa-linkedin fa-2x" />
                          </a>
                          <a
                            className="text-white p-2"
                            href={profile.social.instagram}
                          >
                            <i className="fab fa-instagram fa-2x" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Profile About --> */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                      <h3 className="text-center text-info">
                        {profile.user.name}'s Bio
                      </h3>
                      <p className="lead">{profile.bio}</p>
                      <hr />
                      <h3 className="text-center text-info">Skill Set</h3>
                      <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                          {skills}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Profile Creds --> */}
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    <ul className="list-group">{experiences}</ul>
                  </div>
                  <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    <ul className="list-group">
                      {/* educations */}
                      {educations}
                    </ul>
                  </div>
                </div>

                {/* <!-- Profile Github Here --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItems;
