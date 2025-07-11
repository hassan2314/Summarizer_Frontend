import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("theme") || "light";
    setMode(storedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              primary: {
                main: "#667eea",
              },
              secondary: {
                main: "#764ba2",
              },
              background: {
                default: "#f3f4f6",
                paper: "#fff",
              },
            }
          : {
              primary: {
                main: "#90caf9",
              },
              secondary: {
                main: "#ce93d8",
              },
              background: {
                default: "#121212",
                paper: "#1e1e2f",
              },
            }),
      },
      typography: {
        fontFamily: "Poppins, Roboto, sans-serif",
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: "8px",
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
