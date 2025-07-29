import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Alert, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../lib/axiosInstance";
import CustomButton from "../components/CustomButton";
import SummaryTable from "../components/SummaryTable";

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchSummaries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get(`summary`);
      setSummaries(res.data.data);
    } catch (error) {
      setError("Failed to load summaries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await API.delete(`summary/${id}`);
      await fetchSummaries();
    } catch (error) {
      setError("Failed to delete summary. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  if (loading && summaries.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={56}
          sx={{ mb: 2 }}
        />
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={72}
            sx={{ mb: 1 }}
          />
        ))}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          My Saved Summaries
        </Typography>
        <CustomButton onClick={() => navigate("/")}>Create New</CustomButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <SummaryTable
        summaries={summaries}
        deletingId={deletingId}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default SavedSummaries;
