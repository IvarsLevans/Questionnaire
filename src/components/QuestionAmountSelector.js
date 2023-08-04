// QuestionAmountSelector.js
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const QuestionAmountSelector = ({ selectedAmount, onAmountChange }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="amount-select-label">Amount</InputLabel>
      <Select
        labelId="amount-select-label"
        id="amount-select"
        value={selectedAmount}
        onChange={onAmountChange}
        label="Amount"
        sx={{ minWidth: '180px', mt: 1 }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
  );
};

export default QuestionAmountSelector;