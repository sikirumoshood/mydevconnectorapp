import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileCred from "./ProfileCred";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileActions";
class Profile extends Component {
  render() {
    let profileContent;

    const { profile, loading } = this.props.profile;

    if (profile === null || loading === true) {
      profileContent = (
        <div style={{ marginLeft: "40%" }}>
          <Preloader />
        </div>
      );
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/profiles"
                style={{ boxShadow: "0px 3px 6px #F0F0F0" }}
                className="btn btn-light mb-3 float-left"
              >
                Back to profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCred
            experiences={profile.experience}
            educations={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : (
            ""
          )}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
