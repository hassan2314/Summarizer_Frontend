import { useState } from "react";
import { Container, Box, Button } from "@mui/material";
import ModeSelector from "../components/ModeSelector";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";

const Home = () => {
  const [mode, setMode] = useState("paragraph");
  const [length, setLength] = useState(3);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    console.log({ text, mode, length });
    // TODO: Send request to backend
    setSummary("Generated summary will appear here...");
  };

  const handleSave = () => {
    console.log("Saved to history!");
    // TODO: Save summary to backend
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* First Row: Mode Selector only for Input Area */}
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Box width={{ xs: "100%", md: "50%" }}>
          <ModeSelector mode={mode} setMode={setMode} />
        </Box>
      </Box>

      {/* Second Row: Input & Output side by side */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        {/* Left: Input */}
        <Box flex={1} display="flex" flexDirection="column">
          <InputArea text={text} setText={setText} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleSummarize}>
              Summarize
            </Button>
          </Box>
        </Box>

        {/* Right: Output */}
        <Box flex={1} display="flex" flexDirection="column">
          <OutputDisplay summary={summary} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
