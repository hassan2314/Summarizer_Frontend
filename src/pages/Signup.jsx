import { useState } from "react";
import { Button, Typography, Alert } from "@mui/material";
import FormInput from "../components/FormInput";
import AuthFormWrapper from "../components/AuthFormWrapper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

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

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}users/signup`,
        {
          email,
          password,
          name,
        }
      );
      if (res) {
        dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      setFormError(msg);
    }
  };

  return (
    <AuthFormWrapper title="Signup">
      <form onSubmit={handleSignup}>
        <FormInput
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
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
        {formError && <Alert severity="error">{formError}</Alert>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSignup}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            "&:hover": {
              background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
            },
            color: "#fff",
          }}
        >
          Create Account
        </Button>
      </form>
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3, color: "text.secondary" }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "#667eea", textDecoration: "underline" }}
        >
          Login here
        </Link>
      </Typography>
    </AuthFormWrapper>
  );
};

export default Signup;
