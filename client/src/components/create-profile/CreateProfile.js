import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(newProfile, this.props.history);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const socialNetworkComponents = (
      <div>
        {" "}
        <InputGroup
          name="twitter"
          placeholder="Twitter URL"
          value={this.state.twitter}
          error={this.state.errors.twitter}
          onChange={this.handleChange}
          icon="fab fa-twitter"
        />
        <InputGroup
          name="facebook"
          placeholder="Facebook URL"
          value={this.state.facebook}
          error={this.state.errors.facebook}
          onChange={this.handleChange}
          icon="fab fa-facebook"
        />
        <InputGroup
          name="linkedin"
          placeholder="Linkedin URL"
          value={this.state.linkedin}
          error={this.state.errors.linkedin}
          onChange={this.handleChange}
          icon="fab fa-linkedin"
        />
        <InputGroup
          name="youtube"
          placeholder="Youtube URL"
          value={this.state.youtube}
          error={this.state.errors.youtube}
          onChange={this.handleChange}
          icon="fab fa-youtube"
        />
        <InputGroup
          name="instagram"
          placeholder="Instagram URL"
          value={this.state.instagram}
          error={this.state.errors.instagram}
          onChange={this.handleChange}
          icon="fab fa-instagram"
        />
      </div>
    );

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div
              className="col-md-8 m-auto"
              style={{
                boxShadow: "0px 0px 15px #F0F0F2",
                padding: "1%",
                marginBottom: "2%"
              }}
            >
              <Link to="/dashboard" className="btn btn-light btn-lg">
                <i className="fa fa-long-arrow-alt-left text-muted" /> Go back
              </Link>
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3 text-danger">
                * indicates required fields
              </small>

              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  info="A unique handle for your profile URL. Your full name, company name or nickname"
                  error={this.state.errors.handle}
                  onChange={this.handleChange}
                />

                <SelectListGroup
                  placeholder="* Select Professional Status"
                  name="status"
                  value={this.state.status}
                  error={this.state.errors.status}
                  info="Give us an idea of where you are at in your career"
                  onChange={this.handleChange}
                  options={[
                    { label: "Developer", value: "Developer" },
                    { label: "Junior Developer", value: "Junior Developer" },
                    { label: "Senior Developer", value: "Senior Developer" },
                    { label: "Manager", value: "Manager" },
                    {
                      label: "Student or Learning",
                      value: "Student or Learning"
                    },
                    { label: "Instructor", value: "Instructor" },
                    { label: "Intern", value: "Intern" },
                    { label: "Other", value: "Other" }
                  ]}
                />

                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  error={this.state.errors.company}
                  info="Could be your own company or one you work for"
                  onChange={this.handleChange}
                />

                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  error={this.state.errors.website}
                  info="Could be your own website or one you work for"
                  onChange={this.handleChange}
                />

                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  error={this.state.errors.location}
                  info="City and state suggested (eg. Lagos City, Nigeria)"
                  onChange={this.handleChange}
                />

                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  error={this.state.errors.skills}
                  info="Please use comma separated values ( eg.
                      HTML,CSS,JavaScript,PHP )"
                  onChange={this.handleChange}
                />

                <TextFieldGroup
                  name="githubusername"
                  placeholder="Github username"
                  value={this.state.githubusername}
                  error={this.state.errors.githubusername}
                  info=" If you want your latest repos and a Github link, include
                    your username"
                  onChange={this.handleChange}
                />

                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  value={this.state.bio}
                  error={this.state.errors.bio}
                  onChange={this.handleChange}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      let displaySocialInputs = this.state.displaySocialInputs;
                      displaySocialInputs = !displaySocialInputs;
                      this.setState({ displaySocialInputs });
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {this.state.displaySocialInputs ? socialNetworkComponents : ""}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  withRouter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, withRouter }
)(withRouter(CreateProfile));
