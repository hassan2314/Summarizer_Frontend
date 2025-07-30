import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // required to send cookies
});

// Request Interceptor
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and not already retrying
    if (
      error.response?.status === 401 ||
      (error.response?.data?.message === "jwt expired" &&
        !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      try {
        // Call backend refresh endpoint
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}users/refresh-token`,
          {},
          {
            withCredentials: true, // Needed to send refreshToken cookie
          }
        );
        console.log(res.data.data.accessToken);
        const newAccessToken = res.data.data.accessToken;

        // Store new token and retry original request
        localStorage.setItem("token", newAccessToken);

        // Update Authorization header and retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed – handle logout
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("status");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
