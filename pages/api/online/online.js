import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";

export const onlineAPI = {
  createOnline,
  getAllOnline,
  deleteOnline,
};

const token = Cookies.get("token");

function createOnline(body) {
  return axios.post(`${baseUrl}/api/admin/online`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

function getAllOnline() {
  return axios.get(`${baseUrl}/api/admin/online`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteOnline(id) {
  return axios.get(`${baseUrl}/api/admin/delonline/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
