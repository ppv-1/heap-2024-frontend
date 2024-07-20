import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";
// const API_BASE_URL = "http://111.119.196.146:8080/api/v1";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
  
});

export { API };

