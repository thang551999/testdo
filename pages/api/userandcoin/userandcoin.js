import axios from "axios";
import Cookies from "js-cookie";

export const userandcoinAPI = {
  getAllUser,
  editCoin,
  editInfor,
};

const token = Cookies.get("token");

function getAllUser(body) {
  return axios.post(`${baseUrl}/api/admin/getalluser`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function editCoin(id, body) {
  return axios.post(
    `${baseUrl}/api/admin/editcoin/` + id,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function editInfor(id, body) {
  return axios.post(
    `${baseUrl}/api/admin/editinfor/` + id,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
