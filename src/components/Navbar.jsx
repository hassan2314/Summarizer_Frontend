import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
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

  // Active nav button style
  const navStyles = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#1976d2" : "inherit",
    fontWeight: isActive ? 600 : 400,
    borderBottom: isActive ? "2px solid #1976d2" : "2px solid transparent",
    transition: "all 0.2s ease-in-out",
  });

  return (
    <AppBar position="static" elevation={2} color="default" sx={{ mb: 10 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* App Name */}
        <Box
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              "&:hover": { color: "#1976d2" },
            }}
          >
            Summarizer
          </Typography>
        </Box>

        {/* Nav Buttons */}
        <Stack direction="row" spacing={2} alignItems="center">
          {status ? (
            <>
              <Button component={NavLink} to="/" sx={navStyles}>
                Home
              </Button>
              <Button component={NavLink} to="/saved" sx={navStyles}>
                My Summaries
              </Button>
              <Button onClick={handleLogout} color="error" variant="outlined">
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
                sx={navStyles}
                variant="outlined"
              >
                Signup
              </Button>
            </>
          )}

          {/* Theme toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
