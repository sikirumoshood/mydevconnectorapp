import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileCred from "./ProfileCred";
import ProfileHeader from "./ProfileHeader";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getDevProfileByHandle } from "../../actions/devViewActions";
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalidRepo: "",
      currentGithubUser: "" //currentGithubUser keeps track of the githubusername which will be passed in when the repos are fetched
    };
  }

  render() {
    let profileContent;

    const { profile, loading } = this.props.currentDevProfile;
    const { currentGithubUser } = this.state;

    if (
      profile === null ||
      loading === true ||
      this.state.invalidRepo === "" ||
      currentGithubUser === ""
    ) {
      profileContent = (
        <div style={{ marginLeft: "40%" }}>
          <Preloader />
        </div>
      );

      if (this.props.errors.noprofile) {
        this.props.history.push("/notfound");
      }
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/profiles"
                style={{ boxShadow: "0px 3px 6px #F0F0F0", color: "white" }}
                className="btn btn-info mb-4 mr-3 float-left"
              >
                <i className="fa fa-long-arrow-alt-left" /> Back to profiles
              </Link>

              <Link
                to="/dashboard"
                style={{ boxShadow: "0px 3px 6px #F0F0F0", color: "white" }}
                className="btn btn-info mb-4"
              >
                Go to dashboard <i className="fa fa-long-arrow-alt-right " />
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
        </div>
      );
    }

    // Github content logic

    let repoItems;
    if (!this.state.invalidRepo) {
      repoItems = this.props.devprofile.repos.map(repo => (
        <div
          style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
          key={repo.id}
          className="card card-body mb-2"
        >
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link
                  to={repo.html_url}
                  className="text-info"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div
              style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
              className="col-md-6"
            >
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    } else {
      repoItems = (
        <p className="text-muted text-center">
          Github username you provided does not exist.
        </p>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}

              {this.state.invalidRepo === "" ||
              this.state.invalidRepo === null ? (
                ""
              ) : (
                <div>
                  <h4 className="mt-4 pl-3">Github repos</h4>
                  {repoItems}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (this.props.match.params.handle) {
      this.props.getDevProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.devprofile) {
      this.setState({ invalidRepo: nextProps.devprofile.gitHubErrorOcurred });
    }
    if (nextProps.currentDevProfile.profile) {
      this.setState({
        currentGithubUser: nextProps.currentDevProfile.profile.gethubusername
      });
    }
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getDevProfileByHandle: PropTypes.func.isRequired,
  devprofile: PropTypes.object.isRequired,
  currentDevProfile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  devprofile: state.devprofile,
  currentDevProfile: state.devCurrentProfile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getDevProfileByHandle }
)(Profile);
