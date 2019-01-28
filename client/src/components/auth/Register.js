import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // register newUser;
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="register">
          <div className="container">
            <div className="row">
              <div
                className="col-md-10 m-auto"
                style={{
                  boxShadow: "0px 0px 15px #F0F0F2",
                  padding: "3%",
                  marginBottom: "2%"
                }}
              >
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <p>
                  <small style={{ color: "red" }}>
                    * <i>indecates required field.</i>
                  </small>
                </p>
                <form onSubmit={this.handleSubmit}>
                  <TextFieldGroup
                    type="text"
                    error={errors.name}
                    placeholder="* Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />

                  <TextFieldGroup
                    type="email"
                    error={errors.email}
                    placeholder="* Email address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    info="This site uses Gravatar so if you want a profile image,
                  use a Gravatar email"
                  />

                  <TextFieldGroup
                    type="password"
                    error={errors.password}
                    placeholder="* Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <TextFieldGroup
                    type="password"
                    error={errors.password2}
                    placeholder="* Confirm password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
