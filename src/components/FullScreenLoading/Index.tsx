import React from "react";
import "./Index.scss";

const defaultText = "Please wait. Loading data... ";

export default function FullScreenLoading({ text = defaultText }: { text?: string }) {
  return (
    <div className="FullScreenLoading">
      <h4>{text}</h4>
      <div className="loader" />
    </div>
  );
}
