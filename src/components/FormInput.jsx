import { TextField } from "@mui/material";
import React from "react";

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  color,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      color="primary"
      sx={{
        "& label.Mui-focused": {
          color: "#1976d2",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ccc",
          },
          "&:hover fieldset": {
            borderColor: "#888",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        },
      }}
      {...props}
    />
  );
};

export default FormInput;
