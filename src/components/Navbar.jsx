import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  Badge,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Summarize as SummarizeIcon,
  Folder as SavedIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  Logout as LogoutIcon,
  AccountCircle as ProfileIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { status, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/login");
  };

  const navStyles = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    fontWeight: isActive ? 600 : 400,
    borderBottom: isActive ? `2px solid ${theme.palette.primary.main}` : "none",
    transition: "all 0.2s ease-in-out",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  });

  const buttonStyles = {
    minWidth: 0,
    padding: "8px 12px",
    borderRadius: "4px",
    textTransform: "none",
    fontSize: "0.875rem",
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      color="default"
      sx={{
        bgcolor:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "xl",
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SummarizeIcon color="primary" fontSize="large" />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #90caf9, #42a5f5)"
                  : "linear-gradient(45deg, #1976d2, #0d47a1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: { xs: "none", sm: "block" },
            }}
          >
            Summarizer Pro
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {status ? (
            <>
              <Button
                component={NavLink}
                to="/"
                sx={{ ...navStyles, ...buttonStyles }}
                startIcon={<HomeIcon fontSize="small" />}
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to="/saved"
                sx={{ ...navStyles, ...buttonStyles }}
                startIcon={<SavedIcon fontSize="small" />}
              >
                My Summaries
              </Button>

              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: "success.main",
                        border: `2px solid ${theme.palette.background.paper}`,
                      }}
                    />
                  }
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || <ProfileIcon />}
                  </Avatar>
                </Badge>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={NavLink}
                to="/login"
                variant="outlined"
                size="small"
                startIcon={<LoginIcon />}
                sx={{
                  color: "text.primary",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "primary.main",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                to="/signup"
                variant="contained"
                size="small"
                startIcon={<SignupIcon />}
                sx={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
