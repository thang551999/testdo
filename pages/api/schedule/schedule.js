import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";

export const scheduleAPI = {
  createChedule,
  deleteSchedule,
  getSchedule
};

const token = Cookies.get("token");

function createChedule(body) {
  return axios.post(
    `${baseUrl}/api/admin/createschedule`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function deleteSchedule(id) {
  return axios.get(
    `${baseUrl}/api/admin/delschedule/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function getSchedule() {
  return axios.get(
    `${baseUrl}/api/admin/schedules`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}