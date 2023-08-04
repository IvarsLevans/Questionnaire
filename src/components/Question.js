// Question.js
import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import _ from "lodash";

const Question = ({ questionData, onAnswerSelect, timeLeft }) => {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  useEffect(() => {
    const answerOptions = [...questionData.incorrect_answers, questionData.correct_answer];
    setAnswers(_.shuffle(answerOptions));
    setSelectedAnswer(""); // reset the selected answer
    setIsAnswered(false); // reset the answered state
    setIsCorrectAnswer(false); // reset the correct answer state
  }, [questionData]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === questionData.correct_answer;
    setIsCorrectAnswer(isCorrect);

    setTimeout(() => {
      onAnswerSelect(isCorrect);
      setIsAnswered(false); // Reset the isAnswered state after one second
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
        {questionData.category}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        {questionData.question}
      </Typography>
      <Typography variant="caption" display="block">
        Time left: {timeLeft} seconds
      </Typography>
      <LinearProgress variant="determinate" value={(timeLeft / 10) * 100} />
      {answers.map((answer, index) => (
        <Button
          variant={selectedAnswer === answer ? "contained" : "outlined"}
          style={{
            backgroundColor:
              selectedAnswer === answer && isAnswered
                ? isCorrectAnswer
                  ? "rgba(0, 128, 0, 0.5)" // Dark green with 50% opacity
                  : "rgba(255, 0, 0, 0.5)" // Red with 50% opacity
                : "",
            color:
              selectedAnswer === answer && isAnswered ? "white" : "inherit",
          }}
          disabled={isAnswered}
          onClick={() => handleAnswerClick(answer)}
          key={index}
          fullWidth
        >
          {answer}
        </Button>
      ))}
    </Box>
  );
};

export default Question;