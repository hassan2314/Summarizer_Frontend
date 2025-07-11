import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";

const AuthFormWrapper = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Zoom in={true} style={{ transitionDelay: "100ms" }}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            width: "100%",
            maxWidth: 450,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(145deg, #f5f7fa, #ffffff)"
                : "linear-gradient(145deg, #1a1a2e, #16213e)",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 8px 32px rgba(31, 38, 135, 0.1)"
                : "0 8px 32px rgba(0, 0, 0, 0.3)",
            border:
              theme.palette.mode === "light"
                ? "1px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            mb={3}
            sx={{
              "& img": {
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <img
              src="/logo.webp"
              alt="Logo"
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                borderRadius: "50%",
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 4px 20px rgba(100, 100, 100, 0.2)"
                    : "0 4px 20px rgba(0, 0, 0, 0.5)",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            gutterBottom
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
              mb: 3,
            }}
          >
            {title}
          </Typography>

          <Box component="form" mt={2}>
            {children}
          </Box>
        </Paper>
      </Zoom>
    </Container>
  );
};

export default AuthFormWrapper;
