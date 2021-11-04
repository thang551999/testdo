import React from "react";
import { useEffect } from "react";
import withAuth from "../HOC/withAuth";
import { profilesAPI } from "../api/profiles/profiles";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

const Profiles = () => {
  const Router = useRouter();
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    profilesAPI
      .getProfiles()
      .then((res) => {
        console.log(res.data);
        setAdminData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Hồ sơ người quản lý</h1>

        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="profile-gird-name"
        >
          <div style={{ display: "flex", margin: "10px", marginTop: "20px" }}>
            <label htmlFor="name" className="profile-textlabel">
              Tên đăng nhập :
            </label>
            <br />
            <p style={{ margin: "10px" }}>{adminData?.admin?.name}</p>
          </div>
          <div style={{ display: "flex", margin: "10px", marginTop: "20px" }}>
            <label htmlFor="name" className="profile-textlabel">
              Số điện thoại :
            </label>
            <br />
            <p style={{margin:'10px'}}>{adminData?.admin?.phonenumber}</p>
          </div>
          <div style={{ display: "flex", margin: "10px", marginTop: "20px" }}>
            <label htmlFor="name" className="profile-textlabel">
              Số tiền trong ví :
            </label>
            <br />
            <p style={{margin:'10px'}}>{parseInt(adminData?.xu).toLocaleString(
                    "it-IT",
                    { style: "currency", currency: "VND" }
                  )}</p>
          </div>
        </div>
        <div className="button-container">
          <button
            onClick={() => {
              Router.push("/profiles/edit");
            }}
            className="profile-button"
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profiles);
