import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // console.log("REQUEST:", config);

    return config;
  },
  (error) => {
    console.log("REQUEST ERROR:", error);

    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // console.log("RESPONSE:", response);

    return response;
  },
  (error) => {
    console.log("RESPONSE ERROR:", error.response);

    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      window.location.href = "/auth/login"; // Redirect to login page
    }

    return Promise.reject(error);
  },
);

export default api;
