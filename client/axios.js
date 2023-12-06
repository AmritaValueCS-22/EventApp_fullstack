import axios from "axios";

const BASE_URL = "http://192.168.183.135:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

const makeApiCall = (endpoint, method = "POST", data = null, headers) => {
  const config = {
    method,
    url: endpoint,
    data,
    headers,
  };

  return api.request(config);
};

export default makeApiCall;
