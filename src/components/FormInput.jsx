import { TextField, useTheme } from "@mui/material";
import React from "react";

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor:
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.23)"
                : "rgba(255, 255, 255, 0.23)",
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.main,
            borderWidth: 2,
          },
        },
        "& .MuiInputLabel-root": {
          color:
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255, 255, 255, 0.6)",
          "&.Mui-focused": {
            color: theme.palette.secondary.main,
          },
        },
        mb: 2,
        transition: "all 0.3s ease",
      }}
      {...props}
    />
  );
};

export default FormInput;
