import { createSlice } from "@reduxjs/toolkit";

// Safe user parsing from localStorage
let user = null;
try {
  const rawUser = localStorage.getItem("user");
  if (rawUser && rawUser !== "undefined") {
    user = JSON.parse(rawUser);
  }
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
  localStorage.removeItem("user"); // Optional cleanup
}

const initialState = {
  user,
  token: localStorage.getItem("token") || null,
  status: localStorage.getItem("status") === "true" && !!user,
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
