import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

class PostItem extends Component {
  deletePost = postId => {
    console.log("delete" + postId);
  };
  render() {
    const { post, auth } = this.props;

    return (
      <div>
        <div className="card card-body mb-3">
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
              <p className="lead">{post.text}</p>
              <button type="button" className="btn btn-light mr-1">
                <i className="text-info fas fa-thumbs-up" />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {/* Delete button is shown if the post belongs to the current logged in user */}
              {post.user === auth.user.id ? (
                <button
                  onClick={() => {
                    this.deletePost(post._id);
                  }}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : (
                ""
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PostItem);
