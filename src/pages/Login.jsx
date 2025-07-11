import { useState } from "react";
import { Button, Typography, Alert, Fade } from "@mui/material";
import FormInput from "../components/FormInput";
import AuthFormWrapper from "../components/AuthFormWrapper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}users/login`,
        {
          email,
          password,
        }
      );

      const { user, token } = res.data.data;
      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setFormError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper title="Welcome Back">
      <form onSubmit={handleLogin}>
        {formError && (
          <Fade in={!!formError}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          </Fade>
        )}

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: 600,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            "&:hover": {
              background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#21CBF3",
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Create Account
        </Link>
      </Typography>
    </AuthFormWrapper>
  );
};

export default Login;
