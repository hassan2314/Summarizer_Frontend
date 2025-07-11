import { Box, Container, Paper, Typography, useTheme } from "@mui/material";

const AuthFormWrapper = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "fit-content",
        display: "flex",
        alignItems: "top",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={7}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          bgcolor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper,
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src="/logo.webp"
            alt="Logo"
            style={{
              width: 70,
              height: 70,
              objectFit: "contain",
              borderRadius: "50%",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 0 10px #ddd"
                  : "0 0 10px #222",
            }}
          />
        </Box>

        <Typography
          variant="h5"
          align="center"
          fontWeight={600}
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          {title}
        </Typography>

        <Box component="form" mt={2}>
          {children}
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthFormWrapper;
