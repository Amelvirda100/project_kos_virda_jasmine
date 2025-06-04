import axios from "axios";

const api = axios.create({
  baseURL: "https://projek-kos-backend-171192151600.us-central1.run.app", // atau /api kalau kamu pakai prefix
});

export default api;
