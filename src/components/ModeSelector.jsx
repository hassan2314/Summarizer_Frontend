import { Tabs, Tab, useTheme } from "@mui/material";

const ModeSelector = ({ mode, setMode }) => {
  const theme = useTheme();

  const handleChange = (e, newValue) => setMode(newValue);

  return (
    <Tabs
      value={mode}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      variant="fullWidth"
      sx={{
        "& .MuiTabs-indicator": {
          height: 2,
          borderRadius: 2,
        },
        "& .MuiTab-root": {
          fontSize: "0.875rem",
          fontWeight: 600,
          textTransform: "capitalize",
          minHeight: 40,
          color: theme.palette.text.primary,
          "&.Mui-selected": {
            color: theme.palette.secondary.main,
          },
        },
        borderRadius: 2,
        bgcolor: theme.palette.mode === "light" ? "#f5f5f5" : "#1e1e1e",
      }}
    >
      <Tab label="Paragraph" value="paragraph" />
      <Tab label="Bullet Points" value="bullets" />
      <Tab label="Questions" value="questions" />
    </Tabs>
  );
};

export default ModeSelector;
