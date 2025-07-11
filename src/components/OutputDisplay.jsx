import { Box, Typography, TextField } from "@mui/material";

const OutputDisplay = ({ summary = "" }) => {
  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  const sentenceCount = summary.split(/[.!?]/).filter((s) => s.trim()).length;

  return (
    <Box>
      <TextField
        multiline
        minRows={12}
        fullWidth
        variant="outlined"
        value={summary || "Your summary will appear here."}
        InputProps={{
          readOnly: true,
        }}
      />
      <Typography mt={2} variant="caption" color="textSecondary">
        {sentenceCount} sentence{sentenceCount !== 1 && "s"} • {wordCount} word
        {wordCount !== 1 && "s"}
      </Typography>
    </Box>
  );
};

export default OutputDisplay;
