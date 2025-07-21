import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import SummaryRow from "./SummaryRow";

const SummaryTable = ({ summaries, deletingId, onDelete }) => {
  const theme = useTheme();

  return (
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
              <SummaryRow
                key={summary.id}
                summary={summary}
                deletingId={deletingId}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
