const express = require("express");
const Router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

//@ROUTE: POST  api/post
//@DESC: Creates a post
//@ACCESS Private

Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validation here
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      name: req.user.name,
      text: req.body.text,
      user: req.user.id,
      avatar: req.user.avatar
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        errors = "Error occured saving post";
        return json.status(500).json(errors);
      });
  }
);

//@ROUTE: GET  api/post
//@DESC: Get all posts
//@ACCESS Private

Router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .sort({ date: "desc" })
    .then(posts => res.json(posts))
    .catch(err => {
      errors.posts = "Unable to get posts: DB error";
      res.json(errors);
    });
});

//@ROUTE: GET  api/post/:id
//@DESC: Get post by id
//@ACCESS Public

Router.get("/:id", (req, res) => {
  const errors = {};
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (!post) {
        errors.post = "No post with the given id exists";
        return res.json(errors);
      }

      res.json(post);
    })
    .catch(err => {
      res.json(errors);
    });
});

//@ROUTE: DELETE  api/post/:id
//@DESC: Delete post by id
//@ACCESS Private

Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //check if post belongs to the user

    Post.findOne({ _id: req.params.id })
      .then(post => {
        if (!post) {
          errors.post = "No post with the given id exists";
          return res.json(errors);
        }

        if (post.user.toString() === req.user.id) {
          Post.findOneAndDelete({ _id: req.params.id }).then(post =>
            res.json(post)
          );
        } else {
          errors.post =
            "Unable to delete post: Unauthorized access to someone's post";
          return res.json(errors);
        }
      })
      .catch(err => {
        errors.post = "No post with the given id exists";
        return res.json(errors);
      });
  }
);

//@ROUTE: POST  api/post/like/:post_id
//@DESC: like post
//@ACCESS Private

Router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //check if post belongs to the user

    Post.findOne({ _id: req.params.post_id })
      .then(post => {
        if (!post) {
          errors.post = "No post with the given id exists";
          return res.status(404).json(errors);
        }

        //Like post

        if (
          post.likes.filter(
            likeUser => likeUser.user.toString() === req.user.id
          ).length > 0
        ) {
          return res
            .status(400)
            .json({ message: "You already liked this post" });
        } else {
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => {
        errors.post = "No post with the given id exists";
        return res.status(400).json(errors);
      });
  }
);

//@ROUTE: DELETE api/post/unlike/:post_id
//@DESC: unlike post
//@ACCESS Private

Router.delete(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //check if post belongs to the user

    Post.findOne({ _id: req.params.post_id })
      .then(post => {
        if (!post) {
          errors.post = "No post with the given id exists";
          return res.status(400).json(errors);
        }

        //Like post

        if (
          post.likes.filter(
            likeUser => likeUser.user.toString() === req.user.id
          ).length > 0
        ) {
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        } else {
          errors.unlike = "You have not liked this post";
          return res.status(400).json(errors);
        }
      })
      .catch(err => {
        errors.post = "No post with the given id exists";
        return res.status(400).json(errors);
      });
  }
);

//@ROUTE: POST api/post/comment/:post_id
//@DESC: Add a comment to a post
//@ACCESS Private

Router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar
    };
    //Check if post exists
    Post.findOne({ _id: req.params.post_id })
      .then(post => {
        if (!post) {
          errors.post = "No post with the given id exists";
          return res.status(400).json(errors);
        }

        //Add comment

        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err =>
            res.status(500).json({ saveError: "Unable to save post" })
          );
      })
      .catch(err => {
        errors.post = "No post with the given id exists";
        return res.status(400).json(errors);
      });
  }
);

//@ROUTE: DELETE api/post/comment/:postId/:commentId
//@DESC: Deletes a comment to a post
//@ACCESS Private

Router.delete(
  "/comment/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ _id: req.params.postId })
      .then(post => {
        //Check if the post has the comment

        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.commentId
          ).length > 0
        ) {
          //get comment index

          const removeIndex = post.comments
            .map(comment => comment._id.toString())
            .indexOf(req.params.commentId);

          //check if user owns comment

          if (post.comments[removeIndex].user.toString() === req.user.id) {
            //delete comment
            post.comments.splice(removeIndex, 1);
            post
              .save()
              .then(post => res.json(post))
              .catch(err => res.json({ comment: "Error deleting comment" }));
          } else {
            errors.comment = "You are not authorized to delete someone's post";
            return res.status(401).json(errors);
          }
        } else {
          errors.comment = "No comment exists with this id";
          return res.status(404).json(errors);
        }
      })
      .catch(err => res.json({ error: "something bad happened" }));
  }
);
module.exports = Router;
