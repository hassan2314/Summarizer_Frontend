import { Box, Typography, TextField } from "@mui/material";

const OutputDisplay = ({ summary = "", readOnly = true, onChange }) => {
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
        InputProps={{ readOnly }}
        onChange={onChange}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      />

      <Typography mt={1.5} variant="caption" color="text.secondary">
        {sentenceCount} sentence{sentenceCount !== 1 && "s"} • {wordCount} word
        {wordCount !== 1 && "s"}
      </Typography>
    </Box>
  );
};

export default OutputDisplay;
