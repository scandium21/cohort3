import React from "react";

const Card = props => {
  let { face, bkgc } = props;
  return (
    <div>
      <div
        className="card-main"
        style={{
          //borderLeft: "1px solid black",
          //borderRight: "1px solid black",
          boxShadow: "7px 5px 12px -5px rgba(0, 0, 0, 0.56)",
          borderRadius: "5px",
          margin: "2%",
          backgroundColor: bkgc + "22"
        }}
      >
        <span style={{ fontSize: "3em", padding: "2%" }}>{face}</span>
      </div>
    </div>
  );
};

export default Card;
