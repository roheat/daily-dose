import React from "react";
import ListErrors from "components/list-errors/list-errors.component";
import agent from "api/agent";
import { connect } from "react-redux";

class EditorPage extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();

        return this.props.onLoad(
          agent.Articles.get(this.props.match.params.slug)
        );
      }

      this.props.onLoad(null);
    }
  }

  componentDidMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(
        agent.Articles.get(this.props.match.params.slug)
      );
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  watchEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.onAddTag();
    }
  };

  handleRemoveTag = tag => {
    this.props.onRemoveTag(tag);
  };

  submitForm = event => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    const article = {
      title,
      description,
      body,
      tagList
    };

    const slug = { slug: this.props.articleSlug };

    const promise = this.props.articleSlug
      ? agent.Articles.update({ ...article, ...slug })
      : agent.Articles.create(article);

    this.props.onSubmit(promise);
  };

  render() {
    const { title, description, body, tagList } = this.state;

    const { errors, loading } = this.props;
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={errors} />

              <form>
                <div>
                  <div className="form-group">
                    <input
                      name="title"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      name="description"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Describe your article in a few words..."
                      value={description}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      name="body"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Write your article (using markdown)"
                      value={body}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      name="tags"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Enter tags"
                      value={tagList}
                      onChange={this.handleChange}
                      onKeyUp={this.watchEnter}
                    />
                  </div>

                  <div className="tag-list">
                    {tagList.map(tag => (
                      <span className="tag-default tag-pill" key="tag">
                        <i
                          className="ion-close-round"
                          onClick={() => this.handleRemoveTag(tag)}
                        />
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-lg pul-xs-right btn-primary"
                    disabled={loading}
                    onClick={this.submitForm}
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: "ADD_TAG" }),
  onLoad: payload => dispatch({ type: "EDITOR_PAGE_LOADED", payload }),
  onRemoveTag: tag => dispatch({ type: "REMOVE_TAG", tag }),
  onSubmit: payload => dispatch({ type: "ARTICLE_SUBMITTED", payload }),
  onUnload: () => dispatch({ type: "EDITOR_PAGE_UNLOADED" })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
