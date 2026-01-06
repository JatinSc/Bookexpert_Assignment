// src/services/apiClient.js

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // optional but professional
});

export default apiClient;
