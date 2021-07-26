import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ptAPI } from "../api/pt/pt";
import { Image } from "react-bootstrap";

const GetAllPT = () => {
    const initPt = [];
    const [adminPt, setAdminPt] = useState([]);

    useEffect(()=>{
        ptAPI.getAllPt()
            .then(res => {
                console.log(res.data)
                setAdminPt(res.data)
            })
            .catch(err => console.log(err))
    })
  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các PT</h2>
        <br />
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search for name and email......"
        />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày sinh</th>
              <th>Số điện thoại</th>
              <th>Ảnh đại diện</th>
              <th>Thông tin thêm</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminPt.map((pt) => (
              <tr>
                <td>{pt.name}</td>
                <td>{pt.ngaysinh}</td>
                <td>{pt.sodienthoai}</td>
                <td>
                    <Image src={pt.image} alt="loading..."></Image>
                </td>
                <td>{pt.thongtinthem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllPT;
