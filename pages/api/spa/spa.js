import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";

export const spaAPI = {
  createSpa,
  getAllSpa,
  updateStatusSpa,
  deleteSpa,
  deleteService,
};

const token = Cookies.get("token");

function deleteService(id) {
  return axios.get(
    `${baseUrl}/api/admin/delServiceSpaById/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createSpa(body) {
  return axios.post(`${baseUrl}/api/admin/createspa`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteSpa(id) {
  return axios.get(`${baseUrl}/api/admin/delspa/` + id, {
    headers: {
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

function updateStatusSpa(body) {
  return axios.post(
    `${baseUrl}/api/admin/updateStatusSpa`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
