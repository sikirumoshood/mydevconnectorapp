import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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

    const newEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(newEducation, this.props.history);
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
        <div className="add-education">
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
                  <i className="fa fa-long-arrow-alt-left" /> Go back
                </Link>
                <h1 className="display-4 text-center">Add Education Info</h1>
                <p className="lead text-center">
                  Any info about past or present achievements in education.
                </p>
                <small className="d-block pb-3 text-danger">
                  * = required field
                </small>
                <form onSubmit={this.handleSubmit}>
                  <TextFieldGroup
                    name="school"
                    placeholder="* School"
                    error={errors.school}
                    onChange={this.handleChange}
                    value={this.state.school}
                  />
                  <TextFieldGroup
                    name="degree"
                    placeholder="* Degree or certification"
                    error={errors.degree}
                    onChange={this.handleChange}
                    value={this.state.degree}
                  />

                  <TextFieldGroup
                    name="fieldofstudy"
                    placeholder="* Field of study"
                    error={errors.fieldofstudy}
                    onChange={this.handleChange}
                    value={this.state.fieldofstudy}
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
                      Current education ?
                    </label>
                  </div>

                  <TextAreaFieldGroup
                    name="description"
                    placeholder="Study description"
                    info="Give us a brief description of education experience or program."
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
