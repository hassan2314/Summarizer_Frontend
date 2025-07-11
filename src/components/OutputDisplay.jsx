import { Box, Typography, TextField, useTheme } from "@mui/material";

const OutputDisplay = ({ summary = "", readOnly = true, onChange }) => {
  const theme = useTheme();
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
          readOnly,
          sx: {
            bgcolor:
              theme.palette.mode === "light" ? "#fafafa" : "background.paper",
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
          },
        }}
        onChange={onChange}
      />

      <Typography
        mt={2}
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          display: "block",
          textAlign: "right",
        }}
      >
        {sentenceCount} sentence{sentenceCount !== 1 && "s"} • {wordCount} word
        {wordCount !== 1 && "s"}
      </Typography>
    </Box>
  );
};

export default OutputDisplay;
