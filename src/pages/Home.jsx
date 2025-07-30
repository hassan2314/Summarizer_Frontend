import { useState } from "react";
import {
  Container,
  Box,
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

import API from "../lib/axiosInstance";
import ModeSelector from "../components/ModeSelector";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";
import ButtonsBox from "../components/ButtonsBox";
import CustomButton from "../components/CustomButton";
import TagDisplay from "../components/TagDisplay";
import QADisplay from "../components/QADisplay";

const Home = () => {
  const theme = useTheme();
  const [mode, setMode] = useState("paragraph");
  const [tags, setTags] = useState([]);
  const [length, setLength] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState([]);
  // const [state, setState] = React.useState({name:'', text:'',tags:[]})

  // setState({name:name, text:text, tags:tags})
  // setState((st)=>({...st, name:name, text:text, tags:tags}))
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
        mode,
      });

      const result = response.data.data; // { data: "...", tags: "..." }
      setTags(result.tags);
      if (mode != "questions") {
        if (typeof result.data === "string" && mode === "bullets") {
          const extracted = result.data
            .split("\n")
            .map((line) => line.replace(/^\*\s*/, "").trim())
            .filter(Boolean)
            .map((line) => `• ${line}`)
            .join("\n");
          console.log("Before setSummary : ", extracted);
          setSummary(extracted);
          console.log(extracted);
        } else setSummary(result.data);
      } else {
        if (typeof result.data === "string" && result.data.trim().length > 0) {
          const extracted = result.data
            .split("\n")
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean);
          setQuestions(extracted);
        }
      }
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckAnswers = async () => {
    if (!text || !questions || !answers) {
      setError("Please Enter all Answers");
      return;
    }

    const qa_pairs = questions.map((question, idx) => ({
      question,
      user_answer: answers[idx],
    }));

    try {
      const response = await API.post("summarizer/check-batch", {
        context: text,
        qa_pairs,
      });

      setFeedback(response.data.data.feedback.split("\n")); // Split for per-answer feedback
      setAnswers(answers);
    } catch (err) {
      console.error("Failed to check answers:", err);
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
    const formattedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags
          .split(/[\n,]+/)
          .map((tag) => tag.replace(/^\*?\s*/, "").trim())
          .filter(Boolean)
      : [];

    console.log(formattedTags);
    if (mode !== "questions") {
      const formattedResponse =
        (mode === "question" || mode === "bullets") &&
        typeof summary === "string"
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
        tags: formattedTags,
        response: formattedResponse,
      };

      try {
        setIsLoading(true);
        await API.post(`summary`, payload);
        setOpenDialog(false);
        setName("");
        setError(null);
      } catch (error) {
        setError("Failed to save summary. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      const formattedQuestions =
        typeof questions === "string"
          ? questions
              .split(/\n{1,2}/)
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(questions)
          ? questions.map((s) => s.trim()).filter(Boolean)
          : [questions?.toString().trim()];

      const formattedAnswers =
        typeof answers === "string"
          ? answers
              .split(/\n{1,2}/)
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(answers)
          ? answers.map((s) => s.trim()).filter(Boolean)
          : [answers?.toString().trim()];

      const formattedFeedback =
        typeof feedback === "string"
          ? feedback
              .split(/\n{1,2}/)
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(feedback)
          ? feedback.map((s) => s.trim()).filter(Boolean)
          : [feedback?.toString().trim()];

      const payload = {
        name,
        type: mode,
        originalText: text,
        tags: formattedTags,
        questions: formattedQuestions,
        answers: formattedAnswers,
        feedback: formattedFeedback,
      };
      console.log(payload);
      try {
        setIsLoading(true);
        await API.post(`qa`, payload);
        setOpenDialog(false);
        setName("");
        setError(null);
      } catch (error) {
        setError("Failed to save QA. Please try again.");
      } finally {
        setIsLoading(false);
      }
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

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box width={{ xs: "100%", md: "50%" }}>
          <ModeSelector mode={mode} setMode={setMode} />
        </Box>

        {mode !== "questions" && (
          <CustomButton
            size="small"
            onClick={handleSaveClick}
            disabled={!summary || isLoading}
            loading={isLoading}
            loadingIndicator="Saving…"
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            Save Summary
          </CustomButton>
        )}
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
          <Slide direction="right" in={true}>
            {/* <Slide direction="right" in={true} mountOnEnter unmountOnExit> */}
            <Box>
              <InputArea text={text} setText={setText} />
              <ButtonsBox setText={setText} />
              <Box display="flex" justifyContent="center" mt={2}>
                <CustomButton
                  size="small"
                  onClick={handleSummarize}
                  loading={isLoading}
                  loadingPosition="start"
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
              {mode === "questions" && questions.length > 0 ? (
                <>
                  <QADisplay
                    setAnswers={setAnswers}
                    questions={questions}
                    answers={answers}
                    feedback={feedback}
                  />
                  <TagDisplay tags={tags} />
                  <Box display="flex" justifyContent="center" mt={2}>
                    <CustomButton
                      size="small"
                      onClick={handleSaveClick}
                      disabled={!summary || isLoading}
                      gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
                      hoverGradient="linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
                      boxShadow="0 3px 5px 2px rgba(33, 203, 243, .3)"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      Save QA
                    </CustomButton>
                    <CustomButton
                      size="small"
                      onClick={handleCheckAnswers}
                      disabled={!summary || isLoading}
                      gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
                      hoverGradient="linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
                      // boxShadow="0 3px 5px 2px rgba(33, 203, 243, .3)"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "white",
                        textTransform: "capitalize",
                        ml: 2,
                      }}
                    >
                      Check Answers
                    </CustomButton>
                  </Box>
                </>
              ) : (
                <>
                  <OutputDisplay summary={summary} mode={mode} />
                  <TagDisplay tags={tags} />
                  <Box display="flex" justifyContent="center" mt={2}>
                    <CustomButton
                      size="small"
                      onClick={handleSaveClick}
                      disabled={!summary || isLoading}
                      sx={{
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      Save Summary
                    </CustomButton>
                  </Box>
                </>
              )}
            </Box>
          </Slide>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => !isLoading && setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(145deg, #f5f7fa, #ffffff)"
                  : "linear-gradient(145deg, #1a1a2e, #16213e)",
              borderRadius: 3,
            },
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
            loading={isLoading}
            loadingPosition="start"
            loadingIndicator="Saving…"
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
