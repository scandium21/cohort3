import React, { Component } from "react";
import "./Pokecard.css";

function Pokecard(props) {
  return (
    <div className="Pokecard">
      <h2 style={{ color: "blue" }}>{props.name}</h2>
      <img src={props.image} />
      <div>Type: {props.type}</div>
    </div>
  );
}

export default Pokecard;
