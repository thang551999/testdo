import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";

export const courseAPI = {
  createCourse,
  getAllCourse,
  deleteCourse,
};

const token = Cookies.get("token");

function createCourse(body) {
  return axios.post(`${baseUrl}/api/admin/createcourse`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

function getAllCourse() {
  return axios.get(`${baseUrl}/api/admin/getallcourse`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteCourse(id) {
  return axios.get(
    `${baseUrl}/api/admin/delcourse/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
