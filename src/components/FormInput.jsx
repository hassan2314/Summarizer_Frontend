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
      color={color}
      {...props}
    />
  );
};

export default FormInput;
