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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}summary`, {
          withCredentials: true,
        });
        setSummaries(res.data.data);
      } catch (error) {
        console.error("Failed to fetch summaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Saved Summaries
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
              <TableCell>
                <strong>Last Modified</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.map((summary) => (
              <TableRow key={summary.id}>
                <TableCell>
                  <Link
                    component="button"
                    variant="body1"
                    onClick={() => navigate(`/summary/${summary.id}`)}
                    underline="hover"
                  >
                    {summary.tags?.[0] || "Untitled"}
                  </Link>
                </TableCell>
                <TableCell>{summary.type || "N/A"}</TableCell>
                <TableCell>
                  {new Date(summary.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(summary.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SavedSummaries;
