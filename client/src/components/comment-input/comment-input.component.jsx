import React from "react";
import agent from "api/agent";
import { connect } from "react-redux";

import { addComment } from "redux/article/article.actions";

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = { body: "" };
  }

  setBody = event => this.setState({ body: event.target.value });

  createComment = event => {
    event.preventDefault();
    this.props.onSubmit(
      agent.Comments.create(this.props.slug, { body: this.state.body })
    );
    this.setState({ body: "" });
  };
  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div>
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment"
              value={this.state.body}
              onChange={this.setBody}
              rows="3"
            />
          </div>

          <div className="card-footer">
            <img
              src={this.props.currentUser.image}
              className="comment-author-img"
              alt="author"
            />
            <button className="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch(addComment(payload))
});

export default connect(null, mapDispatchToProps)(CommentInput);
