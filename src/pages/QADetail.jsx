import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  QuestionAnswer as QuestionsIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

import API from "../lib/axiosInstance";
import InputArea from "../components/InputArea";
import QADisplay from "../components/QADisplay";
import TagDisplay from "../components/TagDisplay";
import CustomButton from "../components/CustomButton";
import DetailWrapper from "../components/DetailWrapper";

const QADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const fetchQA = async () => {
      try {
        setLoading(true);
        const res = await API.get(`qa/${id}`);
        const data = res.data.data;
        setQaData(data);
        setQuestions(data.questions || []);
        setAnswers(data.answers || []);
        setFeedback(data.feedback || []);
      } catch (err) {
        setError("Failed to load QA detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchQA();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await API.put(`qa/${id}`, { answers, feedback });
      alert("Answers updated successfully");
      window.location.reload();
    } catch (err) {
      setError("Update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this QA summary?"))
      return;

    try {
      setIsDeleting(true);
      await API.delete(`qa/${id}`);
      navigate("/saved");
    } catch (err) {
      setError("Delete failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCheckAnswers = async () => {
    if (!qaData?.originalText || !questions.length || !answers.length) return;

    const qa_pairs = questions.map((question, idx) => ({
      question,
      user_answer: answers[idx],
    }));

    try {
      setIsChecking(true);
      const response = await API.post("summarizer/check-batch", {
        context: qaData.originalText,
        qa_pairs,
      });

      const rawFeedback = response.data.data.feedback || "";
      setFeedback(rawFeedback.split("\n")); // one per question
    } catch (err) {
      console.error("Failed to check answers:", err);
      setError("Failed to check answers.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <DetailWrapper
      loading={loading && !qaData}
      error={error}
      title={qaData?.name}
      type={qaData?.type}
      typeIcon={<QuestionsIcon />}
      createdAt={qaData?.createdAt}
      updatedAt={qaData?.updatedAt}
      onBack={() => navigate("/saved")}
      onCloseError={() => setError(null)}
    >
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>
            Original Text
          </Typography>
          <InputArea text={qaData?.originalText} readOnly />
        </Box>

        <Box flex={1} display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Questions and Answers
          </Typography>

          <QADisplay
            summary={qaData?.questions
              .map((q, i) => `${i + 1}. ${q}`)
              .join("\n")}
            questions={questions}
            answers={answers}
            setQuestions={setQuestions}
            setAnswers={setAnswers}
            feedback={feedback}
          />

          <TagDisplay tags={qaData?.tags} />

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <CustomButton
              color="error"
              startIcon={<DeleteIcon />}
              loading={isDeleting}
              loadingPosition="start"
              onClick={handleDelete}
              sx={{ px: 3 }}
            >
              Delete
            </CustomButton>

            <CustomButton
              color="primary"
              startIcon={<CheckIcon />}
              loading={isChecking}
              loadingPosition="start"
              onClick={handleCheckAnswers}
              disabled={!questions.length || !answers.length}
              gradient="linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)"
              hoverGradient="linear-gradient(45deg, #38f9d7 0%, #43e97b 100%)"
            >
              Check Answers
            </CustomButton>

            <CustomButton
              color="primary"
              startIcon={<SaveIcon />}
              loading={isUpdating}
              loadingPosition="start"
              onClick={handleUpdate}
              gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
              hoverGradient="linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
              disabled={!answers.length}
            >
              Update
            </CustomButton>
          </Stack>
        </Box>
      </Box>
    </DetailWrapper>
  );
};

export default QADetail;
