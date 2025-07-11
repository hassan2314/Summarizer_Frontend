import { Box, TextField, Button } from "@mui/material";

const InputArea = ({ text, setText }) => {
  return (
    <Box>
      <TextField
        label="Enter or paste your text"
        multiline
        rows={12}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  );
};

export default InputArea;
