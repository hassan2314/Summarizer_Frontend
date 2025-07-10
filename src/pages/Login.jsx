import { useState } from "react";
import { Button, Typography, Alert } from "@mui/material";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");

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
    }
  };

  return (
    <AuthFormWrapper title="Login">
      {formError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError}
        </Alert>
      )}
      <FormInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/signup">Create Account</Link>
      </Typography>
    </AuthFormWrapper>
  );
};

export default Login;
