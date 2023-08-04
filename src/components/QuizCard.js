// QuizCard.js
import React, { useEffect, useState, useCallback } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { fetchQuizData, getCategories } from "../hooks/api";
import Question from "./Question";
import QuizResult from "./QuizResult";
import CategorySelector from "./CategorySelector";
import DifficultySelector from "./DifficultySelector";
import QuestionAmountSelector from "./QuestionAmountSelector";

const QuizCard = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(9); // general knowledge
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleStartClick = async () => {
    const data = await fetchQuizData(selectedCategory, selectedDifficulty, selectedAmount);
    setQuestions(data);
    setQuizStarted(true);
    setIsQuizFinished(false); // Reset isQuizFinished state when quiz starts.
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleAnswerSelect = useCallback((isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimeLeft(10); // reset timer
    } else {
      setIsQuizFinished(true);
    }
  }, [currentQuestion, questions.length]);

  const handleTimeUp = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimeLeft(10); // reset timer
    } else {
      handleAnswerSelect(false);
      setIsQuizFinished(true);
    }
  }, [handleAnswerSelect, currentQuestion, questions.length]);

  const handleBackToMenu = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(10);
    setIsQuizFinished(false);
  };

  useEffect(() => {
    getCategories().then(setCategories);

    if (quizStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [quizStarted]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, handleTimeUp]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: 400,
          height: '80vh',
          p: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            🐝
          </Typography>
          <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            QuizBee
          </Typography>
        </Box>

        {!quizStarted ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DifficultySelector
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={handleDifficultyChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <QuestionAmountSelector
                    selectedAmount={selectedAmount}
                    onAmountChange={handleAmountChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12rem' }}>
              <Button variant="contained" color="primary" onClick={handleStartClick}>
                Start Quiz
              </Button>
            </Box>
          </>
        ) : isQuizFinished ? (
          <>
            <QuizResult score={score} totalQuestions={questions.length} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleBackToMenu}>
                Back to Menu
              </Button>
            </Box>
          </>
        ) : questions.length > 0 && currentQuestion < questions.length ? (
          <>
            <Grid item xs={12}>
              <Question
                questionData={questions[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                timeLeft={timeLeft}
              />
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleBackToMenu}>
                Back to Menu
              </Button>
            </Box>
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </Box>
    </Box>
  );
};

export default QuizCard;
