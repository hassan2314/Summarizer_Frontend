import { Box, Slider, Typography } from "@mui/material";

const LengthSlider = ({ length, setLength }) => {
  return (
    <Box display="flex" alignItems="center" mt={2}>
      <Typography>Summary Length:</Typography>
      <Slider
        value={length}
        onChange={(e, newVal) => setLength(newVal)}
        min={1}
        max={5}
        step={1}
        sx={{ mx: 2, width: 200 }}
      />
      <Typography>
        {length === 1 ? "Short" : length === 5 ? "Long" : "Medium"}
      </Typography>
    </Box>
  );
};

export default LengthSlider;
