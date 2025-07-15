import { Box, Typography, TextField, useTheme } from "@mui/material";

const OutputDisplay = ({
  summary = "",
  readOnly = true,
  onChange,
  mode = "paragraph",
}) => {
  const theme = useTheme();

  let formatted = summary;

  if (mode === "bullets") {
    formatted = summary
      .split("\n")
      .filter(Boolean)
      .map((line) => `• ${line.trim().replace(/^[-•*]\s*/, "")}`)
      .join("\n");
  } else if (mode === "questions") {
    formatted = summary
      .split("?")
      .map((q) => q.trim())
      .filter(Boolean)
      .map((q) => `${q}?`)
      .join("\n\n");
  }

  const wordCount = formatted.trim().split(/\s+/).filter(Boolean).length;
  const sentenceCount = formatted.split(/[.!?]/).filter((s) => s.trim()).length;

  return (
    <Box>
      <TextField
        multiline
        minRows={12}
        fullWidth
        variant="outlined"
        value={formatted || "Your summary will appear here."}
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
