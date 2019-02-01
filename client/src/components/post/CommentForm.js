import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;
    const newCommentData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, newCommentData);
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
                  placeholder="Reply to post"
                  value={this.state.text}
                  error={this.state.errors.text}
                  onChange={this.handleChange}
                />

                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
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
  { addComment }
)(CommentForm);
