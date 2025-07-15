import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Chip,
  Alert,
  Divider,
  useTheme,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";
import CustomButton from "../components/CustomButton";
import {
  ArrowBack as BackIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Description as ParagraphIcon,
  ListAlt as BulletsIcon,
  QuestionAnswer as QuestionsIcon,
  Schedule as TimeIcon,
  CalendarToday as DateIcon,
} from "@mui/icons-material";

const SummaryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedResponse, setUpdatedResponse] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getTypeIcon = () => {
    if (!summary) return <ParagraphIcon />;
    switch (summary.type) {
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

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}summary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setSummary(res.data.data);
      setUpdatedResponse(
        Array.isArray(res.data.data.response)
          ? res.data.data.response.join("\n\n")
          : res.data.data.response
      );
    } catch (error) {
      console.error("Failed to load summary detail:", error);
      setError("Failed to load summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      const payload = {
        response: updatedResponse
          .split("\n\n")
          .filter((item) => item.trim() !== ""),
      };

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}summary/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setSummary(res.data.data);
    } catch (error) {
      console.error("Failed to update summary:", error);
      setError("Failed to update summary. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this summary?"))
      return;

    try {
      setIsDeleting(true);
      setError(null);
      await axios.delete(`${import.meta.env.VITE_API_URL}summary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      navigate("/saved");
    } catch (error) {
      console.error("Failed to delete summary:", error);
      setError("Failed to delete summary. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && !summary) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (!summary && !loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Summary not found. It may have been deleted.
        </Alert>
        <CustomButton
          startIcon={<BackIcon />}
          onClick={() => navigate("/saved")}
        >
          Back to Saved Summaries
        </CustomButton>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Tooltip title="Back to saved summaries">
          <IconButton onClick={() => navigate("/saved")} sx={{ mr: 2 }}>
            <BackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" component="h1" fontWeight={600}>
          {summary.name || "Untitled Summary"}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Chip
          avatar={<Avatar>{getTypeIcon()}</Avatar>}
          label={summary.type || "N/A"}
          size="medium"
          sx={{
            textTransform: "capitalize",
            bgcolor:
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            color: theme.palette.text.primary,
            fontSize: "0.875rem",
          }}
        />

        <Box display="flex" alignItems="center" gap={1}>
          <DateIcon fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            Created: {formatDate(summary.createdAt)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <TimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            Modified: {formatDate(summary.updatedAt)}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Original Text Section */}
        <Box flex={1} display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Original Text
          </Typography>
          <InputArea
            text={summary.originalText}
            readOnly
            sx={{
              flex: 1,
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.04)"
                  : "rgba(255, 255, 255, 0.04)",
            }}
          />
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Summary Section */}
        <Box flex={1} display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <OutputDisplay
            summary={updatedResponse}
            readOnly={false}
            onChange={(e) => setUpdatedResponse(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(33, 150, 243, 0.04)"
                    : "rgba(33, 150, 243, 0.08)",
              },
            }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <CustomButton
              color="error"
              startIcon={
                isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />
              }
              onClick={handleDelete}
              isLoading={isDeleting}
              loadingText="Deleting..."
              sx={{
                px: 3,
                "&:hover": { bgcolor: theme.palette.error.dark },
              }}
            >
              Delete
            </CustomButton>
            <CustomButton
              color="primary"
              startIcon={
                isUpdating ? <CircularProgress size={20} /> : <SaveIcon />
              }
              onClick={handleUpdate}
              isLoading={isUpdating}
              loadingText="Saving..."
              disabled={!updatedResponse}
              gradient="linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)"
              hoverGradient="linear-gradient(45deg, #8BC34A 30%, #4CAF50 90%)"
              sx={{ px: 3 }}
            >
              Save Changes
            </CustomButton>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SummaryDetail;
