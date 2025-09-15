import axios from 'axios';

const clientDSTU = axios.create({
  baseURL: '/api/fhir',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for debugging
clientDSTU.interceptors.request.use(request => {
  console.log('Request:', request.method, request.url);
  return request;
});

clientDSTU.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default clientDSTU;
