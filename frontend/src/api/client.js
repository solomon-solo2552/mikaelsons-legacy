import axios from "axios";

// Falls back to localhost:8000 so the app works even without a .env file.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const client = axios.create({
  baseURL: API_URL,
});

export const getProperties = (params = {}) =>
  client.get("/properties/", { params }).then((res) => res.data);

export const getProperty = (slug) =>
  client.get(`/properties/${slug}/`).then((res) => res.data);

export const sendInquiry = (payload) =>
  client.post("/inquiries/", payload).then((res) => res.data);

export default client;
