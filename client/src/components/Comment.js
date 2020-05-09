import React from "react";

export const Comment = (props) => {
  return (
    <React.Fragment>
      <strong className="commentTitle">{props.username}</strong>
      <p>"{props.body}"</p>
      <hr></hr>
    </React.Fragment>
  );
};
