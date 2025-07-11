import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Stack,
  Chip,
  useTheme,
  Avatar,
} from "@mui/material";
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
import axios from "axios";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";

const SummaryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedResponse, setUpdatedResponse] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
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
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [id]);

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

  const handleUpdate = async () => {
    try {
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
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}summary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      navigate("/saved");
    } catch (error) {
      console.error("Failed to delete summary:", error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!summary) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Summary not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
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

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        {/* Left: Original Text */}
        <Box flex={1} display="flex" flexDirection="column">
          <InputArea text={summary.originalText} readOnly />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="outlined" disabled>
              Original Text
            </Button>
          </Box>
        </Box>

        <Box flex={1} display="flex" flexDirection="column">
          <OutputDisplay
            summary={updatedResponse}
            readOnly={false}
            onChange={(e) => setUpdatedResponse(e.target.value)}
          />
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SummaryDetail;
