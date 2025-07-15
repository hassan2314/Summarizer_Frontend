import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Link,
  Box,
  Chip,
  useTheme,
  Alert,
  Avatar,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Description as DescriptionIcon,
  ListAlt as ListIcon,
  QuestionAnswer as QuestionsIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import CustomButton from "../components/CustomButton";

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const theme = useTheme();
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
      console.error("Failed to fetch summaries:", error);
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
      console.error("Failed to delete summary:", error);
      setError("Failed to delete summary. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case "paragraph":
        return <DescriptionIcon color="primary" />;
      case "bullets":
        return <ListIcon color="secondary" />;
      case "questions":
        return <QuestionsIcon color="success" />;
      default:
        return <DescriptionIcon />;
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
        <Typography variant="h4" component="h1" fontWeight={600}>
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

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(31, 38, 135, 0.1)"
              : "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: theme.palette.mode === "light" ? "#f5f7fa" : "#1e1e1e",
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>Summary</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tags</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Modified</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No saved summaries found. Create your first summary!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              summaries.map((summary) => (
                <TableRow
                  key={summary.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(33, 150, 243, 0.04)"
                          : "rgba(33, 150, 243, 0.08)",
                    },
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          color: theme.palette.primary.contrastText,
                          mr: 2,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {getTypeIcon(summary.type)}
                      </Avatar>
                      <Link
                        component="button"
                        variant="body1"
                        onClick={() => navigate(`/summary/${summary.id}`)}
                        underline="hover"
                        sx={{
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                          "&:hover": {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        {summary.name || "Untitled Summary"}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={summary.type || "N/A"}
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        bgcolor:
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                        color: theme.palette.text.primary,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      {summary.tags?.slice(0, 3).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {summary.tags?.length > 3 && (
                        <Chip
                          label={`+${summary.tags.length - 3}`}
                          size="small"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TimeIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: theme.palette.text.secondary,
                        }}
                      />
                      <Typography variant="body2">
                        {formatDate(summary.updatedAt)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <CustomButton
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/summary/${summary.id}`)}
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": { color: theme.palette.primary.main },
                        }}
                      >
                        Edit
                      </CustomButton>
                      <CustomButton
                        size="small"
                        startIcon={
                          deletingId === summary.id ? (
                            <CircularProgress size={16} />
                          ) : (
                            <DeleteIcon />
                          )
                        }
                        onClick={() => handleDelete(summary.id)}
                        disabled={deletingId === summary.id}
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": { color: theme.palette.error.main },
                        }}
                      >
                        Delete
                      </CustomButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SavedSummaries;
