import { Box, Typography, TextField, useTheme } from "@mui/material";

const OutputDisplay = ({
  summary = "",
  readOnly = true,
  onChange,
  mode = "paragraph",
}) => {
  const theme = useTheme();

  let formatted = summary;

  if (Array.isArray(summary)) {
    if (mode === "questions") {
      formatted = summary.map((q, i) => `${i + 1}. ${q}`).join("\n\n");
    } else if (mode === "bullets") {
      formatted = summary.map((line) => `• ${line}`).join("\n");
    }
  }

  const wordCount =
    typeof formatted === "string"
      ? formatted.trim().split(/\s+/).filter(Boolean).length
      : 0;

  const sentenceCount =
    typeof formatted === "string"
      ? formatted.split(/[.!?]/).filter((s) => s.trim()).length
      : 0;

  return (
    <Box>
      <TextField
        multiline
        minRows={12}
        fullWidth
        variant="outlined"
        value={
          formatted && typeof formatted === "string"
            ? formatted
            : "Your summary will appear here."
        }
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
        mt={1}
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          display: "block",
          textAlign: "right",
        }}
      >
        {sentenceCount} sentence{sentenceCount !== 1 && "s"} • {wordCount} word
        {wordCount !== 1 && "s"} • {formatted.length} characters {mode}
      </Typography>
    </Box>
  );
};

export default OutputDisplay;
