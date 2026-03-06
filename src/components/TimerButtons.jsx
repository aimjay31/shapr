import React from "react";
import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const TimerButtons = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}   // this triggers the click
      style={{
        padding: "10px 20px",
        margin: "5px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px"
      }}
      >
      {title}
    </button>
  );
};

const TimerButton = styled(Button)({
  border: 0,
  borderRadius: 3,
  color: "white",
  height: 48,
  padding: "0 30px"
});

export default TimerButtons;