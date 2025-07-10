import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PublicRoute from "./PublicRoute";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
// import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Route: Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 | Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default AppRouter;
