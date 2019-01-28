import React, { Component } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(loginData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
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
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <small style={{ color: "red" }}>
                * <i>indecates required field.</i>
              </small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="* Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />

                <TextFieldGroup
                  type="password"
                  error={errors.password}
                  placeholder="* Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <input
                  type="submit"
                  value="Login"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
