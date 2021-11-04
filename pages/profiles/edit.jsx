import React from "react";
import { useEffect } from "react";
import withAuth from "../HOC/withAuth";
import { profilesAPI } from "../api/profiles/profiles";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Profiles = () => {
  const inforadmin = { name: "", phonenumber: "", place: "" };
  const [adminData, setAdminData] = useState(inforadmin);
 
  useEffect(() => {
    profilesAPI.getProfiles()
      .then((res) => {
        console.log(res.data.admin);
        setAdminData(res.data.admin)
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Hồ sơ người quản lý</h1>

        <div style={{display:'flex',flexDirection:'column'}} className="profile-gird-name">
          <div style={{display:'flex',margin:'10px',marginTop:'20px'}}>
          <label style={{fontSize:'20px'}} htmlFor="name" className="profile-textlabel">
            Tên đăng nhập : 
          </label>
          <br />
          <input id="name" type="text"  value={adminData.name}/>
        </div>
        <div  style={{display:'flex',margin:'10px',marginTop:'20px'}}>
          <label htmlFor="name" className="profile-textlabel">
            Số điện thoại : 
          </label>
          <br />
          <input id="name" type="text"  value={adminData.phonenumber}/>
       </div>
        </div>
        <div className="button-container">
          <button className="profile-button">
            Lưu Thông Tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profiles);
