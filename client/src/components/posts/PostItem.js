import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost, likePost, dislikePost } from "../../actions/postActions";
import Moment from 'react-moment';

class PostItem extends Component {
  handleDelete = postId => {
    this.props.deletePost(postId);
  };

  handleDislike = postId => {
    this.props.dislikePost(postId);
  };

  handleLike = postId => {
    this.props.likePost(postId);
  };

  render() {
    const { post, auth } = this.props;
    return (
      <div>
        <div
          style={{
            boxShadow: "0px 0px 25px #F0F0F2",
            marginBottom: "2%",
            borderStyle: "none"
          }}
          className="card card-body"
        >
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="text-muted"><b><Moment fromNow>{post.date}</Moment></b></p>
              <p className="lead">{post.text}</p>

              {/* Only display actions if show actions is true */}

              {!this.props.showActions ? (
                ""
              ) : (
                <div>
                  {" "}
                  <button
                    onClick={() => {
                      this.handleLike(post._id);
                    }}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-info fas fa-thumbs-up" />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      this.handleDislike(post._id);
                    }}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link
                    style={{
                      boxShadow: "0px 6px 20px grey"
                    }}
                    to={`/post/${post._id}`}
                    className="btn btn-primary mr-1 ml-3"
                  >
                    Comments ({post.comments.length})
                  </Link>
                  {/* Delete button is shown if the post belongs to the current logged in user */}
                  {post.user === auth.user.id ? (
                    <button
                      style={{ boxShadow: "0px 10px 30px #FF9898" }}
                      onClick={() => {
                        this.handleDelete(post._id);
                      }}
                      type="button"
                      className="btn btn-danger mr-1 float-right"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deletePost, likePost, dislikePost }
)(PostItem);
