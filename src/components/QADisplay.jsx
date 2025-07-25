// QADisplay.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";

const QADisplay = ({
  summary,
  onAnswersChange,
  questions,
  answers,
  setQuestions,
  setAnswers,
}) => {
  const theme = useTheme();

  useEffect(() => {
    if (summary && typeof summary === "string" && summary.trim().length > 0) {
      const extracted = summary
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);
      setQuestions(extracted);
      setAnswers(Array(extracted.length).fill(""));
    }
  }, [summary]);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    if (onAnswersChange) onAnswersChange(updated);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {questions.map((q, index) => (
        <Box key={index}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}
          >
            {index + 1}. {q}
          </Typography>
          <TextField
            multiline
            fullWidth
            minRows={2}
            placeholder="Type your answer here..."
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            sx={{
              bgcolor:
                theme.palette.mode === "light" ? "#fff" : "background.paper",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.divider,
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default QADisplay;
