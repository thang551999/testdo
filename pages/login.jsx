import React from "react";
import { Link } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import cookie from "js-cookie";
import LoadingButton from "@mui/lab/LoadingButton";

import { LoginAPI } from "./api/auth/login";

const Login = () => {
  const Router = useRouter();
  const loginState = { username: "", password: "" };
  const [adminData, setAdminData] = useState(loginState);
  const { username, password } = adminData;
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      username: username,
      password: password,
      role: "admin",
    };
    try {
      if (!isLoading) {
        const res = await LoginAPI.postLogin(body);
        cookie.set("token", res.data.token);
        cookie.set("username", username);
        Router.replace("/profiles");
      }
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            name="username"
            value={username}
            onChange={handleChangeInput}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            value={password}
            onChange={handleChangeInput}
            required
          />
          <LoadingButton
            disabled={!username || !password}
            loading={isLoading}
            onClick={handleSubmit}
          >
            Đăng nhập
          </LoadingButton>
          {/* <p className="message">
            Chưa có tài khoản? <Link href="/register">Tạo tài khoản</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;