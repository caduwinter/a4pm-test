import axios from "axios";

const options = {
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  withCredentials: true,
};

const apiService = axios.create(options);

export default apiService;
