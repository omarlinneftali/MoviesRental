import React, { Component } from "react";

const Like = ({ liked, onLiked }) => {
  let classes = "fa fa-heart";

  if (!liked) classes += "-o";

  return (
    <i
      className={classes}
      onClick={onLiked}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
