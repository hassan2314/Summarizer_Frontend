import { Tabs, Tab } from "@mui/material";
import { left } from "@popperjs/core";

const ModeSelector = ({ mode, setMode }) => {
  const handleChange = (e, newValue) => setMode(newValue);

  return (
    <Tabs
      value={mode}
      onChange={handleChange}
      textColor="primary"
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <Tab
        label="Paragraph"
        value="paragraph"
        sx={{ fontWeight: 600, padding: 1, ml: 1 }}
      />
      <Tab
        label="Bullet Points"
        value="bullets"
        sx={{ fontWeight: 600, padding: 1, ml: 1 }}
      />
      <Tab
        label="Questions"
        value="questions"
        sx={{ fontWeight: 600, padding: 1, ml: 1 }}
      />
    </Tabs>
  );
};

export default ModeSelector;
