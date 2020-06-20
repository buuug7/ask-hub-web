import React from "react";
import "./FullScreenLoading.scss";

const defaultText = "Please wait. Loading data... ";

function FullScreenLoading({ text = defaultText }: { text?: string }) {
  return (
    <div className="FullScreenLoading">
      <h4>{text}</h4>
      <div className="loader" />
    </div>
  );
}

export default FullScreenLoading;
