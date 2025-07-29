import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";

const QADisplay = ({
  summary,
  questions,
  answers,
  setQuestions,
  setAnswers,
  feedback,
}) => {
  const theme = useTheme();

  useEffect(() => {
    console.log(answers);
    if (summary && typeof summary === "string" && summary.trim().length > 0) {
      const extracted = summary
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);
      setQuestions(extracted);
      // setAnswers(Array(extracted.length).fill(""));
    }
  }, [summary]);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {questions.map((q, index) => {
        const isInCorrect = feedback[index]
          ?.toLowerCase()
          .includes("incorrect");

        return (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              {index + 1}. {q}{" "}
              {feedback[index] && (
                <Box
                  component="span"
                  sx={{
                    color: isInCorrect ? "red" : "green",
                    fontWeight: 600,
                    ml: 1,
                  }}
                >
                  ({feedback[index]})
                </Box>
              )}
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
        );
      })}
    </Box>
  );
};

export default QADisplay;
