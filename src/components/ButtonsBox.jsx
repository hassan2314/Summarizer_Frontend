import React from "react";
import { Button, Box } from "@mui/material";

const ButtonsBox = ({ setText }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setText(reader.result);
    };
    if (file) reader.readAsText(file);
  };

  return (
    <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
      <Button variant="outlined" component="label" sx={{ fontWeight: 500 }}>
        Upload Doc
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>

      <Button
        variant="outlined"
        color="error"
        onClick={() => setText("")}
        sx={{ fontWeight: 500 }}
      >
        Clear
      </Button>
    </Box>
  );
};

export default ButtonsBox;
