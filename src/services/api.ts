import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://64f8a1df824680fd217fdcd2.mockapi.io/api/v1/', // Replace with your API base URL
  timeout: 5000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add custom headers here
  },

});

// Export the Axios instance
export default axiosInstance;
