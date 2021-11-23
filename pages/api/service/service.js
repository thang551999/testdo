import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";
export const serviceAPI = {
  createService,
};

const token = Cookies.get("token");

function createService(body) {
  return axios.post(`${baseUrl}/api/admin/createspaservice`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

function getAllSpa() {
  return axios.get(`${baseUrl}/api/admin/getspa`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
