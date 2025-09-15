import axios from 'axios';

const clientDSTU = axios.create({
  baseURL: '/api/fhir',
  headers: {
    'Accept': 'application/fhir+json',
    'Content-Type': 'application/fhir+json'
  },
  timeout: 10000
});

// Add request interceptor for debugging
clientDSTU.interceptors.request.use(
  config => {
    console.log('FHIR Request:', {
      method: config.method,
      url: config.url,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('FHIR Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
clientDSTU.interceptors.response.use(
  response => response,
  error => {
    console.error('FHIR Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default clientDSTU;
