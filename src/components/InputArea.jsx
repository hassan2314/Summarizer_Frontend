import { Box, TextField, Button } from "@mui/material";

const InputArea = ({ text, setText }) => {
  const [type, setType] = useState("text");
  const handleFileUpload = (e) => {
    // Convert PDF or TXT to text
    setType("pdf");
  };

  return (
    <Box>
      <TextField
        label="Enter or paste your text"
        multiline
        rows={12}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" component="label">
          Upload Doc
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        <Button variant="outlined" onClick={() => setText("")}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default InputArea;
