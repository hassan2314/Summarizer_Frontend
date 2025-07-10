import { createSlice } from "@reduxjs/toolkit";

// Safely parse user from localStorage
let user = null;
const rawUser = localStorage.getItem("user");
try {
  user = rawUser ? JSON.parse(rawUser) : null;
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
  localStorage.removeItem("user"); // Optional: clean up corrupted data
}

const initialState = {
  user,
  token: localStorage.getItem("token") || null,
  status: localStorage.getItem("status") === "true" && user !== null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("status", "true");
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("status");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
