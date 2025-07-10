import { Tabs, Tab } from "@mui/material";

const ModeSelector = ({ mode, setMode }) => {
  const handleChange = (e, newValue) => setMode(newValue);

  return (
    <Tabs
      value={mode}
      onChange={handleChange}
      textColor="primary"
      indicatorColor="primary"
    >
      <Tab label="Paragraph" value="paragraph" />
      <Tab label="Bullet Points" value="bullets" />
      <Tab label="Questions" value="questions" />
    </Tabs>
  );
};

export default ModeSelector;
