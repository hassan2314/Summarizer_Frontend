import { useState } from "react";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

import ModeSelector from "../components/ModeSelector";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";
import ButtonsBox from "../components/ButtonsBox";

const Home = () => {
  const [mode, setMode] = useState("paragraph");
  const [length, setLength] = useState(3);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("Example Sample Summary");
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");

  const handleSummarize = () => {
    // TODO: Replace with actual backend call
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    // Example summary
    setSummary("Generated summary will appear here...");
  };

  const handleSaveClick = () => {
    if (!summary || !text) {
      alert("Please generate a summary first.");
      return;
    }
    setOpenDialog(true);
  };

  const confirmSave = async () => {
    const payload = {
      name: name || "Untitled",
      type: mode,
      originalText: text,
      tags: ["A", "B", "C", "D"],
      response: mode === "question" ? summary.split("\n\n") : summary,
      respose: mode === "bullet" ? summary.split("\n\n") : summary,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}summary`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      alert("Summary saved successfully!");
      setOpenDialog(false);
      setName("");
    } catch (error) {
      console.error("Failed to save summary:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Box width={{ xs: "100%", md: "50%" }}>
          <ModeSelector mode={mode} setMode={setMode} />
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={1} display="flex" flexDirection="column">
          <InputArea text={text} setText={setText} />
          <ButtonsBox setText={setText} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleSummarize}>
              Summarize
            </Button>
          </Box>
        </Box>

        <Box flex={1} display="flex" flexDirection="column">
          <OutputDisplay summary={summary} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Save Summary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Summary Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
