import React from "react";
import { Button, Box } from "@mui/material";

const ButtonsBox = () => {
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
