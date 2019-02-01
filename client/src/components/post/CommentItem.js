import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
import PropTypes from "prop-types";

class CommentItem extends Component {
  handleDelete = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId } = this.props;
    const { user } = this.props.auth;
    return (
      <div>
        <div
          style={{
            boxShadow: "0px 0px 25px #F0F0F2",
            marginBottom: "2%",
            borderStyle: "none"
          }}
          className="card card-body mb-3"
        >
          <div className="row">
            <div className="col-md-2">
              <a>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={comment.avatar}
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">{comment.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">
                {comment.text}
                {comment.user === user.id ? (
                  <button
                    onClick={() => {
                      this.handleDelete(postId, comment._id);
                    }}
                    type="button"
                    style={{ boxShadow: "0px 10px 30px #FF9898" }}
                    className="btn btn-danger mr-1 ml-3 float-right"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
