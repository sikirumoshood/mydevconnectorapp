import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../../utils/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <div
          style={{
            boxShadow: "0px 0px 25px #F0F0F2",
            padding: "3%",
            marginBottom: "2%",
            borderStyle: "none"
          }}
          className="card card-body  mb-3"
        >
          <div className="row">
            <div className="col-2">
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.name}</h3>
              <p>
                {profile.status}{" "}
                {isEmpty(profile.company) ? "" : `at ${profile.company}`}
              </p>
              <p>{isEmpty(profile.location) ? "" : `${profile.location}`}</p>

              <Link
                style={{
                  boxShadow: "0px 6px 20px grey"
                }}
                to={`/profile/${profile.handle}`}
                className="btn btn-md btn-primary"
              >
                View Profile
              </Link>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <h4>Skills Set</h4>
              <ul className="list-group">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <li
                    className="list-group-item"
                    style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
                    key={index}
                  >
                    <i className="fa fa-check pr-1 text-success" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItem;
