// DifficultySelector.js
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
      <Select
        labelId="difficulty-select-label"
        id="difficulty-select"
        value={selectedDifficulty}
        onChange={onDifficultyChange}
        label="Difficulty"
        sx={{ minWidth: '180px', mt: 1 }}
      >
        <MenuItem value={"easy"}>Easy</MenuItem>
        <MenuItem value={"medium"}>Medium</MenuItem>
        <MenuItem value={"hard"}>Hard</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DifficultySelector;

