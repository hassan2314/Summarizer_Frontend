import { Box, Typography, Paper } from "@mui/material";

const OutputDisplay = ({ summary }) => {
  const wordCount = summary.trim().split(/\s+/).length;
  const sentenceCount = summary.split(/[.!?]/).filter((s) => s.trim()).length;

  return (
    <Box>
      {/* <Typography variant="subtitle1" mb={1}>
        Summary:
      </Typography> */}
      <Paper elevation={3} sx={{ p: 2, minHeight: "310px" }}>
        {summary || "Your summary will appear here."}
      </Paper>
      <Typography mt={2} color="textSecondary">
        {sentenceCount} sentences • {wordCount} words
      </Typography>
    </Box>
  );
};

export default OutputDisplay;
