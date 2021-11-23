import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";
const token = Cookies.get("token");

export const placeAPI = {
  getAllPlace,
  createPlace,
  deletePlace,
  updataStatus,
  courseOnline,
  getPlace
};

function getAllPlace() {
  return axios.get(`${baseUrl}/api/admin/getallplace`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getPlace(id){
  return axios.get(`${baseUrl}/api/customer/getplacebyid/${id}`);
}

function createPlace(body) {
  console.log(JSON.stringify(body))
  console.log(body)
   return axios.post(`${baseUrl}/api/admin/addpalce`, body, {
     headers: {
    'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
   },
   });
}

function deletePlace(id) {
  return axios.get(`${baseUrl}/api/admin/delplace/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function updataStatus(body) {
  return axios.post(`${baseUrl}/api/admin/updateStatus`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function courseOnline(body) {
  return axios.post(`${baseUrl}/api/admin/online`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
