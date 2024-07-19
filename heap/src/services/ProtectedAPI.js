import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";


let ProtectedAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
});

ProtectedAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

export { ProtectedAPI };

