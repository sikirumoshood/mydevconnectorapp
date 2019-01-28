import React, { Component } from "react";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const firstname = profile.user.name.trim().split(" ")[1];
    const skills = profile.skills.map((skill, index) => (
      <div
        style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
        key={index}
        className="p-3"
      >
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div
            style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
            className="card card-body bg-light mb-3"
          >
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
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
    );
  }
}

export default ProfileAbout;
