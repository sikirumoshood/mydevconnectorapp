import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true
    };
  }
  handleDelete = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId } = this.props;
    const { user } = this.props.auth;

    const duration = 400;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    };

    const transitionStyles = {
      entering: { opacity: 0.01 },
      entered: { opacity: 1 },
      exiting: { opacity: 0.01 },
      exited: { opacity: 0 }
    };

    const commentItem = (
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
                    this.setState({ animate: false }); //Triggers fadding out
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
    );
    return (
      <div>
        {/* appear is required to make the component animate on load other wise it won't. But if the in is toggled later
            you don't need appear.
      */}
        <Transition
          in={this.state.animate}
          appear={true}
          timeout={duration}
          unmountOnExit
        >
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {commentItem}
            </div>
          )}
        </Transition>
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
