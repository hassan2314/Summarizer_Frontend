// src/components/TagDisplay.jsx
import { Box, Typography, Chip, useTheme } from "@mui/material";

const TagDisplay = ({ tags = "" }) => {
  const theme = useTheme();
  let parsedTags = tags;
  if (typeof tags === "string") {
    console.log(tags);
    parsedTags = tags
      .split(/[\n,]+/)
      .map((line) => line.replace(/^\*\s*/, "").trim())
      .filter(Boolean); // removes empty strings
  }

  return (
    <Box mt={2}>
      <Typography variant="subtitle2">Tags:</Typography>
      <Box display="flex" gap={1} flexWrap="wrap">
        {parsedTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            sx={{
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "light" ? "#f0f0f0" : "#2c2c2c",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagDisplay;
