import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";

const SummaryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <Container sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!summary) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography color="error">Summary not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} gutterBottom color="primary">
        {summary.name || "Untitled Summary"}
      </Typography>

      {/* Metadata */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="subtitle1">
          <strong>Type:</strong> {summary.type || "N/A"}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          <strong>Created:</strong>{" "}
          {new Date(summary.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          <strong>Last Modified:</strong>{" "}
          {new Date(summary.updatedAt).toLocaleString()}
        </Typography>
      </Paper>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={3}
        alignItems="stretch"
      >
        {/* Original Text */}
        <Box flex={1} display="flex" flexDirection="column">
          <InputArea text={summary.originalText} readOnly />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="outlined" disabled>
              Original Text
            </Button>
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />

        {/* Editable Summary */}
        <Box flex={1} display="flex" flexDirection="column">
          <OutputDisplay
            summary={updatedResponse}
            readOnly={false}
            onChange={(e) => setUpdatedResponse(e.target.value)}
          />

          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdate}
              sx={{
                fontWeight: 600,
                px: 3,
                py: 1,
                background: "linear-gradient(to right, #43cea2, #185a9d)",
                "&:hover": {
                  background: "linear-gradient(to right, #11998e, #38ef7d)",
                },
              }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{
                fontWeight: 600,
                px: 3,
                py: 1,
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SummaryDetail;
