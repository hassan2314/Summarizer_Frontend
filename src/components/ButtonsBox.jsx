import React from "react";
import { Button, Box, useTheme } from "@mui/material";

const ButtonsBox = ({ setText }) => {
  const theme = useTheme();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setText(reader.result);
    };
    if (file) reader.readAsText(file);
  };

  return (
    <Box mt={2} display="flex" justifyContent="space-between">
      <Button
        variant="outlined"
        component="label"
        size="small"
        sx={{
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
          textTransform: "capitalize",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          },
        }}
      >
        Upload Document
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
      <Button
        variant="outlined"
        onClick={() => setText("")}
        size="small"
        sx={{
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
          textTransform: "capitalize",
          "&:hover": {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
          },
        }}
      >
        Clear Text
      </Button>
    </Box>
  );
};

export default ButtonsBox;
