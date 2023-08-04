// QuizResult.js
import React from "react";
import { Typography, Box } from "@mui/material";

const QuizResult = ({ score, totalQuestions }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
        Results:
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        You scored {score} out of {totalQuestions}
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Percentage is {percentage}% out of 100%
      </Typography>
    </Box>
  );
};

export default QuizResult;