import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";
const token = Cookies.get("token");

export const ptAPI = {
  getAllPt,
  createPt,
  deletePt,
};

function getAllPt() {
  return axios.get(`${baseUrl}/api/admin/getallpt`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createPt(body) {
  return axios.post(`${baseUrl}/api/admin/creatept`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

function deletePt(id){
  return axios.get(`${baseUrl}/api/admin/delpt/`+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
