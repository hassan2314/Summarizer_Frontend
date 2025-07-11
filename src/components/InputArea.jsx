import { Box, TextField, Button } from "@mui/material";

const InputArea = ({ text, setText }) => {
  return (
    <Box>
      <TextField
        label="Enter or paste your text"
        placeholder="Paste your content here..."
        multiline
        rows={12}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default InputArea;
