import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader">
      <div className="spinner" />
      <div>{text}</div>
    </div>
  );
}
