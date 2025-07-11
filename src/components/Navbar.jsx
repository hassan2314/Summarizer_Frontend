import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navStyles = ({ isActive }) => ({
    textDecoration: "none",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? "#1976d2" : "inherit",
    paddingBottom: "2px",
    borderRadius: "4px",
    transition: "all 0.5s ease-in-out",
    "&:hover": {
      color: "#1976d2",
    },
  });

  return (
    <AppBar
      position="static"
      elevation={2}
      color="default"
      sx={{
        borderRadius: 2,
        mb: 3,
        px: { xs: 2, md: 4 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Logo & Brand */}
        <Box
          component={NavLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            "&:hover": { color: "#1976d2" },
          }}
        >
          <img
            src="/logo.webp"
            alt="Summarizer Logo"
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: mode === "light" ? "0 0 8px #ccc" : "0 0 8px #333",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Summarizer
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          mt={{ xs: 1, md: 0 }}
        >
          {status ? (
            <>
              <Button component={NavLink} to="/" sx={navStyles}>
                Home
              </Button>
              <Button component={NavLink} to="/saved" sx={navStyles}>
                My Summaries
              </Button>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="error"
                sx={{ borderRadius: 2, textTransform: "capitalize" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={NavLink} to="/login" sx={navStyles}>
                Login
              </Button>
              <Button
                component={NavLink}
                to="/signup"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2, textTransform: "capitalize" }}
              >
                Signup
              </Button>
            </>
          )}

          {/* Theme toggle */}
          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
