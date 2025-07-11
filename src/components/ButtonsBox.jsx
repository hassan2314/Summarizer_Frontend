import React from "react";
import { Button, Box } from "@mui/material";

const ButtonsBox = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setText(reader.result);
    };
    reader.readAsText(file);
  };
  return (
    <Box mt={2} display="flex" justifyContent="space-between">
      <Button variant="outlined" component="label">
        Upload Doc
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
      <Button variant="outlined" onClick={() => setText("")}>
        Clear
      </Button>
    </Box>
  );
};

export default ButtonsBox;
