import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Paper } from "@mui/material";
import axios from "axios";

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Summary Detail
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1">
          <strong>Original Text:</strong>
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {summary.orignalText}
        </Typography>

        <Typography variant="subtitle1">
          <strong>Summary:</strong>
        </Typography>
        <Typography variant="body2">{summary.summary}</Typography>

        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Created: {new Date(summary.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          Last Modified: {new Date(summary.updatedAt).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default SummaryDetail;
