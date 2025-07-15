import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Alert, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
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
      await axios.delete(`${import.meta.env.VITE_API_URL}summary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      await fetchSummaries();
    } catch (error) {
      setError("Failed to delete summary. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, [summaries]);

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
        <CustomButton
          onClick={() => navigate("/")}
          gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
          hoverGradient="linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
          boxShadow="0 3px 5px 2px rgba(33, 203, 243, .3)"
        >
          Create New
        </CustomButton>
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
