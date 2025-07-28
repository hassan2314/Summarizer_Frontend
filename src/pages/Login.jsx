import { useState } from "react";
import { Typography, Alert, Fade } from "@mui/material";
import FormInput from "../components/FormInput";
import AuthFormWrapper from "../components/AuthFormWrapper";
import API from "../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { useTheme } from "@mui/material";

const Login = () => {
  const theme = useTheme();
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
      const res = await API.post(`users/login`, {
        email,
        password,
      });

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

        <CustomButton
          onClick={handleLogin}
          fullWidth
          size="large"
          loading={isLoading}
          loadingPosition="start"
          loadingIndicator="Logging in…"
          // gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
          // hoverGradient="linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
          // boxShadow="0 3px 5px 2px rgba(33, 203, 243, .3)"
          // sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
        >
          Login
        </CustomButton>
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
