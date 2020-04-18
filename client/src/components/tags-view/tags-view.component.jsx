import React from "react";
import { Link } from "react-router-dom";
import agent from "api/agent";

const TagsView = props => {
  const handleClick = tag => {
    props.onClickTag(tag, agent.Articles.byTag(tag));
  };

  if (props.tags)
    return (
      <div className="tag-list">
        {props.tags.map(tag => (
          <Link
            to=""
            className="tag-default tag-pill"
            key={tag}
            onClick={() => handleClick(tag)}
          >
            {tag}
          </Link>
        ))}
      </div>
    );

  return null;
};

export default TagsView;
