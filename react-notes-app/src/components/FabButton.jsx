import React from "react";
import { useNavigate } from "react-router-dom";
import "./FabButton.css";

const FabButton = () => {
  const navigate = useNavigate();
  console.log("FabButton rendered!");
  return (
    <button className="fab" onClick={() => navigate("/add-note")}>
      +
    </button>
  );
};

export default FabButton;
