import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../../actions/profileActions";
import Preloader from "../../common/Preloader";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading === true) {
      profileItems = (
        <div style={{ marginLeft: "40%" }}>
          <Preloader />
        </div>
      );
    } else {
      //Check to see if profile is empty
      if (profiles.length > 0) {
        profileItems = profiles.map((item, index) => (
          <ProfileItem key={index} profile={item} />
        ));
      } else {
        profileItems = (
          <p style={{ fontSize: "20px" }} className="display-4">
            Ooops! There are no profiles for display.
          </p>
        );
      }
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                Developer Profiles
                <p className="lead">Browse and connect with developers</p>
              </h1>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getProfiles();
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
