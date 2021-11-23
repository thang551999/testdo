import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../hello";
export const checkInAPI = {
    checkIn,
}

const token = Cookies.get("token");

function checkIn(body){
    return axios.post(`${baseUrl}/api/admin/checkin`, body, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}