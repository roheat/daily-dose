import React from "react";

const FollowButton = ({ isUser, user, follow, unfollow }) => {
  if (isUser) return null;

  let classes = `btn btn-sm action-btn ${
    user.following ? "btn-secondary" : "btn-outline-secondary"
  }`;

  const handleClick = event => {
    event.preventDefault();

    if (user.following) unfollow(user.username);
    else follow(user.username);
  };

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round" /> {user.following ? "Unfollow" : "Follow"}{" "}
      {user.username}
    </button>
  );
};

export default FollowButton;
