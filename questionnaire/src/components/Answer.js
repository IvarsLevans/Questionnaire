// Answer.js
import React from "react";
import { Button } from "@mui/material";

const Answer = ({ answer, isSelected, isCorrect, onClick }) => {
  let color = "primary"; // Default color

  if (isSelected) {
    color = isCorrect ? "success" : "error";
  }

  return (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      color={color}
      onClick={onClick}
      disabled={isSelected}
      fullWidth
      sx={{ my: 1 }}
    >
      {answer}
    </Button>
  );
};

export default Answer;
