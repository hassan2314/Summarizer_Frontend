// pages/SummaryDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Description as ParagraphIcon,
  ListAlt as BulletsIcon,
  QuestionAnswer as QuestionsIcon,
} from "@mui/icons-material";

import API from "../lib/axiosInstance";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";
import TagDisplay from "../components/TagDisplay";
import CustomButton from "../components/CustomButton";
import DetailWrapper from "../components/DetailWrapper";

const SummaryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [updatedResponse, setUpdatedResponse] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case "paragraph":
        return <ParagraphIcon />;
      case "bullets":
        return <BulletsIcon />;
      case "questions":
        return <QuestionsIcon />;
      default:
        return <ParagraphIcon />;
    }
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await API.get(`summary/${id}`);
        const data = res.data.data;
        setSummary(data);

        const lines = data.response || [];

        if (data.type === "bullets") {
          setUpdatedResponse(
            lines
              .map((line) => (line.startsWith("•") ? line : `• ${line}`))
              .join("\n\n")
          );
        } else {
          setUpdatedResponse(
            lines
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join("\n\n")
          );
        }
      } catch (err) {
        setError("Failed to load summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await API.put(`summary/${id}`, {
        response: updatedResponse.split("\n\n").filter((s) => s.trim()),
      });
      alert("Summary updated successfully");
      window.location.reload();
    } catch (err) {
      setError("Failed to update summary.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this summary?"))
      return;

    try {
      setIsDeleting(true);
      await API.delete(`summary/${id}`);
      navigate("/saved");
    } catch (err) {
      setError("Failed to delete summary.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DetailWrapper
      loading={loading && !summary}
      error={error}
      title={summary?.name}
      type={summary?.type}
      typeIcon={getTypeIcon(summary?.type)}
      createdAt={summary?.createdAt}
      updatedAt={summary?.updatedAt}
      onBack={() => navigate("/saved")}
      onCloseError={() => setError(null)}
    >
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>
            Original Text
          </Typography>
          <InputArea text={summary?.originalText} setText={setText} readOnly />
        </Box>

        <Box flex={1} display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>

          <OutputDisplay
            summary={updatedResponse}
            mode={summary?.type}
            readOnly={false}
            onChange={(e) => setUpdatedResponse(e.target.value)}
          />

          <TagDisplay tags={summary?.tags} />

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <CustomButton
              color="error"
              startIcon={<DeleteIcon />}
              loading={isDeleting}
              loadingIndicator="Deleting…"
              loadingPosition="start"
              onClick={handleDelete}
            >
              Delete
            </CustomButton>

            <CustomButton
              color="primary"
              startIcon={<SaveIcon />}
              loading={isUpdating}
              loadingIndicator="Saving…"
              loadingPosition="start"
              onClick={handleUpdate}
              disabled={!updatedResponse}
              gradient="linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)"
              hoverGradient="linear-gradient(45deg, #8BC34A 30%, #4CAF50 90%)"
            >
              Update
            </CustomButton>
          </Stack>
        </Box>
      </Box>
    </DetailWrapper>
  );
};

export default SummaryDetail;
