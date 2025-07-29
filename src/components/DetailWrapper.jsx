// components/DetailWrapper.jsx
import {
  Container,
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  CalendarToday as DateIcon,
  Schedule as TimeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DetailWrapper = ({
  loading,
  error,
  title,
  type,
  typeIcon,
  createdAt,
  updatedAt,
  onBack,
  onCloseError,
  children,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Tooltip title="Back to saved summaries">
          <IconButton
            onClick={onBack || (() => navigate("/saved"))}
            sx={{ mr: 2 }}
          >
            <BackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" fontWeight={600}>
          {title || "Untitled"}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={onCloseError}>
          {error}
        </Alert>
      )}

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        {type && (
          <Chip
            avatar={<Avatar>{typeIcon}</Avatar>}
            label={type}
            sx={{
              textTransform: "capitalize",
              bgcolor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800],
              color: theme.palette.text.primary,
              fontSize: "0.875rem",
            }}
          />
        )}

        {createdAt && (
          <Box display="flex" alignItems="center" gap={1}>
            <DateIcon fontSize="small" color="action" />
            <Typography variant="body2" color="textSecondary">
              Created: {formatDate(createdAt)}
            </Typography>
          </Box>
        )}

        {updatedAt && (
          <Box display="flex" alignItems="center" gap={1}>
            <TimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="textSecondary">
              Modified: {formatDate(updatedAt)}
            </Typography>
          </Box>
        )}
      </Box>

      {children}
    </Container>
  );
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

export default DetailWrapper;
