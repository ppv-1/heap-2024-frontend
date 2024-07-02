import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";


const ProtectedAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

export { ProtectedAPI };

