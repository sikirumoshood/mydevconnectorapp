import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Preloader from "../common/Preloader";
import ProfileActions from "../dashboard/ProfileActions";
import { deleteAccount } from "../../actions/profileActions";
import Education from "./Education";
import Experience from "./Experience";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClicked() {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashContent;

    if (profile === null || loading) {
      dashContent = (
        <div style={{ marginLeft: "40%" }}>
          <Preloader />
        </div>
      );
    } else {
      //check if user has a profile

      if (Object.keys(profile).length > 0) {
        dashContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>{" "}
              !
            </p>
            <ProfileActions />
            <div
              style={{
                boxShadow: "0px 0px 15px #F0F0F2",
                padding: "1%",
                marginBottom: "2%"
              }}
            >
              <Experience experiences={profile.experience} />
            </div>

            <div
              style={{
                boxShadow: "0px 0px 15px #F0F0F2",
                padding: "1%",
                marginBottom: "2%"
              }}
            >
              <Education educations={profile.education} />
            </div>

            <div style={{ marginTop: "3%" }}>
              <button
                type="button"
                style={{ boxShadow: "0px 0px 15px #C2788B" }}
                className="btn btn-danger btn-lg"
                onClick={this.onDeleteClicked.bind(this)}
              >
                Delete my account
              </button>
            </div>
          </div>
        );
      } else {
        dashContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}!</p>
            <p className="lead">
              You do not have a profile yet, Let's have a wonderful info about
              you
            </p>
            <Link to="/create-profile" className="btn btn-primary btn-lg">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4">Dashboard</div>
              {dashContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
