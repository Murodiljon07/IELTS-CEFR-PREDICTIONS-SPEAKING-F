import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2711/api/v1",
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

    return Promise.reject(error);
  },
);

export default api;
