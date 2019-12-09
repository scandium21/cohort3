import React from "react";

const Card = props => {
  return (
    <div>
      <div className="card-main">
        <span>{props.face}</span>
      </div>
    </div>
  );
};

export default Card;
