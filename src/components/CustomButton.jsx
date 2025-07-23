import React from "react";
import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  startIcon,
  type = "button",
  variant = "contained",
  fullWidth = false,
  size = "medium",
  gradient,
  hoverGradient,
  boxShadow,
  color,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={
        isLoading && !startIcon ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          startIcon
        )
      }
      onClick={onClick}
      disabled={disabled || isLoading}
      sx={{
        background: gradient,
        boxShadow: boxShadow,
        "&:hover": {
          background: hoverGradient,
        },
        ...sx,
      }}
      {...rest}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default CustomButton;
