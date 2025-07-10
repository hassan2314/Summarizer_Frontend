import { useState } from "react";
import { Container, Grid, Box, Button } from "@mui/material";
import ModeSelector from "../components/ModeSelector";
import LengthSlider from "../components/LengthSlider";
import InputArea from "../components/ InputArea";
import OutputDisplay from "../components/OutputDisplay";

const Home = () => {
  const [mode, setMode] = useState("paragraph");
  const [length, setLength] = useState(3);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    // Call backend summarization endpoint
    console.log({ text, mode, length });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <ModeSelector mode={mode} setMode={setMode} />
      <LengthSlider length={length} setLength={setLength} />

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <InputArea text={text} setText={setText} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OutputDisplay summary={summary} />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" size="large" onClick={handleSummarize}>
          Summarize
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
