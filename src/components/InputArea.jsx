import { Box, TextField, useTheme } from "@mui/material";

const InputArea = ({ text, setText }) => {
  const theme = useTheme();

  return (
    <Box>
      <TextField
        label="Enter or paste your text"
        multiline
        minRows={12}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.divider,
              borderRadius: 2,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.secondary.main,
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.text.secondary,
            "&.Mui-focused": {
              color: theme.palette.secondary.main,
            },
          },
          bgcolor:
            theme.palette.mode === "light" ? "#fafafa" : "background.paper",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default InputArea;
