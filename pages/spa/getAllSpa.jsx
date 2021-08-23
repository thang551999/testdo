import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { spaAPI } from "../api/spa/spa";

const GetAllSpa = () => {
  const [adminSpa, setAdminSpa] = useState([]);
  const Router = useRouter();
  useEffect(() => {
    spaAPI
      .getAllSpa()
      .then((res) => {
        // console.log(res);
        setAdminSpa(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateService = (e) => {
      e.preventDefault();
      Router.push("/service/createService")
  }

  return (
    <div className="getall-spa">
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
                <th>Địa chỉ</th>
                <th>Ảnh đại diện</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="table">
              {adminSpa.map((spa) => (
                <tr key={spa.id}>
                  <td>{spa.name}</td>
                  <td>{spa.diachi}</td>
                  <td style={{width: "25%"}}>
                    <Image src={spa.image} alt="Loading..." style={{width: "100%"}}/>
                  </td>
                  <td>
                    {spa.status == "0" ? (
                      <Button
                        variant="primary"
                        //   onClick={handleUpdateStatus(place.id)}
                      >
                        Ẩn
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        //   onClick={handleUpdateStatusShow(place.id)}
                      >
                        Hiển Thị
                      </Button>
                    )}
                  </td>
                  <td>
                  <Button variant="primary" onClick={handleCreateService}>
                    Thêm dịch vụ
                  </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllSpa;
