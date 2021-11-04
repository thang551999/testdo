import axios from "axios";
import { baseUrl } from "../hello";
export const LoginAPI = {
    postLogin,
}

function postLogin(body) {
    return axios.post(`${baseUrl}/api/auth/login`, body);
}