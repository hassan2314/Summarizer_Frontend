import { useState } from "react";
import {
  Button,
  Typography,
  Alert,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FormInput from "../components/FormInput";
import AuthFormWrapper from "../components/AuthFormWrapper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}users/login`,
        { email, password }
      );

      const { user, token } = res.data.data;

      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setFormError(msg);
    }
  };

  return (
    <AuthFormWrapper title="Login">
      <form onSubmit={handleLogin}>
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            background: "linear-gradient(to right, #667eea, #764ba2)",
            "&:hover": {
              background: "linear-gradient(to right, #5a67d8, #6b46c1)",
            },
            color: "#fff",
          }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "text.secondary" }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#667eea",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            Create Account
          </Link>
        </Typography>
      </form>
    </AuthFormWrapper>
  );
};

export default Login;
