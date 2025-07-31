import React from "react";
import {
  TableRow,
  TableCell,
  Box,
  Avatar,
  Link,
  Typography,
  Chip,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  ListAlt as ListIcon,
  QuestionAnswer as QuestionsIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

const SummaryRow = ({ summary, deletingId, onDelete }) => {
  const theme = useTheme();
  const navigate = useNavigate();

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

  return (
    <TableRow
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
            noWrap
            onClick={() =>
              navigate(
                summary.type === "questions"
                  ? `/qa/${summary.id}`
                  : `/summary/${summary.id}`
              )
            }
            underline="hover"
            sx={{
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 500,
              color: theme.palette.text.primary,
              "&:hover": { color: theme.palette.primary.main },
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
        <Box display="flex" gap={0.5} flexWrap="wrap">
          {summary.tags?.slice(0, 2).map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
          {summary.tags?.length > 2 && (
            <Chip label={`+${summary.tags.length - 2}`} size="small" />
          )}
        </Box>
      </TableCell>

      <TableCell>
        <Box display="flex" alignItems="center">
          <TimeIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.text.secondary }}
          />
          <Typography variant="body2">
            {formatDate(summary.updatedAt)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Box display="flex" gap={1} flexWrap="wrap">
          <CustomButton
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/summary/${summary.id}`)}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.primary.main },
            }}
          />

          <CustomButton
            size="small"
            startIcon={
              deletingId === summary.id ? (
                <CircularProgress size={10} />
              ) : (
                <DeleteIcon />
              )
            }
            onClick={() => onDelete(summary.id)}
            disabled={deletingId === summary.id}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.error.main },
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default SummaryRow;
