import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import InputArea from "../components/InputArea";
import OutputDisplay from "../components/OutputDisplay";

const SummaryDetail = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Failed to load summary detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [id]);

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
      <Typography variant="h5" gutterBottom>
        {summary.name}
      </Typography>

      <Box mb={2}>
        <Typography variant="body2">
          <strong>Type:</strong> {summary.type}
        </Typography>
        <Typography variant="body2">
          <strong>Created:</strong>{" "}
          {new Date(summary.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Last Modified:</strong>{" "}
          {new Date(summary.updatedAt).toLocaleString()}
        </Typography>
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
            summary={
              Array.isArray(summary.response)
                ? summary.response.join("\n\n")
                : summary.response
            }
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="success">
              Download
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SummaryDetail;
