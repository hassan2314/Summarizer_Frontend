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
      response: mode === "question" ? summary.split("\n\n") : [summary],
      respose: mode === "bullet" ? summary.split("\n\n") : [summary],
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
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Box width={{ xs: "80%", md: "35%" }}>
          <ModeSelector mode={mode} setMode={setMode} />
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <InputArea text={text} setText={setText} />
          <ButtonsBox setText={setText} />
          <Box display="flex" justifyContent="center" mt={1}>
            <Button
              variant="contained"
              onClick={handleSummarize}
              sx={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                color: "#fff",
                px: 4,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(to right, #5a67d8, #6b46c1)",
                },
              }}
            >
              Summarize
            </Button>
          </Box>
        </Box>

        {/* Output Side */}
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <OutputDisplay summary={summary} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              sx={{
                background: "linear-gradient(to right, #43cea2, #185a9d)",
                color: "#fff",
                px: 4,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(to right, #11998e, #38ef7d)",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Dialog */}
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
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={confirmSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
