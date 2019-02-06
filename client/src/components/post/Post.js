import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import Preloader from "../common/Preloader";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import { Link } from "react-router-dom";
import CommentFeed from "../post/CommentFeed";

class Post extends Component {
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading) {
      postContent = (
        <div style={{ marginLeft: "40%" }}>
          <Preloader />
        </div>
      );
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed comments={post.comments} postId={post._id} />
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/feed"
                style={{ boxShadow: "0px 3px 6px #F0F0F0", color: "white" }}
                className="btn btn-primary mb-5"
              >
                <i className="fa fa-long-arrow-alt-left " /> Back to feed
              </Link>

              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
