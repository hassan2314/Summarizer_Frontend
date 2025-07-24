import * as React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !["gradient", "hoverGradient", "boxShadow"].includes(prop),
})(({ gradient, hoverGradient, boxShadow }) => ({
  background: gradient,
  boxShadow: boxShadow,
  "&:hover": {
    background: hoverGradient || gradient,
  },
}));

const CustomButton = ({
  children,
  gradient,
  hoverGradient,
  boxShadow,
  loadingIndicator = "Loading…",
  sx = {},
  ...props
}) => {
  return (
    <StyledButton
      gradient={gradient}
      hoverGradient={hoverGradient}
      boxShadow={boxShadow}
      sx={sx}
      {...props} // includes loading, loadingPosition, startIcon, endIcon, etc.
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
