import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3100', //! http://localhost:5173
});

let accessToken = '';

function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  console.log('interceptors', accessToken);
  // * для передачи куки
  config.withCredentials = true;

  if (!config.headers.Authorization) {
    config.headers.Authorization = `Racoons ${accessToken}`;
  }
  return config;
});

export { setAccessToken };

export default axiosInstance;
