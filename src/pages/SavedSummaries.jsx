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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
      <Container sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom color="primary">
        Your Saved Summaries
      </Typography>

      {summaries.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No summaries found. Try generating and saving one first!
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            mt: 3,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Type
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Created
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Last Modified
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {summaries.map((summary, idx) => (
                <TableRow
                  key={summary.id}
                  hover
                  sx={{
                    backgroundColor:
                      idx % 2 === 0 ? "grey.70" : "background.paper",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                  onClick={() => navigate(`/summary/${summary.id}`)}
                >
                  <TableCell>
                    <Link
                      component="span"
                      variant="body1"
                      sx={{ fontWeight: 500, color: "primary.main" }}
                      underline="hover"
                    >
                      {summary.name || summary.tags?.[0] || "Untitled"}
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
      )}
    </Container>
  );
};

export default SavedSummaries;
