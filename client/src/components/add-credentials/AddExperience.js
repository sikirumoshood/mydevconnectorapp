import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newExperience = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(newExperience, this.props.history);
  };

  handleCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="add-experience">
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
                <Link
                  to="/dashboard"
                  style={{ boxShadow: "0px 3px 6px #F0F0F0", color: "white" }}
                  className="btn btn-primary mb-5"
                >
                  <i className="fa fa-long-arrow-alt-left " /> Go back
                </Link>

                <h1 className="display-4 text-center">Add Your Experience</h1>
                <p className="lead text-center">
                  Add any developer/programming positions that you have had in
                  the past
                </p>
                <small className="d-block pb-3 text-danger">
                  * = required field
                </small>
                <form onSubmit={this.handleSubmit}>
                  <TextFieldGroup
                    name="title"
                    placeholder="* Job Title"
                    error={errors.title}
                    onChange={this.handleChange}
                    value={this.state.title}
                  />
                  <TextFieldGroup
                    name="company"
                    placeholder="* Company"
                    error={errors.company}
                    onChange={this.handleChange}
                    value={this.state.company}
                  />

                  <TextFieldGroup
                    name="location"
                    placeholder="The job Location"
                    error={errors.location}
                    onChange={this.handleChange}
                    value={this.state.location}
                  />

                  <h6>From Date</h6>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    error={errors.from}
                    onChange={this.handleChange}
                    value={this.state.from}
                  />
                  <h6>To Date</h6>

                  <TextFieldGroup
                    name="to"
                    type="date"
                    error={errors.to}
                    onChange={this.handleChange}
                    value={this.state.to}
                    disabled={this.state.disabled ? "disabled" : ""}
                  />
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      id="current"
                      onChange={this.handleCheck}
                    />
                    <label className="form-check-label" htmlFor="current">
                      Current Job
                    </label>
                  </div>

                  <TextAreaFieldGroup
                    name="description"
                    placeholder="Job Description"
                    info="Some of your responsabilities, etc"
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                    value="Add"
                  />
                </form>
              </div>
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
AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
