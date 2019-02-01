import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {}
    };
  }

  handleChange = e => {
    //Accepts only 300 characters
    if (e.target.value.length <= 300) {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
  };
  render() {
    return (
      <div>
        <div>
          <div
            style={{
              boxShadow: "0px 0px 25px #F0F0F2",
              marginBottom: "2%",
              borderStyle: "none"
            }}
            className="card card-info"
          >
            <div className="card-header bg-primary text-white">
              Say Somthing...
            </div>

            <div
              style={{
                boxShadow: "0px 0px 25px #F0F0F2",
                marginBottom: "2%",
                borderStyle: "none"
              }}
              className="card-body"
            >
              <form onSubmit={this.handleSubmit}>
                <TextAreaFieldGroup
                  name="text"
                  placeholder="Create a post"
                  value={this.state.text}
                  error={this.state.errors.text}
                  onChange={this.handleChange}
                />

                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
                <span className="float-right">
                  {this.state.text.length} / 300
                </span>
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
