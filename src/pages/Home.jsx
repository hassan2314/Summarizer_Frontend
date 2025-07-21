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
  useTheme,
  LinearProgress,
  Fade,
  Slide,
  Alert,
} from "@mui/material";
import axios from "axios";
import API from "../lib/axiosInstance";

import ModeSelector from "../components/ModeSelector";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";
import ButtonsBox from "../components/ButtonsBox";
import CustomButton from "../components/CustomButton";

const Home = () => {
  const theme = useTheme();
  const [mode, setMode] = useState("paragraph");
  const [length, setLength] = useState(3);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await API.post(`summarizer/`, {
        dialogue: text,
        mode: mode,
      });

      const result = response.data.data;

      setSummary(result.data);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClick = () => {
    if (!summary || !text) {
      setError("Please generate a summary first.");
      return;
    }
    setOpenDialog(true);
  };

  const confirmSave = async () => {
    console.log("Saving summary...", summary);

    const response =
      (mode === "question" || mode === "bullets") && typeof summary === "string"
        ? summary
            .split(/\n{1,2}/)
            .map((s) => s.trim())
            .filter(Boolean)
        : Array.isArray(summary)
        ? summary.map((s) => s.trim()).filter(Boolean)
        : [summary?.toString().trim()];

    const payload = {
      name,
      type: mode,
      originalText: text,
      tags: ["A", "B", "C", "D"],
      response,
    };

    try {
      setIsLoading(true);
      const res = await API.post(`summary`, payload);
      setOpenDialog(false);
      setName("");
      setError(null);
    } catch (error) {
      setError("Failed to save summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {isLoading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            zIndex: theme.zIndex.modal + 1,
          }}
        />
      )}

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Box width={{ xs: "100%", md: "50%" }}>
          <ModeSelector mode={mode} setMode={setMode} />
        </Box>
      </Box>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        </Fade>
      )}

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Box flex={1} display="flex" flexDirection="column">
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Box>
              <InputArea text={text} setText={setText} />
              <ButtonsBox setText={setText} />
              <Box display="flex" justifyContent="center" mt={2}>
                <CustomButton
                  size="small"
                  onClick={handleSummarize}
                  isLoading={isLoading}
                  loadingText="Summarizing..."
                  gradient="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                  hoverGradient="linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)"
                  boxShadow="0 3px 5px 2px rgba(255, 105, 135, .3)"
                  sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: 600 }}
                >
                  Summarize
                </CustomButton>
              </Box>
            </Box>
          </Slide>
        </Box>

        <Box flex={1} display="flex" flexDirection="column">
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box>
              <OutputDisplay summary={summary} mode={mode} />
              <Box display="flex" justifyContent="center" mt={2}>
                <CustomButton
                  size="small"
                  onClick={handleSaveClick}
                  disabled={!summary || isLoading}
                  gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
                  hoverGradient="linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
                  boxShadow="0 3px 5px 2px rgba(33, 203, 243, .3)"
                  sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: 600 }}
                >
                  Save Summary
                </CustomButton>
              </Box>
            </Box>
          </Slide>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => !isLoading && setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(145deg, #f5f7fa, #ffffff)"
                : "linear-gradient(145deg, #1a1a2e, #16213e)",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Save Your Summary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Summary Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={() => setOpenDialog(false)}
            disabled={isLoading}
            sx={{ color: theme.palette.text.secondary }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={confirmSave}
            isLoading={isLoading}
            loadingText="Saving..."
            gradient="linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)"
            hoverGradient="linear-gradient(45deg, #8BC34A 30%, #4CAF50 90%)"
          >
            Save
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
