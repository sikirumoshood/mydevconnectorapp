import React, { Component } from "react";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
class Posts extends Component {
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading === true) {
      postContent = (
        <div style={{ marginLeft: "40%" }}>
          <Preloader />
        </div>
      );
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getPosts();
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
