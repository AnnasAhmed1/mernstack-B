import axios from "axios";
const instance = axios.create({
  baseURL: "https://staging.thehuntr.com/api/v1",
  // timeout: 1000,
  // headers: {'Authorization': 'Bearer '+token}
});

export default instance;
