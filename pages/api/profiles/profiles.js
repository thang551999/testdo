import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";
const token = Cookies.get("token");

export const profilesAPI = {
  getProfiles,
};

function getProfiles(headers) {
  return axios.get(`${baseUrl}/api/admin/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
