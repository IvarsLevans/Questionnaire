// CategorySelector.js
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        onChange={onCategoryChange}
        label="Category"
        sx={{ minWidth: '180px', mt: 1 }}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelector;
