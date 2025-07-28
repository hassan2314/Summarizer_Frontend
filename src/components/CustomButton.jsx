import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(
  ({
    gradient = "linear-gradient(45deg, #1565C0 30%, #0288D1 90%)",
    hoverGradient = "linear-gradient(45deg, #0288D1 30%, #1565C0 90%)",
    boxShadow = "0 3px 5px 2px rgba(2, 136, 209, .3)",
  }) => ({
    fontSize: "0.775rem",
    fontWeight: 600,
    color: "white",
    textTransform: "capitalize",
    background: gradient,
    boxShadow: boxShadow,
    transition: "all 0.2s ease-in-out",
    loadingPosition: "start",
    maxHeight: 40,
    "&:hover": {
      background: hoverGradient || gradient,
    },
  })
);

// const CustomButton = ({
//   children,
//   gradient,
//   hoverGradient,
//   boxShadow,
//   loadingIndicator = "Loading…",
//   sx = {},
//   ...props
// }) => {
//   return (
//     <StyledButton
//       gradient={gradient}
//       hoverGradient={hoverGradient}
//       boxShadow={boxShadow}
//       sx={sx}
//       {...props} // includes loading, loadingPosition, startIcon, endIcon, etc.
//     >
//       {children}
//     </StyledButton>
//   );
// };

export default CustomButton;
