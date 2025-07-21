import { useState } from "react";
import { Typography, Alert, Fade } from "@mui/material";
import FormInput from "../components/FormInput";
import AuthFormWrapper from "../components/AuthFormWrapper";
import axios from "axios";
import API from "../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    try {
      const res = await API.post(`users/signup`, {
        email,
        password,
        name,
      });
      if (res) {
        navigate("/login");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      setFormError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper title="Join Us Today">
      <form onSubmit={handleSignup}>
        <FormInput
          label="Full Name"
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          autoFocus
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        {formError && (
          <Fade in={!!formError}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          </Fade>
        )}

        <CustomButton
          type="submit"
          onClick={handleSignup}
          fullWidth
          size="large"
          isLoading={isLoading}
          loadingText="Creating Account..."
          gradient="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          hoverGradient="linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)"
          boxShadow="0 3px 5px 2px rgba(255, 105, 135, .3)"
          sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
        >
          Create Account
        </CustomButton>
      </form>
      <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#FF8E53",
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Login here
        </Link>
      </Typography>
    </AuthFormWrapper>
  );
};

export default Signup;
