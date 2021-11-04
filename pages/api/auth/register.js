import axios from "axios";
import { baseUrl } from "../hello";
export const RegisterAPI = {
    postRegister,
}

function postRegister(body) {
    return axios.post(`${baseUrl}/api/auth/register`, body);
}