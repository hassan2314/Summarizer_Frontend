import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const InputArea = ({ text, setText }) => {
  const [type, setType] = useState("text");
  const handleFileUpload = (e) => {
    // Convert PDF or TXT to text
    setType("pdf");
  };

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
