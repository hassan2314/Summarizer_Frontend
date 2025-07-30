import { Box, TextField, useTheme } from "@mui/material";

const InputArea = ({ text, setText }) => {
  return (
    <Box>
      <TextField
        label="Enter or paste your text"
        multiline
        minRows={12}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  );
};

export default InputArea;
